import { HttpResponse, http } from "msw";
import { ReactQueryExample } from "@/features/notes/components/react-query-example";
import { server } from "@/mocks/server";
import { render, screen } from "@/test/test-utils";

describe("<ReactQueryExample/>", () => {
	it("renders notes from initial data", async () => {
		render(
			<ReactQueryExample
				initialNotes={[
					{
						id: 1,
						title: "Start with a single feature slice",
						body: "Build one protected workflow end to end before expanding the app.",
					},
					{
						id: 2,
						title: "Keep auth and app data separate",
						body: "Use auth to protect the route, then fetch your product data inside it.",
					},
				]}
			/>,
		);

		await screen.findByText("Start with a single feature slice");
		await screen.findByText("Keep auth and app data separate");
	});

	it("renders an empty state from an overridden handler", async () => {
		server.use(http.get("/api/notes", () => HttpResponse.json({ notes: [] })));

		render(<ReactQueryExample initialNotes={[]} />);

		await screen.findByText("No notes returned");
	});
});
