import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Note } from "@/features/notes/types/note";

type NotesQueryData = {
	notes: Note[];
};

type UseNotesQueryOptions = {
	initialData?: NotesQueryData;
};

const useNotesQuery = ({
	initialData,
}: UseNotesQueryOptions = {}): UseQueryResult<NotesQueryData, Error> =>
	useQuery({
		queryKey: ["/api/notes"],
		queryFn: async () => {
			const { data } = await axios.get("/api/notes");

			return data;
		},
		initialData,
	});

export default useNotesQuery;
