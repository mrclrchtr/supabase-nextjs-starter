import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: false } },
});

const Wrapper = ({ children }: { children: ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// All the providers you need for tests can go here : Theme, Redux, etc.
const customRender = (
	ui: ReactNode,
	options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };
