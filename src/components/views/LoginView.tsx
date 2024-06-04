"use client";
import { signIn } from "next-auth/react";

export const LoginView = () => {
	return (
		<div className="w-full pt-8 text-center">
			<button
				type="button"
				className="primary"
				onClick={() => signIn("google")}
			>
				Login
			</button>
		</div>
	);
};
