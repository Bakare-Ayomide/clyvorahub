import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getActiveDownload = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin
      .from("download_files")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching download:", error);
      return { file: null };
    }

    if (!data) return { file: null };

    // Get public URL from storage
    const { data: urlData } = supabaseAdmin.storage
      .from("downloads")
      .getPublicUrl(data.storage_path);

    return {
      file: {
        ...data,
        download_url: urlData.publicUrl,
      },
    };
  }
);
