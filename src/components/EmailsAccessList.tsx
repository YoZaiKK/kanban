"use client";

import { deleteBoard, removeEmailFromBoard } from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";

export const EmailsAccessList = ({
	boardId,
	usersAccesses,
}: {
	boardId: string;
	usersAccesses: RoomAccesses;
}) => {
	const router = useRouter();

	async function handleDelete(emailToDelete: string) {
		const users = Object.keys(usersAccesses);
		if (users.length === 1) {
			await deleteBoard(boardId);
			router.push("/");
			return;
		}
		await removeEmailFromBoard(boardId, emailToDelete);
		router.refresh();
	}

	return (
		<div className="max-w-xs p-4">
			{Object.keys(usersAccesses).map((email) => (
				<div
					key={email}
					className="flex gap-2 my-2 items-center max-w-xs justify-between border rounded-lg pl-4"
				>
					{email}
					<button
						className="btn p-2 hover:bg-red-500 duration-75 hover:text-white rounded-md"
						onClick={() => handleDelete(email)}
					>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			))}
		</div>
	);
};
