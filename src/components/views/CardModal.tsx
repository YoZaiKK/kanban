"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextProps } from "../BoardContext";
import { type Card, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CancelButton, DeleteWithConfirmation } from "@/components";

export const CardModal = () => {
	const router = useRouter();
	const params = useParams();
	const { setOpenCard } = useContext<BoardContextProps>(BoardContext);
	const [editMode, setEditMode] = useState(false);

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

	function handleBackdropClick() {
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
		<div className="fixed inset-0 bg-black/70" onClick={handleBackdropClick}>
			<div
				className="bg-white p-4 mt-8 max-w-xs mx-auto rounded-md "
				onClick={(ev) => ev.stopPropagation()}
			>
				{!editMode && (
					<div className="flex justify-between">
						<h4>{card?.name}</h4>
						<button
							className=" text-gray-400"
							onClick={() => setEditMode(true)}
						>
							<FontAwesomeIcon icon={faEllipsis} />
						</button>
					</div>
				)}
				{editMode && (
					<div>
						<form action="" onSubmit={handleNameChange}>
							<input type="text" defaultValue={card?.name} className="mb-2" />
							<button type="submit" className=" w-full">
								Save
							</button>
						</form>
						<div className="mt-2">
							<DeleteWithConfirmation onDelete={() => handleDelete()} />
						</div>
						<CancelButton onClick={() => setEditMode(false)} />
					</div>
				)}
			</div>
		</div>
	);
};
