import type { SupabaseClient } from "@supabase/supabase-js";
import type { Note } from "@/features/notes/types/note";

export async function getNotes(
	supabase: SupabaseClient,
): Promise<{ notes: Note[]; error: string | null }> {
	const { data, error } = await supabase
		.from("notes")
		.select("id, title, body")
		.order("id", { ascending: true });

	if (error) {
		return { notes: [], error: error.message };
	}

	return {
		notes: (data ?? []).map((note) => ({
			id: note.id,
			title: note.title,
			body: note.body,
		})),
		error: null,
	};
}
