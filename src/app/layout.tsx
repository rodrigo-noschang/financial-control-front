import type { Metadata } from "next";
import "./globals.css";

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
				{children}
			</body>
		</html>
	);
}
