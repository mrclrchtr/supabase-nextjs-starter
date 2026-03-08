import Link from "next/link";
import { Suspense } from "react";
import { EnvVarWarning } from "@/components/shared/env-var-warning";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { AuthButton } from "@/features/auth/components/auth-button";
import { hasEnvVars } from "@/lib/env";

type AppShellProps = {
	children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
	return (
		<main className="flex min-h-screen flex-col items-center">
			<div className="flex w-full flex-1 flex-col items-center gap-20">
				<nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
					<div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
						<div className="flex items-center gap-5 font-semibold">
							<Link href="/">Next.js Supabase Starter</Link>
						</div>
						{!hasEnvVars ? (
							<EnvVarWarning />
						) : (
							<Suspense>
								<AuthButton />
							</Suspense>
						)}
					</div>
				</nav>
				<div className="flex w-full max-w-5xl flex-1 flex-col gap-20 p-5">
					{children}
				</div>
				<footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-16 text-center text-xs">
					<p>
						Powered by{" "}
						<a
							href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
							target="_blank"
							className="font-bold hover:underline"
							rel="noreferrer"
						>
							Supabase
						</a>
					</p>
					<ThemeSwitcher />
				</footer>
			</div>
		</main>
	);
}
