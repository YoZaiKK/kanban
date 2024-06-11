"use client";

import { useSelf } from "@/app/liveblocks.config";
import { BoardCard, NewBoardFormModal } from "@/components";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomInfo } from "@liveblocks/node";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";

export const BoardsTiles = ({
	boards,
	email,
}: {
	boards: RoomInfo[];
	email: string;
}) => {
	const [filter, setFilter] = useState(false);

	function filterBoards() {
		return boards.filter((board) => board.metadata.createdBy === email);
	}

	// if the filter is active, it will show only the boards created by the user, else it will show all the boards
	if (filter) {
		boards = filterBoards();
	}

	return (
		<>
			<h1 className="text-4xl font-bold mb-4 flex justify-between items-center">
				Your boards
				<Tooltip content="My own" placement="bottom">
					<button
						className="flex items-center"
						onClick={() => setFilter(!filter)}
					>
						<FontAwesomeIcon
							className={
								"p-3 h-4 border-1  rounded-md  hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md" +
								(filter
									? " bg-primaryColor text-forthColor"
									: " bg-defaultBG text-black")
							}
							icon={faUser}
						/>
					</button>
				</Tooltip>
			</h1>
			<NewBoardFormModal />
			<div className="my-4 grid grid-cols-1 gap-4">
				{boards?.length > 0 &&
					boards.map((board) => <BoardCard key={board.id} board={board} />)}
			</div>
		</>
	);
};
