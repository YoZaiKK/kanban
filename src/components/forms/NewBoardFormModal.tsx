"use client";
import { createBoard } from "@/app/actions/boardActions";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export const NewBoardFormModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [inputValue, setInputValue] = useState("");
	async function handleNewBoardSubmit(formData: FormData) {
		console.log(formData);
		const boardName = formData.get("name")?.toString() || "";
		const { id } = (await createBoard(boardName as string)) as RoomInfo;
		redirect(`/boards/${id}`);
	}

	return (
		<>
			<Button
				onPress={onOpen}
				className="px-4 py-2 text-white  rounded-md inline-flex gap-2 w-full bg-customTeal shadow-md  hover:shadow-lg hover:bg-customTealDark transition-colors duration-200 ease-in-out items-center justify-start"
			>
				<FontAwesomeIcon className="h-4 ml-3" icon={faPlus} />
				Create new board
			</Button>
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
									<Switch
										defaultSelected
										size="sm"
										color="success"
										className="mb-4"
									>
										Private
									</Switch>
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
