"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { BoardContext, PresenceAvatars } from "@/components";
import { type Card } from "@/app/liveblocks.config";

export const CardComponent = ({ id, name, author }: Card) => {
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
			className="relative border block bg-white my-2 py-8 px-4 rounded-md hover:shadow-lg hover:transition-shadow duration-200"
		>
			<span className="block">{name}</span>
			<span className="block text-sm text-gray-500">by {author}</span>
			<div className="absolute bottom-1 right-1">
				<PresenceAvatars presenceKey="cardId" presenceValue={id} />
			</div>
		</Link>
	);
};
