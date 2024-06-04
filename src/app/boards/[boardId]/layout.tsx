"use client";
import { RoomProvider } from "@/app/liveblocks.config";
import { BoardContextProvider } from "@/components";
import { LiveList } from "@liveblocks/client";
import { useParams } from "next/navigation";
import React from "react";

type PageProps = {
	children: React.ReactNode;
	modal: React.ReactNode;
};

export default function BoardLayout({ children, modal }: PageProps) {
	const params = useParams();
	return (
		<BoardContextProvider>
			<RoomProvider
				id={params.boardId.toString()}
				initialPresence={{}}
				initialStorage={{
					cards: new LiveList(),
					columns: new LiveList(),
				}}
			>
				{children}
				{modal}
			</RoomProvider>
		</BoardContextProvider>
	);
}
