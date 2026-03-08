import { Hero } from "@/app/_components/hero";
import { ConnectSupabaseSteps } from "@/app/_components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/app/_components/tutorial/sign-up-user-steps";
import { AppShell } from "@/components/shared/app-shell";
import { hasEnvVars } from "@/lib/env";

export default function Home() {
	return (
		<AppShell>
			<Hero />
			<section className="flex flex-1 flex-col gap-6 px-4">
				<h2 className="mb-4 text-xl font-medium">Next steps</h2>
				{hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
			</section>
		</AppShell>
	);
}
