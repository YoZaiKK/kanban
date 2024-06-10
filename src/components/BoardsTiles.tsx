"use client";
import { RoomProvider } from "@/app/liveblocks.config";
import { PresenceAvatars } from "@/components";
import { RoomInfo } from "@liveblocks/node";
import Link from "next/link";

export const BoardsTiles = async ({ boards }: { boards: RoomInfo[] }) => {
	return (
		<>
			<div className="my-4 grid grid-cols-1 gap-2">
				{boards?.length > 0 &&
					boards.map((board) => (
						<Link
							className="bg-white hover:bg-defaultBG px-8 py-12 rounded-md relative shadow-md hover:shadow-lg transition-colors duration-300 ease-in-out font-bold flex justify-between  border-1"
							href={`/boards/${board.id}`}
							key={board.id}
						>
							<div>Titulo: {board.metadata.boardName}</div>
							<div className="font-normal">
								Autor:{board.metadata.createdBy}
							</div>
							<div> ID del proyecto: {board.id} </div>
							<RoomProvider id={board.id} initialPresence={{}}>
								<div className="absolute bottom-1 right-1">
									<PresenceAvatars
										presenceKey="boardId"
										presenceValue={board.id}
									/>
								</div>
							</RoomProvider>
						</Link>
					))}
			</div>
		</>
	);
};
