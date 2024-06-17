"use client";

import { Card, useMutation, useSelf } from "@/app/liveblocks.config";
import { faPlus, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveObject } from "@liveblocks/client";
import uniqid from "uniqid";
import { Tooltip } from "@nextui-org/tooltip";

export function GenerateTemplate() {
	const email = useSelf((me) => me.info.email);

	function handleNewColumn() {
		addColumn("To do", 5, todoTaks);
		addColumn("In progress", 5, inProgressTasks);
		addColumn("Done", 5, doneTasks);
	}

	const todoTaks = [
		"Create a new board",
		"Create a new column",
		"Create a new card",
	];

	const inProgressTasks = ["Get the user info", "Add some users to the board"];

	const doneTasks = [
		"Create a new board",
		"Create a new column",
		"Create a new card",
	];

	const addColumn = useMutation(
		({ storage }, columnName: string, limitInput: number, tasks: string[]) => {
			const colId = uniqid.time();
			storage.get("columns").push(
				new LiveObject({
					name: columnName,
					id: colId,
					index: 9999,
					limitPerUser: limitInput,
				})
			);
			tasks.forEach((task) => {
				storage.get("cards").push(
					new LiveObject<Card>({
						name: task,
						id: uniqid.time(),
						index: 9999,
						author: email || "mail@example.com",
						assignedTo: email || "mail@example.com",
						columnId: colId,
						percentComplete: 0,
						start: "2024-07-07",
						end: "2024-10-08",
					})
				);
			}, []);
		},
		[]
	);

	return (
		<div className="  ">
			<Tooltip content="Generate default board" placement="top">
				<button
					onClick={handleNewColumn}
					className="bg-thirdColor text-forthColor rounded-md hover:bg-primaryColor  transition-colors items-center justify-center flex p-2 mt-4"
				>
					Generate template
					<FontAwesomeIcon icon={faTableCells} className="h-5 w-5 ml-2" />
				</button>
			</Tooltip>
		</div>
	);
}
