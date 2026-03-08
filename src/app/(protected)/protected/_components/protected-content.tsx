import { InfoIcon } from "lucide-react";
import { getProtectedPageData } from "@/app/(protected)/protected/_lib/get-protected-page-data";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { NotesList } from "@/features/notes/components/notes-list";
import { ReactQueryExample } from "@/features/notes/components/react-query-example";

export async function ProtectedContent() {
	const { email, userId, notes, notesError } = await getProtectedPageData();

	return (
		<div className="flex w-full flex-1 flex-col gap-8">
			<div className="bg-accent text-foreground flex items-center gap-3 rounded-md p-3 px-5 text-sm">
				<InfoIcon size={16} strokeWidth={2} />
				You&apos;re signed in. This page shows account details alongside starter
				notes loaded from Supabase.
			</div>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
				<Card>
					<CardHeader>
						<CardTitle>Signed-in account</CardTitle>
						<CardDescription>
							Keep auth focused on identity, then load your product data inside
							the protected route.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<p className="text-sm text-muted-foreground">Email</p>
							<p className="font-medium">{email}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">User ID</p>
							<p className="font-mono text-xs break-all">{userId}</p>
						</div>
						<Badge variant="outline">Protected area</Badge>
					</CardContent>
				</Card>

				<NotesList
					title="Starter notes"
					description="These notes are rendered on the server from the seeded Supabase table."
					notes={notes}
					emptyTitle={
						notesError ? "Notes are not ready yet" : "No starter notes yet"
					}
					emptyDescription={
						notesError
							? "Run the local Supabase migration and seed flow, then reload this page."
							: "Add a few records once you connect this page to your first real Supabase table."
					}
				/>
			</div>

			<ReactQueryExample initialNotes={notes} />
		</div>
	);
}
