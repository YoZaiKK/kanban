"use client";

import {
	faArrowRightFromBracket,
	faBars,
	faHouse,
	faPlus,
	faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Tooltip,
} from "@nextui-org/react";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createBoard } from "@/app/actions/boardActions";
import { RoomInfo } from "@liveblocks/node";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Switch,
} from "@nextui-org/react";
import { useState } from "react";

export const MainMenu = ({ loggedIn }: { loggedIn: boolean }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [inputValue, setInputValue] = useState("");
	const router = useRouter();

	async function handleNewBoardSubmit(formData: FormData) {
		if (loggedIn === false) {
			console.log("Not logged in");
			return;
		}
		console.log(formData);
		const boardName = formData.get("name")?.toString() || "";
		const { id } = (await createBoard(boardName as string)) as RoomInfo;
		router.refresh();
		onOpenChange();
		// redirect(`/boards/${id}`);
	}

	return (
		<>
			<Dropdown>
				<DropdownTrigger>
					<button className="">
						<Tooltip content="Menu" placement="top-end">
							<FontAwesomeIcon
								icon={faBars}
								className="p-3 border-1 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md"
							/>
						</Tooltip>
					</button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Static Actions">
					<DropdownItem
						onClick={() => router.push("/")}
						className="flex gap-4 justify-between"
						key="new"
					>
						<FontAwesomeIcon icon={faHouse} className="px-3" />
						All Boards
					</DropdownItem>
					{!loggedIn ? (
						<DropdownItem
							onClick={() => router.push("/")}
							className="flex gap-4 justify-between"
							key="create"
						>
							<FontAwesomeIcon icon={faPlus} className="px-3" />
							Create Board
						</DropdownItem>
					) : (
						<DropdownItem
							onClick={onOpen}
							className="flex gap-4 justify-between"
							key="create"
						>
							<FontAwesomeIcon icon={faPlus} className="px-3" />
							Create Board
						</DropdownItem>
					)}

					<DropdownItem
						onClick={() => router.push("/faqs")}
						className="flex gap-4 justify-between"
						key="profile"
					>
						<FontAwesomeIcon icon={faQuestion} className="px-3" />
						FAQ&apos;s
					</DropdownItem>
					<DropdownItem
						key="delete"
						className="text-danger flex gap-4 justify-between"
						color="danger"
						onClick={() => signOut()}
					>
						<FontAwesomeIcon icon={faArrowRightFromBracket} className="px-3" />
						Logout
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								<h1 className="text-2xl ">Create a new board</h1>
							</ModalHeader>
							<form action={handleNewBoardSubmit} className=" block">
								<ModalBody>
									<input
										type="text"
										name="name"
										placeholder="Name"
										onChange={(e) => setInputValue(e.target.value)}
										className="w-full h-10 p-2 rounded-md border-1 border-gray-300 focus:border-primaryColor focus:shadow-md transition-colors duration-300 ease-in-out mb-4"
										value={inputValue}
									/>
								</ModalBody>

								<ModalFooter>
									<Button
										color="danger"
										variant="light"
										onPress={onClose}
										className="rounded-md"
									>
										Close
									</Button>
									<button
										type="submit"
										className={
											inputValue === ""
												? "bg-gray-300 text-gray-600 rounded-md border-1 flex p-2 h-10 px-3 items-center"
												: "bg-primaryColor text-forthColor border-1 rounded-md hover:bg-defaultBG  hover:text-primaryColor hover:border-primaryColor transition-colors items-center flex p-2 h-10 px-3"
										}
										disabled={inputValue === ""}
									>
										<FontAwesomeIcon icon={faPlus} className="h-4 w-4 p-2" />
										Create
									</button>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
