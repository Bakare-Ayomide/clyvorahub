import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_EMAIL = "earr.music@gmail.com";
const ADMIN_PASSWORD = "@f33rinimi";

export const seedAdminUser = createServerFn({ method: "POST" }).handler(
  async () => {
    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existing = existingUsers?.users?.find(
      (u) => u.email === ADMIN_EMAIL
    );

    let userId: string;

    if (existing) {
      userId = existing.id;
    } else {
      // Create the admin user
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
      if (error) throw new Error(`Failed to create admin: ${error.message}`);
      userId = data.user.id;
    }

    // Always ensure admin role exists (upsert)
    const { error: deleteError } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", "admin");
    
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });
    
    if (roleError)
      throw new Error(`Failed to assign role: ${roleError.message}`);

    return { success: true, message: "Admin user ready" };
  }
);

export const checkIsAdmin = createServerFn({ method: "POST" })
  .inputValidator((input: { userId: string }) => input)
  .handler(async ({ data }) => {
    const { data: role } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", data.userId)
      .eq("role", "admin")
      .maybeSingle();

    return { isAdmin: !!role };
  });
