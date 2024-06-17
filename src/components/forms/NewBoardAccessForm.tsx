"use client";

import { addEmailToBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function NewBoardAccess({ boardId }: { boardId: string }) {
	const [inputValue, setInputValue] = useState("");
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	async function addEmail(formData: FormData) {
		const email = formData.get("email")?.toString() || "";
		await addEmailToBoard(boardId, email);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
		router.refresh();
	}

	// The next const is equals to false if the input value is not an email, it uses a regex to check if the input value is an email
	const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);

	return (
		<form action={addEmail} className="max-w-xs">
			<h2 className="text-lg mb-2">Add email</h2>
			<input
				ref={inputRef}
				onChange={(e) => setInputValue(e.target.value)}
				type="text"
				placeholder="john@example.com"
				name="email"
			/>
			<button
				className={
					inputValue === "" || !isValidEmail
						? "bg-gray-300 text-gray-600 rounded-md p-2 w-full mt-2 px-3"
						: "w-full mt-2 bg-thirdColor text-white p-2 rounded-md hover:bg-primaryColor duration-300 hover:shadow-lg "
				}
				type="submit"
				disabled={inputValue === "" || !isValidEmail}
			>
				Save
			</button>
		</form>
	);
}
