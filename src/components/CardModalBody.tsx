"use client";

import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { BoardContext, BoardContextProps } from "@/components";
import {
	type Card,
	useMutation,
	useStorage,
	useThreads,
	useRoom,
	useSelf,
} from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Composer, Thread } from "@liveblocks/react-comments";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faComments, faFileLines } from "@fortawesome/free-regular-svg-icons";
import {
	CancelButton,
	CardDescription,
	DeleteWithConfirmation,
} from "@/components";
import "@liveblocks/react-comments/styles.css";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { Select, SelectItem } from "@nextui-org/select";
import { DateValue, Progress, RangeValue, Slider } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

export const CardModalBody = () => {
	const [dateRange, setDateRange] = React.useState<RangeValue<DateValue>>({
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ weeks: 1 }),
	});
	const [value, setValue] = useState(0);
	const [assignedTo, setAssignedTo] = useState("");
	const [users, setUsers] = useState<string[]>([]);
	const [editMode, setEditMode] = useState(false);
	const { setOpenCard } = useContext<BoardContextProps>(BoardContext);
	const roomInfo = useRoom();
	const me = useSelf((me) => me.info);
	const { id } = roomInfo;
	const router = useRouter();
	const params = useParams();
	const todayDate = today(getLocalTimeZone());
	const inAWeek = todayDate.add({ weeks: 1 });

	const { threads } = useThreads({
		query: {
			metadata: {
				cardId: params.cardId.toString(),
			},
		},
	});

	const card = useStorage(
		(root) => root.cards.find((card) => card.id === params.cardId),
		shallow
	);

	const updateCard = useMutation(({ storage }, cardId, updateData) => {
		const cards = storage.get("cards").map((c) => c.toObject());
		const index = cards.findIndex((card) => card.id === cardId);
		const card = storage.get("cards").get(index);

		for (let updateKey in updateData) {
			card?.set(updateKey as keyof Card, updateData[updateKey]);
		}
	}, []);

	const deleteCard = useMutation(({ storage }, id) => {
		const cards = storage.get("cards");
		const cardIndex = cards.findIndex((c) => c.toObject().id === id);
		cards.delete(cardIndex);
	}, []);

	useEffect(() => {
		if (params.cardId && setOpenCard) {
			setOpenCard(params.cardId.toString());
		}
		async function getUsers() {
			const boardInfo = await liveblocksClient.getRoom(id);
			const usersAccesses = boardInfo.usersAccesses;
			setUsers(Object.keys(usersAccesses));
			// console.log(users);
		}
		getUsers();
		setAssignedTo(card?.assignedTo || "");
		setValue(card?.percentComplete || 0);
		setDateRange({
			start: parseDate(card?.start || todayDate.toString()),
			end: parseDate(card?.end || inAWeek.toString()),
		});
	}, [params]);

	function handleDelete() {
		deleteCard(params.cardId);
		if (!setOpenCard) return;
		setOpenCard(null);
		router.back();
	}

	function handleNameChange(ev: FormEvent) {
		ev.preventDefault();

		const input = (ev.target as HTMLFormElement).querySelector("input");
		if (!input) return;
		const newName = input.value;
		updateCard(params.cardId, {
			name: newName,
			assignedTo,
			percentComplete: value,
			start: formatDateString(
				`${dateRange.start.year}-${dateRange.start.month}-${dateRange.start.day}`
			),
			end: formatDateString(
				`${dateRange.end.year}-${dateRange.end.month}-${dateRange.end.day}`
			),
		});
		setEditMode(false);
	}

	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setAssignedTo(e.target.value);
	};

	function formatDateString(dateString: string) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	return (
		<>
			{!editMode && (
				<div>
					<div className="flex justify-between">
						<h4 className="text-2xl capitalize">{card?.name}</h4>
						<button
							className=" text-gray-300 hover:text-gray-600"
							onClick={() => setEditMode(true)}
						>
							<FontAwesomeIcon
								icon={faEllipsis}
								className="p-3 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-200 ease-in-out shadow-md "
							/>
						</button>
					</div>
					<div className="rounded-md text-gray-500 pl-2 ">
						Assigned to:
						<span className="font-bold text-black">{card?.assignedTo}</span>
					</div>
				</div>
			)}
			{editMode && (
				<div>
					<form action="" onSubmit={handleNameChange}>
						<span className="mt-2">Title of this card:</span>
						<input type="text" defaultValue={card?.name} className="mb-2" />
						<span className="mt-2">Assigned to this card:</span>
						<Select
							label="Select an user"
							className="block mb-2"
							onChange={handleSelectionChange}
							value={card?.assignedTo}
						>
							{users.map((user) => (
								<SelectItem key={user} value={user}>
									{user}
								</SelectItem>
							))}
						</Select>
						<span className="mt-2">Edit date range:</span>
						<DateRangePicker
							isRequired
							aria-label="Date range"
							minValue={today(getLocalTimeZone())}
							className="mb-4"
							onChange={setDateRange as (value: RangeValue<DateValue>) => void}
						/>
						{me?.email === card?.assignedTo && (
							<>
								<span className="mt-2">Percent of completion</span>
								<Slider
									aria-label="Volume"
									size="lg"
									color="success"
									step={1}
									maxValue={100}
									minValue={0}
									value={value}
									onChange={setValue as (value: number | number[]) => void}
									className="max-w-md"
									showTooltip={true}
								/>
							</>
						)}
						<button
							type="submit"
							className="w-full mt-2
				bg-thirdColor text-white p-2 rounded-md hover:bg-primaryColor duration-300 hover:shadow-lg"
						>
							Save
						</button>
					</form>
					<div className="mt-2 h-10">
						<DeleteWithConfirmation onDelete={() => handleDelete()} />
					</div>
					<div className="h-10">
						<CancelButton onClick={() => setEditMode(false)} />
					</div>
				</div>
			)}
			{!editMode && (
				<div>
					<h2 className="flex gap-2 items-center mt-4">
						<FontAwesomeIcon icon={faFileLines} />
						Description
					</h2>
					<CardDescription />

					<DateRangePicker
						label="Date range"
						isReadOnly
						className="w-full mt-4"
						value={dateRange}
					/>

					<Progress
						aria-label="Progress percentage"
						size="md"
						value={value}
						color="success"
						showValueLabel={true}
						className="max-w-md"
					/>
					<h2 className="flex gap-2 items-center mt-4">
						<FontAwesomeIcon icon={faComments} />
						Comments
					</h2>

					<div className="-mx-4">
						{threads &&
							threads.map((thread) => (
								<div key={thread.id}>
									<Thread thread={thread} id={thread.id} />
								</div>
							))}
						{threads?.length === 0 && (
							<div>
								<Composer metadata={{ cardId: params.cardId.toString() }} />
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};
