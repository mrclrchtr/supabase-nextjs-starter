import { redirect } from "next/navigation";
import { getNotes } from "@/features/notes/server/get-notes";
import { createClient } from "@/lib/supabase/server";

export async function getProtectedPageData() {
	const supabase = await createClient();
	const [{ data, error }, { notes, error: notesError }] = await Promise.all([
		supabase.auth.getClaims(),
		getNotes(supabase),
	]);

	if (error || !data?.claims) {
		redirect("/auth/login");
	}

	return {
		email: data.claims.email ?? "Signed-in user",
		userId: data.claims.sub,
		notes,
		notesError,
	};
}
