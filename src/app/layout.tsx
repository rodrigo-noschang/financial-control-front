import type { Metadata } from "next";
import { QueryClientProvider } from "./providers/query-client";

import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
	title: "Financial Control",
	description: "An app developed as a test and to control some of my finances",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="w-dvw h-dvh bg-page-bg text-standard-color text-standard-size">
				<QueryClientProvider>{children}</QueryClientProvider>
			</body>
		</html>
	);
}
