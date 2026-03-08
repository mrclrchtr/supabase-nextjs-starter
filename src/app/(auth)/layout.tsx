type AuthLayoutProps = {
	children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">{children}</div>
		</div>
	);
}
