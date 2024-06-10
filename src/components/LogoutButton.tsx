"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
	return (
		<button
			onClick={() => signOut()}
			className=" py-2 px-4 ml-2 inline-flex items-center gap-2
			p-3 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md hover:border-red-500 hover:text-red-500 hover:border-1 border-1 border-transparent
			"
		>
			Logout
			<FontAwesomeIcon icon={faArrowRightFromBracket} />
		</button>
	);
};
