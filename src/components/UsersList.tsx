import { liveblocksClient } from "@/lib/liveblocksClient";
import { Chip } from "@nextui-org/chip";

export const UsersList = async ({ boardId }: { boardId: string }) => {
	const boardInfo = await liveblocksClient.getRoom(boardId);
	const usersAccesses = boardInfo.usersAccesses;
	const users = Object.keys(usersAccesses);

	return (
		<>
			{users.map((email) => (
				<Chip key={email}>{email}</Chip>
			))}
		</>
	);
};
