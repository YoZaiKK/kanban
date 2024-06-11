"use server";

import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { BoardsTiles } from "./BoardsTiles";

export const Boards = async () => {
	const email = await getUserEmail();
	const { data: rooms } = await liveblocksClient.getRooms({
		userId: email,
	});
	return <BoardsTiles boards={rooms} email={email} />;
};
