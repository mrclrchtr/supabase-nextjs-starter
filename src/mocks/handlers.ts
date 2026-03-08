import { HttpResponse, http } from "msw";

export const handlers = [
	http.get("/api/notes", () =>
		HttpResponse.json({
			notes: [
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
			],
		}),
	),
];
