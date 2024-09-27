import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import useChatStore from "../../assets/store/chat.store";

// Stream text function (simulates streaming)
function useStreamText(text: string) {
  const [streamedText, setStreamedText] = useState("");

  useEffect(() => {
    let i = 0;
    const streamInterval = setInterval(() => {
      if (i < text.length) {
        setStreamedText((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(streamInterval);
      }
    }, 50); // Adjust speed here

    return () => clearInterval(streamInterval);
  }, [text]);

  return streamedText;
}

export default function ChatHistory({ chatHistory }: { chatHistory: any[] }) {
  const chatref = useRef<any>(null);
  const { chats } = useChatStore();

  console.log(chatHistory);

  const latestBotMessage = chats
    .slice() // Create a shallow copy of chats to avoid mutation
    .reverse() // Reverse the array to start from the last message
    .find((chat) => chat.type === "bot"); // Find the first 'bot' message

  // Stream the last bot message found
  const streamedMessage = useStreamText(latestBotMessage?.message || "");

  useEffect(() => {
    chatref.current?.lastElementChild?.scrollIntoView();
  }, [chats]);

  return (
    <div ref={chatref} className="flex flex-col gap-5 text-sm px-2">
      {chats.map((chat: any, index: any) => (
        <div key={index}>
          <div className="flex gap-2">
            {chat.type === "user" ? (
              <span className="mr-2 font-bold text-gray-600">
                {/* User Icon */}
              </span>
            ) : (
              <span className="mr-2 font-bold text-gray-600">
                {/* Bot Icon */}
              </span>
            )}
            <div>
              <div
                className={`flex flex-col justify-start py-2 px-4 rounded-lg ${
                  chat.type === "user"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <div className="flex items-start">
                  <div className="w-full text-xs">
                    {/* Stream only the latest bot message */}
                    {chat.type === "bot" &&
                    chat.message === latestBotMessage?.message ? (
                      <ReactMarkdown>{streamedMessage}</ReactMarkdown>
                    ) : (
                      <ReactMarkdown>{chat.message}</ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                {/* Add additional logic for icons here */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
