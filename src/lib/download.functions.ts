import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export const getActiveDownload = createServerFn({ method: "GET" }).handler(
  async () => {
    const { data, error } = await supabase
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
    const { data: urlData } = supabase.storage
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
