"use client";

import {
	faArrowRightFromBracket,
	faBars,
	faGear,
	faHashtag,
	faHome,
	faHouse,
	faPlus,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Tooltip,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

export const MainMenu = () => {
	return (
		<Dropdown>
			<DropdownTrigger>
				<button className="text-gray-300 hover:text-gray-600">
					<Tooltip content="Menu" placement="top-end">
						<FontAwesomeIcon
							icon={faBars}
							className="p-3 border-1 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md"
						/>
					</Tooltip>
				</button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Static Actions">
				<DropdownItem className="flex gap-4 justify-between" key="new">
					<FontAwesomeIcon icon={faHouse} className="px-3" />
					All The Projects
				</DropdownItem>
				<DropdownItem className="flex gap-4 justify-between" key="create">
					<FontAwesomeIcon icon={faPlus} className="px-3" />
					Create Project
				</DropdownItem>
				<DropdownItem className="flex gap-4 justify-between" key="profile">
					<FontAwesomeIcon icon={faUser} className="px-3" />
					My Profile
				</DropdownItem>
				<DropdownItem className="flex gap-4 justify-between" key="settings">
					<FontAwesomeIcon icon={faGear} className="px-3" />
					Settings
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
	);
};