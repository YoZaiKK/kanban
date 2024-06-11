"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextProps } from "@/components";
import {
	type Card,
	useMutation,
	useStorage,
	useThreads,
} from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Composer, Thread } from "@liveblocks/react-comments";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faComments, faFileLines } from "@fortawesome/free-regular-svg-icons";
import {
	CancelButton,
	CardDescription,
	DeleteWithConfirmation,
} from "@/components";
import "@liveblocks/react-comments/styles.css";

export const CardModalBody = () => {
	const router = useRouter();
	const params = useParams();
	const { setOpenCard } = useContext<BoardContextProps>(BoardContext);
	const [editMode, setEditMode] = useState(false);
	const { threads } = useThreads({
		query: {
			metadata: {
				cardId: params.cardId.toString(),
			},
		},
	});

	const card = useStorage(
		(root) => root.cards.find((card) => card.id === params.cardId),
		shallow
	);

	const updateCard = useMutation(({ storage }, cardId, updateData) => {
		const cards = storage.get("cards").map((c) => c.toObject());
		const index = cards.findIndex((card) => card.id === cardId);
		const card = storage.get("cards").get(index);

		for (let updateKey in updateData) {
			card?.set(updateKey as keyof Card, updateData[updateKey]);
		}
	}, []);

	const deleteCard = useMutation(({ storage }, id) => {
		const cards = storage.get("cards");
		const cardIndex = cards.findIndex((c) => c.toObject().id === id);
		cards.delete(cardIndex);
	}, []);

	useEffect(() => {
		if (params.cardId && setOpenCard) {
			setOpenCard(params.cardId.toString());
		}
	}, [params]);

	function handleDelete() {
		deleteCard(params.cardId);
		if (!setOpenCard) return;
		setOpenCard(null);
		router.back();
	}
	function handleNameChange(ev: FormEvent) {
		ev.preventDefault();

		const input = (ev.target as HTMLFormElement).querySelector("input");
		if (!input) return;
		const newName = input.value;
		updateCard(params.cardId, { name: newName });
		setEditMode(false);
	}

	return (
		<>
			{!editMode && (
				<div className="flex justify-between">
					<h4 className="text-2xl">{card?.name}</h4>
					<button
						className=" text-gray-300 hover:text-gray-600"
						onClick={() => setEditMode(true)}
					>
						<FontAwesomeIcon
							icon={faEllipsis}
							className="p-3 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-200 ease-in-out shadow-md "
						/>
					</button>
				</div>
			)}
			{editMode && (
				<div>
					<form action="" onSubmit={handleNameChange}>
						<input type="text" defaultValue={card?.name} className="mb-2" />
						<button
							type="submit"
							className="w-full mt-2
				bg-thirdColor text-white p-2 rounded-md hover:bg-primaryColor duration-300 hover:shadow-lg"
						>
							Save
						</button>
					</form>
					<div className="mt-2">
						<DeleteWithConfirmation onDelete={() => handleDelete()} />
					</div>
					<CancelButton onClick={() => setEditMode(false)} />
				</div>
			)}
			{!editMode && (
				<div>
					<h2 className="flex gap-2 items-center mt-4">
						<FontAwesomeIcon icon={faFileLines} />
						Description
					</h2>
					<CardDescription />
					<h2 className="flex gap-2 items-center mt-4">
						<FontAwesomeIcon icon={faComments} />
						Comments
					</h2>

					<div className="-mx-4">
						{threads &&
							threads.map((thread) => (
								<div key={thread.id}>
									<Thread thread={thread} id={thread.id} />
								</div>
							))}
						{threads?.length === 0 && (
							<div>
								<Composer metadata={{ cardId: params.cardId.toString() }} />
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};
