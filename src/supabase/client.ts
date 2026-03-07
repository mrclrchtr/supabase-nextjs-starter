import { createBrowserClient } from "@supabase/ssr";
import { environment } from "@/utils/env";

export function createClient() {
	return createBrowserClient(
		environment.NEXT_PUBLIC_SUPABASE_URL,
		environment.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
	);
}
