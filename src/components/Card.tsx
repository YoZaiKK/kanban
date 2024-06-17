"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BoardContext, PresenceAvatars } from "@/components";
import { type Card } from "@/app/liveblocks.config";
import { Progress } from "@nextui-org/react";

export const CardComponent = ({
	id,
	name,
	assignedTo,
	percentComplete,
}: Card) => {
	const params = useParams();
	const router = useRouter();
	const { openCard } = useContext(BoardContext);

	useEffect(() => {
		if (params.cardId && !openCard) {
			const { boardId, cardId } = params;
			router.push(`/boards/${boardId}`);
			router.push(`/boards/${boardId}/cards/${cardId}`);
		}
		if (!params.cardId && openCard) {
			router.push(`/boards/${params.boardId}`);
		}
	}, [params.cardId]);

	return (
		<Link
			href={`/boards/${params.boardId}/cards/${id}`}
			className="relative border block bg-white my-2 py-6 px-4 rounded-md hover:shadow-lg hover:transition-shadow duration-200"
		>
			<span className="block capitalize">{name}</span>
			{/* <span className="block text-sm text-gray-500">Author: {author}</span> */}
			<span className="block text-sm text-gray-500 ">
				Assigned to: {assignedTo}
			</span>
			<Progress
				aria-label="Percentage of completion"
				size="md"
				value={percentComplete}
				color="success"
				showValueLabel={true}
				className="max-w-md mb-7"
			/>
			<div className="absolute pt-3 pr-3 pb-1 bottom-1 right-1">
				<PresenceAvatars presenceKey="cardId" presenceValue={id} />
			</div>
		</Link>
	);
};
