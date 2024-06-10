"use client";

import { redirect, useRouter } from "next/navigation";
import { createBoard } from "../actions/boardActions";
import { RoomInfo } from "@liveblocks/node";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@nextui-org/switch";
import { useState } from "react";
import { CancelButton } from "@/components";

export default function NewBoardPage() {
	const [inputValue, setInputValue] = useState("");
	const router = useRouter();
	async function handleNewBoardSubmit(formData: FormData) {
		console.log(formData);
		const boardName = formData.get("name")?.toString() || "";
		const { id } = (await createBoard(boardName as string)) as RoomInfo;
		redirect(`/boards/${id}`);
	}

	return (
		<div className="max-w-xs rounded-md shadow-md p-5 border-1">
			<form action={handleNewBoardSubmit} className="max-w-xs block">
				<h1 className="text-2xl mb-4">Create a new board</h1>
				<input
					type="text"
					name="name"
					placeholder="Name"
					onChange={(e) => setInputValue(e.target.value)}
					className="w-full h-10 p-2 rounded-md border-1 border-gray-300 focus:border-primaryColor focus:shadow-md transition-colors duration-300 ease-in-out mb-4"
					value={inputValue}
				/>
				<Switch defaultSelected size="sm" color="success" className="mb-4">
					Private
				</Switch>
				<button
					type="submit"
					className={
						inputValue === ""
							? "bg-gray-300 text-gray-600 rounded-md border-1 items-center flex p-2 h-10 px-3"
							: "bg-primaryColor text-forthColor border-1 rounded-md hover:bg-defaultBG  hover:text-primaryColor hover:border-primaryColor transition-colors items-center flex p-2 h-10 px-3"
					}
					disabled={inputValue === ""}
				>
					<FontAwesomeIcon icon={faPlus} className="h-4 w-4 p-2" />
					Create
				</button>
			</form>
			<CancelButton onClick={() => router.back()} />
		</div>
	);
}
