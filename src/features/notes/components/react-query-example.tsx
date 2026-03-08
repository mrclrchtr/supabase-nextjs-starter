"use client";

import { NotesList } from "@/features/notes/components/notes-list";
import useNotesQuery from "@/features/notes/hooks/use-notes-query";
import type { Note } from "@/features/notes/types/note";

type ReactQueryExampleProps = {
	initialNotes: Note[];
};

export const ReactQueryExample = ({ initialNotes }: ReactQueryExampleProps) => {
	const { isLoading, data } = useNotesQuery({
		initialData: { notes: initialNotes },
	});

	if (isLoading) return <div>Loading notes...</div>;

	return (
		<NotesList
			title="React Query notes"
			description="These notes hydrate from the protected page and stay in sync through the local API route."
			notes={data?.notes ?? []}
			emptyTitle="No notes returned"
			emptyDescription="Run the local Supabase migration and seed flow, then reload to verify the client-side query path."
		/>
	);
};
