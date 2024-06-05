"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { BoardContext } from "@/components";

type CardProps = {
	id: string;
	name: string;
	// columnId: string;
};

export const Card = ({ id, name }: CardProps) => {
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
			className="border block bg-white my-2 p-4 rounded-md hover:shadow-lg hover:transition-shadow duration-200"
		>
			<span>{name}</span>
		</Link>
	);
};
