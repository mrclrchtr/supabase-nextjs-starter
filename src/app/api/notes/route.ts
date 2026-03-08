import { NextResponse } from "next/server";
import { getNotes } from "@/features/notes/server/get-notes";
import { createClient } from "@/lib/supabase/server";
export async function GET() {
	const supabase = await createClient();
	const { notes, error } = await getNotes(supabase);

	if (error) {
		return NextResponse.json({ notes: [], error }, { status: 500 });
	}

	return NextResponse.json({ notes });
}
