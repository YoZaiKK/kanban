"use client";

import { signIn } from "next-auth/react";

export const LoginButton = () => {
	return (
		<button
			onClick={() => signIn("google")}
			className="bg-blue-500 py-2 px-4 ml-2 text-white rounded-md"
		>
			Login
		</button>
	);
};
