"use client";
import { faG } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

export const LoginView = () => {
	return (
		<div className="w-full pt-8 text-center justify-center">
			<button
				type="button"
				className="primary gap-4 justify-center items-center hover:bg-white hover:border-black duration-300 ease-in-out hover:shadow-lg
				 "
				onClick={() => signIn("google")}
			>
				Login with google
				<FontAwesomeIcon className="pl-4" icon={faG} />
			</button>
		</div>
	);
};
