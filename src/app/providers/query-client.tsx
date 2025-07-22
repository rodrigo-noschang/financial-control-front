"use client";

import {
	QueryClient,
	QueryClientProvider as ReactQueryProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

interface IQueryClientProviderProps {
	children: ReactNode;
}

export function QueryClientProvider({ children }: IQueryClientProviderProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	return (
		<ReactQueryProvider client={queryClient}>{children}</ReactQueryProvider>
	);
}
