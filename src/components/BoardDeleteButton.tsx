"use client";
import { deleteBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";

export const BoardDeleteButton = ({ boardId }: { boardId: string }) => {
	const router = useRouter();
	async function handleDeleteBoard() {
		await deleteBoard(boardId);
		router.push("/");
	}
	return (
		<div className="">
			<button
				className=" bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 duration-300 hover:shadow-lg"
				onClick={() => handleDeleteBoard()}
			>
				Delete board
			</button>
		</div>
	);
};
