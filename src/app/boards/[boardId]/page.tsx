"use server";

import { Column } from "@/app/liveblocks.config";
import { Board } from "@/components";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";

type PageProps = {
	params: {
		boardId: string;
	};
};
export default async function BoardPage(props: PageProps) {
	const boardId = props.params.boardId;
	const userEmail = await getUserEmail();
	const boardInfo = await liveblocksClient.getRoom(boardId);
	const limitPerUser = boardInfo.metadata.limitPerUser?.toString() || "0";
	const userAccess = boardInfo.usersAccesses?.[userEmail];

	let hasAccess = userAccess && [...userAccess].includes("room:write");
	if (!hasAccess) {
		return <div>Access Denied</div>;
	}

	return (
		<div>
			<Board name={boardInfo.metadata.boardName.toString()} id={boardId} />
		</div>
	);
}
