// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
	process.env.NEXT_PUBLIC_SUPABASE_URL &&
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const environment = {
	NEXT_PUBLIC_SUPABASE_URL: requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: requiredEnv(
		"NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
	),
};

export function requiredEnv(name: string): string {
	if (!hasEnvVars) return ""; // TODO: This check should be removed, it is just for tutorial purposes

	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value;
}
