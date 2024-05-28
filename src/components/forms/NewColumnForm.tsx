"use client";

import { useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid";

export function NewColumnForm() {
	const addColumn = useMutation(({ storage }, columnName) => {
		storage.get("columns").push(
			new LiveObject({
				name: columnName,
				id: uniqid.time(),
				index: 9999,
			})
		);
	}, []);

	function handleNewColumn(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const input = (event.target as HTMLFormElement).querySelector("input");
		if (input) {
			const columnName = input?.value;
			addColumn(columnName);
			input.value = "";
		}
	}

	return (
		<form onSubmit={handleNewColumn} className="max-w-xs">
			<label htmlFor="" className="block">
				<span className="text-gray-600 block">Column name: </span>
				<input type="text" placeholder="new column name" />
			</label>
			<button type="submit" className="mt-2 block w-full">
				Create column
			</button>
		</form>
	);
}
