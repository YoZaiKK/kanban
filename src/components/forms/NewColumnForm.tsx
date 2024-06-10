"use client";

import { useMutation } from "@/app/liveblocks.config";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveObject } from "@liveblocks/client";
import { FormEvent, useState } from "react";
import uniqid from "uniqid";
import { CancelButton } from "../CancelButton";
import { Tooltip } from "@nextui-org/tooltip";

export function NewColumnForm() {
	const [addNewColumn, setAddNewColumn] = useState(false);

	const addColumn = useMutation(({ storage }, columnName, limitInput) => {
		storage.get("columns").push(
			new LiveObject({
				name: columnName,
				id: uniqid.time(),
				index: 9999,
				limitPerUser: limitInput,
			})
		);
	}, []);

	function handleNewColumn(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const input = (event.target as HTMLFormElement).querySelector("input");
		const limitInput = (event.target as HTMLFormElement).querySelectorAll(
			"input"
		)[1];

		if (input && limitInput) {
			const columnName = input?.value;
			const limit = limitInput?.value;
			addColumn(columnName, limit);
			input.value = "";
			setAddNewColumn(false);
		}
	}

	return (
		<div className="  ">
			{!addNewColumn && (
				<button
					onClick={() => setAddNewColumn(true)}
					className="bg-thirdColor text-forthColor rounded-md hover:bg-primaryColor  transition-colors items-center justify-center flex p-2 w-10 h-10 mt-4"
				>
					<Tooltip
						content="Create board"
						closeDelay={3000}
						defaultOpen
						placement="top-end"
					>
						<FontAwesomeIcon icon={faPlus} className="h-4 w-4 p-2" />
					</Tooltip>
				</button>
			)}
			{addNewColumn && (
				<form onSubmit={handleNewColumn} className="max-w-xs">
					<label htmlFor="" className="block">
						<span className="text-gray-600 block w-full">Column name: </span>
						<div className="flex gap-2">
							<input
								type="text"
								className="w-full h-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:border-primaryColor transition-colors"
								placeholder="new column name"
							/>
							{/* input for the card limit per user */}
							<input
								type="number"
								className="w-20 h-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:border-primaryColor transition-colors"
								placeholder="limit"
							/>

							<button
								type="submit"
								className="bg-thirdColor text-forthColor rounded-md hover:bg-primaryColor  transition-colors items-center justify-center flex p-2 w-10 h-10"
							>
								<FontAwesomeIcon icon={faPlus} className="h-4 w-4 p-2" />
							</button>
						</div>
					</label>
					<CancelButton onClick={() => setAddNewColumn(false)} />
				</form>
			)}
		</div>
	);
}
