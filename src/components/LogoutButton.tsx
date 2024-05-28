"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
	return (
		<button
			onClick={() => signOut()}
			className="bg-gray-300 py-2 px-4 ml-2 rounded-md inline-flex items-center gap-2"
		>
			Logout
			<FontAwesomeIcon icon={faArrowRightFromBracket} />
		</button>
	);
};
