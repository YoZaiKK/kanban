"use client";
import { Presence, useOthers } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";

type Props = {
	presenceKey: keyof Presence;
	presenceValue: string;
};

export const PresenceAvatars = ({ presenceKey, presenceValue }: Props) => {
	const others = useOthers((users) => {
		return users.filter((user) => user.presence[presenceKey] === presenceValue);
	}, shallow);

	return (
		<div className="flex gap-1">
			{others.map((user) => (
				<img
					className="size-8 rounded-full"
					key={user.id}
					src={user.info.image}
					alt={user.info.name}
				/>
			))}
		</div>
	);
};
