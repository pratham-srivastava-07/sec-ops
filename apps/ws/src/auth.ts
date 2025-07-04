import { supabase } from "@ops/shared";

export default async function verifyUser(token: string) {
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) throw new Error("Unauthorized");
  return data.user;
}
