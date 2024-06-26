"use client";
import { deleteBoard } from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const BoardDeleteButton = ({ boardId }: { boardId: string }) => {
	const router = useRouter();
	async function handleDeleteBoard() {
		await deleteBoard(boardId);
		router.push("/");
	}
	return (
		<div className="">
			<Button
				className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 duration-300 hover:shadow-lg"
				onClick={() => handleDeleteBoard()}
			>
				<FontAwesomeIcon icon={faTrash} />
			</Button>
		</div>
	);
};
