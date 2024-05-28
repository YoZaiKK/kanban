import { liveblocksClient } from "@/lib/liveblocksClient";

export async function PUT(req: Request) {
  const { id, update } = await req.json();
  liveblocksClient.updateRoom(id, update);
  return Response.json(true)
}