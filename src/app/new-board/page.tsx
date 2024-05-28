"use client";

import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardActions";
import { RoomInfo } from "@liveblocks/node";

export default function NewBoardPage() {
	async function handleNewBoardSubmit(formData: FormData) {
		console.log(formData);
		const boardName = formData.get("name")?.toString() || "";
		const { id } = (await createBoard(boardName as string)) as RoomInfo;
		redirect(`/boards/${id}`);
	}
	return (
		<div>
			<form action={handleNewBoardSubmit} className="max-w-xs block">
				<h1 className="text-2xl mb-4">Create a new board</h1>
				<input type="text" name="name" placeholder="board name" />
				<button type="submit" className="mt-2 w-full">
					Create board
				</button>
			</form>
		</div>
	);
}
