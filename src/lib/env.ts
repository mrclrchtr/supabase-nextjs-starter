const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const hasAnyEnvVars = Boolean(supabaseUrl || supabasePublishableKey);

// Allow the app to render setup guidance when Supabase env vars are missing.
// Once one value is configured, require the full pair so partial setups fail fast.
export const hasEnvVars = Boolean(supabaseUrl && supabasePublishableKey);

export const environment = {
	NEXT_PUBLIC_SUPABASE_URL: requiredEnv(
		supabaseUrl,
		"NEXT_PUBLIC_SUPABASE_URL",
	),
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: requiredEnv(
		supabasePublishableKey,
		"NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
	),
};

function requiredEnv(value: string | undefined, name: string): string {
	if (!hasAnyEnvVars) return "";
	if (!value) throw new Error(`Missing environment variable: ${name}`);
	return value;
}
