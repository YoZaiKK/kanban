"use client";

import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";

type Props = {
	onDelete: () => void;
};

export const DeleteWithConfirmation = ({ onDelete }: Props) => {
	const [wannaDelete, setWannaDelete] = useState(false);

	if (wannaDelete) {
		return (
			<div>
				<h4 className="mb-1 text-center">Are you sure?</h4>
				<div className="grid grid-cols-2 gap-2 ">
					<div className="">
						<button
							className="btn block grow w-full with-icon"
							onClick={() => setWannaDelete(false)}
						>
							<FontAwesomeIcon icon={faArrowLeft} />
							No
						</button>
					</div>
					<div>
						<button
							onClick={onDelete}
							className="w-full btn red with-icon block"
						>
							Yes
						</button>
					</div>
				</div>
			</div>
		);
	}
	return (
		<Tooltip content="Delete this board" placement="top">
			<Button
				onClick={() => setWannaDelete(true)}
				className="bg-red-500 text-white w-full h-full  justify-center items-center flex rounded-md hover:bg-red-800 duration-300 hover:shadow-lg"
			>
				<FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
			</Button>
		</Tooltip>
	);
};
