"use client";

import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
	return (
		<Link
			href={"/"}
			onClick={(e) => {
				e.preventDefault();
				signIn("google");
			}}
			className="py-2 px-4 ml-2 inline-flex items-center gap-2
			p-3 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md hover:border-blue-500 hover:text-blue-500 hover:border-1 border-1 border-transparent"
		>
			Login
			<FontAwesomeIcon icon={faArrowRightToBracket} />
		</Link>
	);
};
