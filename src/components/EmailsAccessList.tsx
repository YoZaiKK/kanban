"use client";

import { deleteBoard, removeEmailFromBoard } from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";
import { idText } from "typescript";

export const EmailsAccessList = ({
	boardId,
	usersAccesses,
}: {
	boardId: string;
	usersAccesses: RoomAccesses;
}) => {
	const router = useRouter();

	async function handleDelete(emailToDelete: string) {
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
					<button className="btn p-1" onClick={() => handleDelete(email)}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			))}
		</div>
	);
};
