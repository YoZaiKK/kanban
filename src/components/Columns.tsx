"use client";
import { type Column, useStorage, useMutation } from "@/app/liveblocks.config";
import { Column as BoardColumn, NewColumnForm } from "@/components/";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";
import { ReactSortable } from "react-sortablejs";
import { GenerateTemplate } from "./GenerateTemplate";

export const Columns = ({ filterActive }: { filterActive: boolean }) => {
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

	if (!columns) return <div>Loading...</div>;
	return (
		<div className="flex gap-4 px-12 overflow-x-scroll max-h-100">
			<ReactSortable
				group={"board-column"}
				list={columns}
				className="flex gap-4"
				ghostClass="opacity-40"
				setList={setColumnsOrder}
			>
				{columns?.length > 0 &&
					columns.map((column) => (
						<BoardColumn
							// {...column}
							column={column}
							filterActive={filterActive}
							key={column.id}
						/>
					))}
			</ReactSortable>
			{!columns.length && <GenerateTemplate />}
			<NewColumnForm />
		</div>
	);
};
