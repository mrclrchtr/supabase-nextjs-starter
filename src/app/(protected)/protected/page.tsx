import { Suspense } from "react";
import { ProtectedContent } from "@/app/(protected)/protected/_components/protected-content";

export default function ProtectedPage() {
	return (
		<Suspense
			fallback={
				<div className="text-sm text-muted-foreground">
					Loading protected content...
				</div>
			}
		>
			<ProtectedContent />
		</Suspense>
	);
}
