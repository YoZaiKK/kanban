"use client";
import { type Column, useStorage, useMutation } from "@/app/liveblocks.config";
import { Column as BoardColumn, NewColumnForm } from "@/components/";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";
import { ReactSortable } from "react-sortablejs";

export const Columns = () => {
	const columns = useStorage(
		(root) => root.columns.map((c) => ({ ...c })),
		shallow
	);

	const updateColumn = useMutation(
		({ storage }, columns: LiveObject<Column>[]) => {
			storage.set("columns", new LiveList(columns));
		},
		[]
	);

	function setColumnsOrder(sortedColumns: Column[]) {
		const newColumns: LiveObject<Column>[] = [];
		sortedColumns.forEach((sortedColumn, newIndex) => {
			const newSortedColumn = { ...sortedColumn };
			newSortedColumn.index = newIndex;
			newColumns.push(new LiveObject(newSortedColumn));
		});
		updateColumn(newColumns);
	}

	if (!columns) return null;
	return (
		<div className="flex gap-4">
			<ReactSortable
				group={"board-column"}
				list={columns}
				className="flex gap-4"
				ghostClass="opacity-40"
				setList={setColumnsOrder}
			>
				{columns?.length > 0 &&
					columns.map((column) => <BoardColumn {...column} key={column.id} />)}
			</ReactSortable>
			<NewColumnForm />
		</div>
	);
};
