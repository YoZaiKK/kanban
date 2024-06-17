import { handler } from "@/app/api/auth/[...nextauth]/route";

export const { auth: middleware } = handler;
