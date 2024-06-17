"use client";

import {
	type Card,
	useMutation,
	useStorage,
	Column as ColumnT,
	useSelf,
} from "@/app/liveblocks.config";
import {
	CancelButton,
	CardComponent as ColumnCard,
	NewCardForm,
} from "@/components";
import { faEllipsis, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallow } from "@liveblocks/client";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { FormEvent, useState } from "react";
import { ReactSortable } from "react-sortablejs";

type Props = {
	column: ColumnT;
	filterActive: boolean;
};

export function Column({ column, filterActive }: Props) {
	const [inputValue, setInputValue] = useState("");
	const { id, name, limitPerUser } = column;
	const [renameMode, setRenameMode] = useState(false);
	const [createCardMode, setCreateCardMode] = useState(false);

	const email = useSelf((me) => me.info.email);

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

	const deleteColumn = useMutation(({ storage }, id) => {
		const columns = storage.get("columns");
		const columnIndex = columns.findIndex((c) => c.toObject().id === id);
		columns.delete(columnIndex);
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

	function filterCards() {
		return columnCards?.filter((card) => card.assignedTo === email);
	}

	function getChipColor():
		| "warning"
		| "danger"
		| "default"
		| "primary"
		| "secondary"
		| "success"
		| undefined {
		const cards = filterCards();

		if (!cards) {
			return undefined;
		}

		const percentage = cards.length / limitPerUser;

		if (percentage <= 0.5) {
			return "success";
		} else if (percentage > 0.5 && percentage < 0.8) {
			return "warning";
		} else {
			return "danger";
		}
	}

	if (filterActive) {
		return (
			<div className="w-70 bg-transparent hover:shadow-md rounded-md p-2">
				{!renameMode && (
					<div className="flex pl-4 justify-between font-bold capitalize bg-white p-2 rounded-md place-items-center gap-3">
						<h3>{name}</h3>
						<Tooltip content="Only counting cards assigned to you">
							<Chip variant="bordered" color={getChipColor()}>
								{filterCards()?.length}/{limitPerUser}
							</Chip>
						</Tooltip>
						<button
							onClick={() => setRenameMode(true)}
							className="text-gray-300 hover:text-gray-600"
						>
							<FontAwesomeIcon
								className="p-3 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-200 ease-in-out shadow-md "
								icon={faEllipsis}
							/>
						</button>
					</div>
				)}
				{renameMode && (
					<div className="mb-8 min-w-64">
						Edit name:
						<form onSubmit={handleRenameSubmit} className="mb-2">
							<input
								type="text"
								defaultValue={name}
								onChange={(e) => setInputValue(e.target.value)}
							/>
							<button
								type="submit"
								className={
									inputValue === ""
										? "bg-gray-300 text-gray-600 rounded-md p-2 w-full mt-2 px-3"
										: "w-full mt-2 bg-thirdColor text-white p-2 rounded-md hover:bg-primaryColor duration-300 hover:shadow-lg"
								}
								disabled={inputValue === ""}
							>
								Save
							</button>
						</form>
						<button
							onClick={() => deleteColumn(id)}
							className="bg-red-500 text-white p-2 flex gap-2 w-full items-center rounded-md justify-center hover:bg-red-800 "
						>
							<FontAwesomeIcon icon={faTrash} />
							Delete column
						</button>
						<CancelButton onClick={() => setRenameMode(false)} />
					</div>
				)}
				{filterCards()?.map((card) => (
					<ColumnCard key={card.id} {...card} />
				))}
			</div>
		);
	}

	return (
		<div className="w-70 bg-transparent hover:shadow-md rounded-md p-2">
			{!renameMode && (
				<div className="flex pl-4 justify-between font-bold capitalize bg-white p-2 rounded-md place-items-center gap-3">
					<h3>{name}</h3>
					<Tooltip content="Only counting cards assigned to you">
						<Chip variant="bordered" color={getChipColor()}>
							{filterCards()?.length}/{limitPerUser}
						</Chip>
					</Tooltip>
					<button
						onClick={() => setRenameMode(true)}
						className="text-gray-300 hover:text-gray-600"
					>
						<FontAwesomeIcon
							className="p-3 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-200 ease-in-out shadow-md "
							icon={faEllipsis}
						/>
					</button>
				</div>
			)}
			{renameMode && (
				<div className="mb-8 min-w-64">
					Edit name:
					<form onSubmit={handleRenameSubmit} className="mb-2">
						<input
							type="text"
							defaultValue={name}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<button
							type="submit"
							className={
								inputValue === ""
									? "bg-gray-300 text-gray-600 rounded-md p-2 w-full mt-2 px-3"
									: "w-full mt-2 bg-thirdColor text-white p-2 rounded-md hover:bg-primaryColor duration-300 hover:shadow-lg"
							}
							disabled={inputValue === ""}
						>
							Save
						</button>
					</form>
					<button
						onClick={() => deleteColumn(id)}
						className="bg-red-500 text-white p-2 flex gap-2 w-full items-center rounded-md justify-center hover:bg-red-800 "
					>
						<FontAwesomeIcon icon={faTrash} />
						Delete column
					</button>
					<CancelButton onClick={() => setRenameMode(false)} />
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
						<ColumnCard key={card.id} {...card} />
					))}
				</ReactSortable>
			)}
			{!createCardMode && !renameMode && (
				<button
					onClick={() => setCreateCardMode(true)}
					className="bg-forthColor text-primaryColor font-bold p-2 rounded-md w-full mt-2 gap-2 flex pl-5 items-center hover:bg-primaryColor hover:text-forthColor transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg"
				>
					<FontAwesomeIcon icon={faPlus} />
					Create card
				</button>
			)}
			{createCardMode && (
				<>
					<NewCardForm
						columnId={id}
						changeCreateMode={() => setCreateCardMode(false)}
					/>
					<CancelButton onClick={() => setCreateCardMode(false)} />
				</>
			)}
		</div>
	);
}
