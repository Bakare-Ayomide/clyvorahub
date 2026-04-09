import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { seedAdminUser, checkIsAdmin } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LogIn,
  Upload,
  Trash2,
  FileCheck,
  Loader2,
  LogOut,
  Shield,
} from "lucide-react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "CLYVORA Admin" }],
  }),
});

function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [currentFile, setCurrentFile] = useState<{
    id: string;
    display_name: string;
    file_name: string;
    file_size: number | null;
    file_type: string | null;
    created_at: string;
  } | null>(null);
  const [seeded, setSeeded] = useState(false);

  // Seed admin on mount
  useEffect(() => {
    if (!seeded) {
      seedAdminUser()
        .then(() => setSeeded(true))
        .catch(console.error);
    }
  }, [seeded]);

  const loadCurrentFile = useCallback(async () => {
    const { data } = await supabase
      .from("download_files")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setCurrentFile(data);
  }, []);

  // Check auth state
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setIsLoggedIn(true);
        const { isAdmin: admin } = await checkIsAdmin({
          data: { userId: session.user.id },
        });
        setIsAdmin(admin);
        if (admin) await loadCurrentFile();
      }
      setLoading(false);
    };

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        const { isAdmin: admin } = await checkIsAdmin({
          data: { userId: session.user.id },
        });
        setIsAdmin(admin);
        if (admin) await loadCurrentFile();
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });

    checkAuth();
  }, [loadCurrentFile]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoginLoading(false);
    if (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");
    if (!displayName.trim())
      return toast.error("Please enter a display name for the file");

    setUploadLoading(true);
    try {
      const storagePath = `${Date.now()}-${file.name}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("downloads")
        .upload(storagePath, file);

      if (uploadError) throw uploadError;

      // Deactivate old files
      await supabase
        .from("download_files")
        .update({ is_active: false })
        .eq("is_active", true);

      // Insert new record
      const { error: insertError } = await supabase
        .from("download_files")
        .insert({
          file_name: file.name,
          display_name: displayName.trim(),
          storage_path: storagePath,
          file_size: file.size,
          file_type: file.type || "application/octet-stream",
          is_active: true,
        });

      if (insertError) throw insertError;

      toast.success("File uploaded successfully!");
      setFile(null);
      setDisplayName("");
      await loadCurrentFile();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    }
    setUploadLoading(false);
  };

  const handleDelete = async () => {
    if (!currentFile) return;
    try {
      await supabase
        .from("download_files")
        .update({ is_active: false })
        .eq("id", currentFile.id);
      toast.success("File deactivated");
      setCurrentFile(null);
    } catch {
      toast.error("Failed to deactivate file");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Toaster richColors position="top-center" />
        <Card className="w-full max-w-md glass-card border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="size-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-black gradient-text">
              CLYVORA Admin
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to manage downloads
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="glow"
                className="w-full"
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogIn className="size-4" />
                )}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-8">
          <p className="text-lg font-bold text-destructive">Access Denied</p>
          <p className="text-muted-foreground mt-2">
            You are not an admin.
          </p>
          <Button variant="outline" className="mt-4" onClick={handleLogout}>
            Sign Out
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Toaster richColors position="top-center" />
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black gradient-text">
            CLYVORA Admin
          </h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="size-4" />
            Sign Out
          </Button>
        </div>

        {/* Current File */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileCheck className="size-5 text-primary" />
              Current Download File
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentFile ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Display Name:</span>
                  <span className="font-medium">
                    {currentFile.display_name}
                  </span>
                  <span className="text-muted-foreground">File:</span>
                  <span className="font-medium">{currentFile.file_name}</span>
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium">
                    {currentFile.file_size
                      ? `${(currentFile.file_size / 1024 / 1024).toFixed(1)} MB`
                      : "Unknown"}
                  </span>
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">
                    {currentFile.file_type || "Unknown"}
                  </span>
                  <span className="text-muted-foreground">Uploaded:</span>
                  <span className="font-medium">
                    {new Date(currentFile.created_at).toLocaleDateString()}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                >
                  <Trash2 className="size-4" />
                  Deactivate
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No active download file. Upload one below.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Upload */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Upload className="size-5 text-primary" />
              Upload New File
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Display Name (what users see)
                </label>
                <Input
                  placeholder="e.g. CLYVORA Setup v2.0"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  File (any type)
                </label>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
                {file && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {file.name} • {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="glow"
                className="w-full"
                disabled={uploadLoading}
              >
                {uploadLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}
                Upload & Set as Active Download
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
