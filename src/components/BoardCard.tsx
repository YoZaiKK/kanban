"use client";

import { RoomProvider } from "@/app/liveblocks.config";
import {
	faArrowRight,
	faClose,
	faCross,
	faEye,
	faGear,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Button, Tooltip } from "@nextui-org/react";
import { PresenceAvatars } from "./PresenceAvatars";
import { RoomInfo } from "@liveblocks/node";
import { useRouter } from "next/navigation";
import { deleteBoard } from "@/app/actions/boardActions";
// import { BoardDeleteButton } from "./BoardDeleteButton";
import { useState } from "react";
import { DeleteWithConfirmation } from "./DeleteWithConfirmation";

export const BoardCard = ({ board }: { board: RoomInfo }) => {
	const [editDeleteMode, setEditDeleteMode] = useState(false);
	const router = useRouter();
	async function handleDeleteBoard(boardId: string) {
		await deleteBoard(boardId);
		router.refresh();
	}
	return (
		<div className="flex gap-2">
			<Card
				key={board.id}
				className="rounded-md shadow-md hover:shadow-lg duration-300 transition-shadow ease-in-out w-full"
			>
				<CardHeader className="flex justify-between">
					<div className="text-lg text-gray-500">
						Title:{" "}
						<span className="text-2xl font-bold">
							{board.metadata.boardName}
						</span>
					</div>
				</CardHeader>
				{/* <Divider /> */}
				<CardBody>
					<span>Description</span>
					<div className="grid grid-cols-2">
						<div className="font-normal text-medium text-gray-500">
							<div className=" text-gray-500">
								Autor:{" "}
								<span className="text-primaryColor">
									{board.metadata.createdBy}
								</span>
							</div>
							<div className="text-gray-500">
								ID: <span className="text-thirdColor">{board.id}</span>
							</div>
						</div>
						<div className="flex justify-end">
							{board.usersAccesses && (
								<div className="grid grid-cols-1 gap-1 items-end justify-end">
									{Object.keys(board.usersAccesses).map((email, index) => (
										<>
											{
												// Limit the number of emails to show
												index < 3 && (
													<Chip
														key={email}
														className="items-center bg-defaultBG text-black p-2"
													>
														{email}
													</Chip>
												)
											}
										</>
									))}
								</div>
							)}
						</div>
					</div>
				</CardBody>
				<CardFooter className="flex justify-between">
					<RoomProvider id={board.id} initialPresence={{}}>
						<div className="absolute bottom-1 right-1">
							<PresenceAvatars presenceKey="boardId" presenceValue={board.id} />
						</div>
					</RoomProvider>
				</CardFooter>
			</Card>

			<div className="grid grid-cols-1 gap-2">
				<Tooltip content="Go to board">
					<Button
						className="w-full h-full rounded-md bg-white  text-black hover:bg-thirdColor duration-300 hover:shadow-lg"
						onClick={() => router.push(`/boards/${board.id}`)}
					>
						<FontAwesomeIcon icon={faArrowRight} className="h-6 w-6" />
					</Button>
				</Tooltip>
				<Tooltip content="Edit board">
					<Button
						className="rounded-md w-full h-full duration-300 hover:shadow-lg"
						onClick={() => router.push(`/boards/${board.id}/settings`)}
					>
						<FontAwesomeIcon icon={faGear} className="h-5 w-5" />
					</Button>
				</Tooltip>
				<DeleteWithConfirmation onDelete={() => handleDeleteBoard(board.id)} />
			</div>
		</div>
	);
};
