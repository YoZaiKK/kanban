"use client";

import { BoardCard, NewBoardFormModal } from "@/components";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomInfo } from "@liveblocks/node";

export const BoardsTiles = ({ boards }: { boards: RoomInfo[] }) => {
	return (
		<>
			<h1 className="text-4xl font-bold mb-4 flex justify-between items-center">
				Your boards
				<FontAwesomeIcon
					className="p-3 h-4 border-1  rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md"
					icon={faArrowUpWideShort}
				/>
			</h1>
			<NewBoardFormModal />
			<div className="my-4 grid grid-cols-1 gap-2">
				{boards?.length > 0 &&
					boards.map((board) => <BoardCard key={board.id} board={board} />)}
			</div>
		</>
	);
};
