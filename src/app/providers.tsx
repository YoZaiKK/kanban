"use client";

import { NextUIProvider } from "@nextui-org/react";
import { LiveblocksProvider } from "./liveblocks.config";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<LiveblocksProvider>{children}</LiveblocksProvider>
		</NextUIProvider>
	);
}
