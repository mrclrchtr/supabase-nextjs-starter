// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
	process.env.NEXT_PUBLIC_SUPABASE_URL &&
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const environment = {
	NEXT_PUBLIC_SUPABASE_URL: requiredEnv(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		"NEXT_PUBLIC_SUPABASE_URL",
	),
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: requiredEnv(
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
		"NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
	),
};

function requiredEnv(value: string | undefined, name: string): string {
	if (!hasEnvVars) return ""; // TODO: This check should be removed, it is just for tutorial purposes
	if (!value) throw new Error(`Missing environment variable: ${name}`);
	return value;
}
