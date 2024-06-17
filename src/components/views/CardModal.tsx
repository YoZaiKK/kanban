"use client";

import { useParams, useRouter } from "next/navigation";
import "@liveblocks/react-comments/styles.css";
import { CardModalBody } from "../CardModalBody";
import { useEffect } from "react";
import { useUpdateMyPresence } from "@/app/liveblocks.config";

export const CardModal = () => {
	const router = useRouter();
	const params = useParams();
	const updateMyPresence = useUpdateMyPresence();

	function handleBackdropClick() {
		router.back();
	}

	useEffect(() => {
		if (params.cardId) {
			updateMyPresence({ cardId: params.cardId.toString() });
		}
		return () => {
			updateMyPresence({ cardId: null });
		};
	}, [params]);

	return (
		<>
			<div
				className="fixed inset-0 bg-black/70 z-10"
				onClick={handleBackdropClick}
			></div>

			<div
				className="absolute inset-0 z-20 w-full"
				onClick={handleBackdropClick}
			>
				<div className="">
					<div className="bg-white px-4 p-2 my-8 max-w-sm mx-auto rounded-md ">
						<div onClick={(ev) => ev.stopPropagation()}>
							<CardModalBody />
						</div>
					</div>
					<div>&nbsp;</div>
				</div>
			</div>
		</>
	);
};
