"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InboxNotificationComponent as InboxNotification } from "./InboxNotification";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Badge,
} from "@nextui-org/react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useUnreadInboxNotificationsCount } from "@/app/liveblocks.config";

export const NotificationsBox = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { count } = useUnreadInboxNotificationsCount();

	return (
		<div>
			<Badge content={count} color="default">
				<button onClick={onOpen} className=" text-gray-300 hover:text-gray-600">
					<FontAwesomeIcon
						icon={faBell}
						className="p-3 border-1 rounded-md bg-defaultBG text-black hover:shadow-inner  transition-colors duration-300 ease-in-out shadow-md"
					/>
				</button>
			</Badge>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Notifications
							</ModalHeader>
							<ModalBody>
								<InboxNotification />
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};
