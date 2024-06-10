"use server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";
import Link from "next/link";
import { MainMenu } from "./MainMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@nextui-org/tooltip";

export default async function Header() {
	//get the session
	const session = await getServerSession(authOptions);

	return (
		<header className=" p-4 px-8 shadow-lg ">
			<div className="flex justify-between items-center">
				<span className="flex gap-8 items-center">
					<MainMenu />
					<Tooltip content="Click to go HomePage">
						<Link
							href="/"
							className="logo flex gap-2 items-center p-2 hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out rounded-md shadow-md"
						>
							2024-A072
							<FontAwesomeIcon icon={faHome} />
						</Link>
					</Tooltip>
				</span>
				<div>
					{session ? (
						<>
							Hello, <span className="font-bold">{session.user?.name}</span>
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
