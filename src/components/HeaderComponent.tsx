"use server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";
import Link from "next/link";

export default async function Header() {
	//get the session
	const session = await getServerSession(authOptions);

	return (
		<header className="bg-gray-200 p-4 px-8">
			<div className="flex justify-between items-center">
				<Link href="/" className="logo">
					Trello
				</Link>
				<div>
					{session ? (
						<>
							Hello, {session.user?.name}
							<LogoutButton />
						</>
					) : (
						<>
							Not logged in
							<LoginButton />
						</>
					)}
				</div>
			</div>
		</header>
	);
}
