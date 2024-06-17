"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BoardContext, PresenceAvatars } from "@/components";
import { type Card } from "@/app/liveblocks.config";
import { DateRangePicker } from "@nextui-org/date-picker";
import {
	DateValue,
	Progress,
	RangeCalendar,
	RangeValue,
} from "@nextui-org/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

export const CardComponent = ({
	id,
	name,
	assignedTo,
	percentComplete,
	start,
	end,
}: // start,
// end,
Card) => {
	console.log({ start, end });
	const [dateRange, setDateRange] = useState<RangeValue<DateValue>>({
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ weeks: 1 }),
	});
	// setDateRange({
	// 	start: parseDate(start || todayDate.toString()),
	// 	end: parseDate(end || inAWeek.toString()),
	// });
	console.log({ dateRange });
	const params = useParams();
	const router = useRouter();
	const { openCard } = useContext(BoardContext);

	const todayDate = today(getLocalTimeZone());
	const inAWeek = today(getLocalTimeZone()).add({ weeks: 1 });

	// function formatDateString(dateString: string) {
	// 	const date = new Date(dateString);
	// 	const year = date.getFullYear();
	// 	const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
	// 	const day = String(date.getDate()).padStart(2, "0");
	// 	return `${year}-${month}-${day}`;
	// }

	useEffect(() => {
		if (params.cardId && !openCard) {
			const { boardId, cardId } = params;
			router.push(`/boards/${boardId}`);
			router.push(`/boards/${boardId}/cards/${cardId}`);
		}
		if (!params.cardId && openCard) {
			router.push(`/boards/${params.boardId}`);
		}
		setDateRange({
			start: parseDate(start || todayDate.toString()),
			end: parseDate(end || inAWeek.toString()),
		});
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
			<DateRangePicker
				label="Date range"
				isReadOnly
				className="w-full mt-4"
				value={dateRange}
			/>
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
