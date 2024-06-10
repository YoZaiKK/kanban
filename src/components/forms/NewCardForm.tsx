"use client";

import { type Card, useMutation, useSelf } from "@/app/liveblocks.config";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveObject } from "@liveblocks/core";
import { Select, SelectItem } from "@nextui-org/select";
import { FormEvent, useState } from "react";
import uniqid from "uniqid";

const usuarios = [
	"example@example.com",
	"email@example.com",
	"emaiiiil@example.com",
];

export const NewCardForm = ({
	columnId,
}: // assignedTo = "",
{
	columnId: string;
	// assignedTo: string;
}) => {
	const [inputValue, setInputValue] = useState("");
	const [assignedTo, setAssignedTo] = useState("");
	const userInfo = useSelf((me) => me.info);

	const addCard = useMutation(
		({ storage }, cardName, assignedTo) => {
			return storage.get("cards").push(
				new LiveObject<Card>({
					name: cardName,
					id: uniqid.time(),
					index: 9999,
					author: userInfo?.email.toString() || "",
					assignedTo: assignedTo,
					columnId: columnId,
				})
			);
		},
		[columnId]
	);
	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setAssignedTo(e.target.value);
	};

	function handleNewCardFormSubmit(event: FormEvent) {
		event.preventDefault();
		const input = (event.target as HTMLFormElement).querySelector("input");
		if (input) {
			const cardName = input?.value;
			addCard(cardName, assignedTo);
			input.value = "";
			setInputValue("");
			setAssignedTo("");
		}
	}
	return (
		<form onSubmit={handleNewCardFormSubmit}>
			<div className="grid grid-cols-1 gap-1">
				<input
					type="text"
					placeholder="card name"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					className="block w-full p-2 rounded-md border-1 border-gray-300 focus:border-primaryColor focus:outline-none transition-colors"
				/>
				<Select
					label="Select an user"
					className="block"
					onChange={handleSelectionChange}
				>
					{usuarios.map((user) => (
						<SelectItem key={user} value={user}>
							{user}
						</SelectItem>
					))}
				</Select>
				<button
					type="submit"
					className={
						inputValue === "" || assignedTo === ""
							? "bg-gray-300 text-gray-600 rounded-md border-1 flex p-2 w-10 h-10 items-center justify-center"
							: "bg-thirdColor text-forthColor rounded-md hover:bg-primaryColor  transition-colors items-center justify-center flex p-2 w-10 h-10"
					}
					disabled={inputValue === "" || assignedTo === ""}
				>
					<FontAwesomeIcon icon={faPlus} className="h-4 w-4 p-2" />
				</button>
			</div>
		</form>
	);
};
