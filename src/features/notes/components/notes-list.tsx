import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Note } from "@/features/notes/types/note";

type NotesListProps = {
	title: string;
	description: string;
	notes: Note[];
	emptyTitle: string;
	emptyDescription: string;
};

export function NotesList({
	title,
	description,
	notes,
	emptyTitle,
	emptyDescription,
}: NotesListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				{notes.length > 0 ? (
					<ul className="space-y-3">
						{notes.map((note) => (
							<li key={note.id} className="rounded-lg border p-4">
								<h3 className="font-medium">{note.title}</h3>
								<p className="mt-2 text-sm text-muted-foreground">
									{note.body}
								</p>
							</li>
						))}
					</ul>
				) : (
					<div className="rounded-lg border border-dashed p-4">
						<h3 className="font-medium">{emptyTitle}</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							{emptyDescription}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
