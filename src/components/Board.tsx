"use client";

import {
	RoomProvider,
	useSelf,
	useStorage,
	useUpdateMyPresence,
} from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { Columns } from "./Columns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpWideShort,
	faBars,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useEffect, useState } from "react";
import { updateBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";
import { BoardContextProvider } from "./BoardContext";
import { faPenToSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "@nextui-org/tooltip";

export function Board({ id, name }: { id: string; name: string }) {
	const [renameMode, setRenameMode] = useState(false);
	const [filter, setFilter] = useState(false);
	const router = useRouter();
	const updateMyPresence = useUpdateMyPresence();
	// const email = useSelf((me) => me.info.email);

	// console.log({ email });

	useEffect(() => {
		updateMyPresence({ boardId: id });
		return () => {
			updateMyPresence({ boardId: null });
		};
	}, []);

	async function handleNameSubmit(ev: FormEvent) {
		ev.preventDefault();
		const input = (ev.target as HTMLFormElement).querySelector("input");
		if (input) {
			const newName = input.value;
			await updateBoard(id, { metadata: { boardName: newName } });
			input.value = "";
			setRenameMode(false);
			router.refresh();
		}
	}

	return (
		<BoardContextProvider>
			<RoomProvider
				id={id}
				initialPresence={{
					cardId: null,
					boardId: null,
				}}
				initialStorage={{
					columns: new LiveList(),
					cards: new LiveList(),
				}}
			>
				<ClientSideSuspense fallback={<div>Loading...</div>}>
					{/* // TODO add loading spinner */}
					{() => (
						<>
							<div className="flex gap-2 justify-between items-center mb-4 px-12">
								<div className="">
									{!renameMode && (
										<h1
											className="text-lg text-gray-400"
											onClick={() => setRenameMode(true)}
										>
											Board:
											<div
												className="flex text-3xl font-bold gap-2 text-black capitalize items-center hover:bg-defaultBG hover:drop-shadow-md p-3 rounded-md
											transition-colors duration-400 ease-in-out"
											>
												{name}
												<FontAwesomeIcon className="h-4" icon={faPenToSquare} />
											</div>
										</h1>
									)}
									{renameMode && (
										<form onSubmit={handleNameSubmit}>
											<label htmlFor="Rename Board">
												<h1 className="text-lg text-gray-400">Rename Board</h1>
												<input
													type="text"
													defaultValue={name}
													name="something"
													placeholder=""
												/>
											</label>
										</form>
									)}
								</div>
								<span className="flex gap-2 items-center">
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
									<Tooltip content="Settings" placement="bottom">
										<button
											className="flex items-center"
											onClick={() => router.push(`/boards/${id}/settings`)}
										>
											<FontAwesomeIcon
												icon={faGear}
												className="p-3 h-4 border-1  rounded-md  hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md bg-defaultBG text-black"
											/>
										</button>
									</Tooltip>
								</span>
							</div>
							<Columns filterActive={filter} />
						</>
					)}
				</ClientSideSuspense>
			</RoomProvider>
		</BoardContextProvider>
	);
}
