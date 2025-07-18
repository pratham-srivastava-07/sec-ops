export async function syncUserToBackend({
    id,
    name,
    email,
    webhookUrl,
  }: {
    id: string;
    name: string;
    email: string;
    webhookUrl: string;
  }) {
    try {
      const res = await fetch(`${webhookUrl}/api/v1/webhooks/supabase-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authId: id, name, email }),
      });
  
      if (!res.ok) {
        console.error("Failed to sync user to backend:", await res.text());
        return false;
      }
  
      return true;
    } catch (err) {
      console.error("Error syncing user to backend:", err);
      return false;
    }
  }