
import { User, type UserType } from "@/models/User";
import mongoose, { mongo } from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    return new Response("MONGODB_URI is not set", { status: 401 })
  }

  if (!url.searchParams.has("id")) {
    return Response.json([])
  }

  const emails = url.searchParams.getAll("id")
  await mongoose.connect(connectionString)
  const users = await User.find({ email: emails })
  return Response.json(users.map((u: UserType) => ({
    id: u.email,
    name: u.name,
    image: u.image
  })))

}