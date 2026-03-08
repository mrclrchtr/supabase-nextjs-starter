import { createBrowserClient } from "@supabase/ssr";
import { environment } from "@/lib/env";

export function createClient() {
	return createBrowserClient(
		environment.NEXT_PUBLIC_SUPABASE_URL,
		environment.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
	);
}
