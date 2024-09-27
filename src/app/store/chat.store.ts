import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Chat = [];
interface ChatState {
  chats: Chat;
  storeChat: (chats: Chat) => void;
  clearChats: () => void;
}

const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set) => ({
        chats: [],
        storeChat: (chats: Chat) => set(() => ({ chats })),
        clearChats: () =>
          set(() => ({
            chats: [],
          })),
      }),
      { name: "useChatStore" }
    )
  )
);

export default useChatStore;
