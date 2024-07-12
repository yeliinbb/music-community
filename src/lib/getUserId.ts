import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const enableMutation = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  return userId;
};
