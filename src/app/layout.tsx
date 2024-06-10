import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components";
import { Providers } from "./providers";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-defaultBG">
			<body className="">
				<Providers>
					<Header />
					<main className="p-8">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
