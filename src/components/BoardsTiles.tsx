"use client";
import { deleteBoard } from "@/app/actions/boardActions";
import { RoomProvider } from "@/app/liveblocks.config";
import { NewBoardFormModal, PresenceAvatars } from "@/components";
import { faArrowUpWideShort, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomInfo } from "@liveblocks/node";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, Divider } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { useRouter } from "next/navigation";

export const BoardsTiles = ({ boards }: { boards: RoomInfo[] }) => {
	const router = useRouter();
	async function handleDeleteBoard(boardId: string) {
		await deleteBoard(boardId);
		router.refresh();
	}

	return (
		<>
			<h1 className="text-4xl font-bold mb-4 flex justify-between items-center">
				Your boards
				<FontAwesomeIcon
					className="p-3 h-4 border-1  rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md"
					icon={faArrowUpWideShort}
				/>
			</h1>
			<div className="mt-4">
				<NewBoardFormModal />
			</div>
			<div className="my-4 grid grid-cols-1 gap-2">
				{boards?.length > 0 &&
					boards.map((board) => (
						<div key={board.id}>
							<Card
								isPressable
								onPress={() => router.push(`/boards/${board.id}`)}
								className="rounded-md shadow-md hover:shadow-lg duration-300 transition-shadow ease-in-out"
							>
								<CardHeader>
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
											<div className="grid grid-cols-1">
												<Chip>User</Chip>
												<Chip>User</Chip>
											</div>
										</div>
									</div>
								</CardBody>
								<CardFooter className="flex justify-between">
									<Button
										className="
							 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 duration-300 hover:shadow-lg 
							"
										onClick={async () => {
											await handleDeleteBoard(board.id);
										}}
									>
										<FontAwesomeIcon icon={faTrash} />
									</Button>
									<RoomProvider id={board.id} initialPresence={{}}>
										<div className="absolute bottom-1 right-1">
											<PresenceAvatars
												presenceKey="boardId"
												presenceValue={board.id}
											/>
										</div>
									</RoomProvider>
								</CardFooter>
							</Card>
						</div>
					))}
			</div>
		</>
	);
};
