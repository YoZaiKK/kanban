"use client";

import {
	RoomProvider,
	useSelf,
	useUpdateMyPresence,
} from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { Columns } from "./Columns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpWideShort, faBars } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useEffect, useState } from "react";
import { updateBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";
import { BoardContextProvider } from "./BoardContext";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export function Board({ id, name }: { id: string; name: string }) {
	const [renameMode, setRenameMode] = useState(false);
	const router = useRouter();
	const updateMyPresence = useUpdateMyPresence();
	const me = useSelf();
	// console.log({ me });
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
							<div className="flex gap-2 justify-between items-center mb-4">
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
								<span>
									<FontAwesomeIcon
										className="p-3 h-4 border-1  rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md"
										icon={faArrowUpWideShort}
									/>
									<Link
										className="text-gray-300 hover:text-gray-600"
										href={`/boards/${id}/settings`}
									>
										<FontAwesomeIcon
											icon={faBars}
											className="p-3 border-1 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md"
										/>
									</Link>
								</span>
							</div>
							<Columns />
						</>
					)}
				</ClientSideSuspense>
			</RoomProvider>
		</BoardContextProvider>
	);
}
