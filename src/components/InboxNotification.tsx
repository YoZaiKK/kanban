"use client";
import { useInboxNotifications } from "@/app/liveblocks.config";
import {
	InboxNotification,
	InboxNotificationList,
} from "@liveblocks/react-comments";

export const InboxNotificationComponent = () => {
	const { inboxNotifications } = useInboxNotifications();
	return (
		<InboxNotificationList>
			{inboxNotifications?.map((inboxNotification) => (
				<>
					<InboxNotification
						key={inboxNotification.id}
						inboxNotification={inboxNotification}
						href={"/boards/" + inboxNotification.roomId}
					/>
				</>
			))}
		</InboxNotificationList>
	);
};
