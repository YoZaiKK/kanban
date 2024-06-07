import { LiveList, LiveObject, createClient } from "@liveblocks/client"
import { createRoomContext } from "@liveblocks/react"


const client = createClient({
  authEndpoint: '/api/liveblocks-auth',
  throttle: 100,
  resolveUsers: async ({ userIds }) => {
    // const params = new URLSearchParams(userIds.map((id) => ['id', id]));
    const response = await fetch('/api/users?ids=' + userIds.join(','));
    return await response.json();
  },

  resolveMentionSuggestions: async ({ text }) => {
    const response = await fetch(`/api/users?search=${text}`);
    const users = await response.json();
    return users.map((u: UserMeta) => (u.id));

  }
})


export type Presence = {
  boardId?: null | string;
  cardId?: null | string;
}

export type Column = {
  name: string;
  id: string;
  index: number;
}

export type Card = {
  name: string;
  id: string;
  index: number;
  columnId: string;
}

type Storage = {
  columns: LiveList<LiveObject<Column>>;
  cards: LiveList<LiveObject<Card>>;
}

type UserMeta = {
  id: string,
  info: {
    name: string;
    email: string;
    image: string;
  }
}

type RoomEvent = {
}

type ThreadMetadata = {
  cardId: string;
}

export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useOthers,
  useUpdateMyPresence,
  useThreads,
} = createRoomContext<
  Presence,
  Storage,
  UserMeta,
  RoomEvent,
  ThreadMetadata
>(client)