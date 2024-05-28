"use client";

import { type Card, useMutation, useStorage } from "@/app/liveblocks.config";
import { NewCardForm } from "@/components";
import {
	faClose,
	faEllipsis,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallow } from "@liveblocks/client";
import { FormEvent, useState } from "react";
import { ReactSortable } from "react-sortablejs";

type ColumnProps = {
	id: string;
	name: string;
};

export function Column({ id, name }: ColumnProps) {
	const [renameMode, setRenameMode] = useState(false);

	const columnCards = useStorage<Card[]>((root) => {
		return root.cards
			.filter((c) => c.columnId === id)
			.map((c) => ({ ...c }))
			.sort((a, b) => a.index - b.index);
	}, shallow);

	const updateCard = useMutation(({ storage }, index, updateData) => {
		const card = storage.get("cards").get(index);
		if (card) {
			for (let key in updateData) {
				card?.set(key as keyof Card, updateData[key]);
			}
		}
	}, []);

	const setCardsOrderForColumn = useMutation(
		({ storage }, sortedCards: Card[], newColumnId) => {
			const idsOfSortedCards = sortedCards.map((c) => c.id.toString());
			const allCards: Card[] = [
				...storage.get("cards").map((c) => c.toObject()),
			];
			idsOfSortedCards.forEach((sortedCardId, colIndex) => {
				const cardStorageIndex = allCards.findIndex(
					(c) => c.id.toString() === sortedCardId
				);
				updateCard(cardStorageIndex, {
					columnId: newColumnId,
					index: colIndex,
				});
			});
		},
		[]
	);

	const updateColumn = useMutation(({ storage }, id, newName) => {
		const columns = storage.get("columns");
		columns.find((c) => c.toObject().id === id)?.set("name", newName);
	}, []);

	function handleRenameSubmit(ev: FormEvent) {
		ev.preventDefault();
		const input = (ev.target as HTMLFormElement).querySelector("input");
		if (input) {
			const newColumnName = input.value;
			updateColumn(id, newColumnName);
			input.value = "";
			setRenameMode(false);
		}
	}
	return (
		<div className="w-48 bg-white shadow-sm rounded-md p-2">
			{!renameMode && (
				<div className="flex justify-between">
					<h3 onClick={() => setRenameMode(true)}>{name}</h3>
					<button className="text-gray-300">
						<FontAwesomeIcon icon={faEllipsis} />
					</button>
				</div>
			)}
			{renameMode && (
				<div className="mb-8">
					Edit name:
					<form onSubmit={handleRenameSubmit} className="mb-2">
						<input type="text" defaultValue={name} />
						<button type="submit" className="w-full mt-2">
							Save
						</button>
					</form>
					<button className="bg-red-500 text-white p-2 flex gap-2 w-full items-center rounded-md justify-center">
						<FontAwesomeIcon icon={faTrash} />
						Delete column
					</button>
					<button
						onClick={() => setRenameMode(false)}
						className="w-full mt-4 gap-2 flex justify-center items-center uppercase text-sm  text-gray-400"
					>
						<FontAwesomeIcon icon={faClose} />
						Cancel
					</button>
				</div>
			)}
			{!renameMode && columnCards && (
				<ReactSortable
					list={columnCards}
					setList={(items) => setCardsOrderForColumn(items, id)}
					group="cards"
					className="min-h-12"
					ghostClass="opacity-40"
				>
					{columnCards.map((card) => (
						<div key={card.id} className="border bg-white my-2 p-4 rounded-md">
							<span>{card.name}</span>
						</div>
					))}
				</ReactSortable>
			)}
			{!renameMode && <NewCardForm columnId={id} />}
		</div>
	);
}
