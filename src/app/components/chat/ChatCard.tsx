"use client";
import "dotenv/config";
import { motion } from "framer-motion";
import SparkIcon from "./SparkIcon";
import { useEffect, useRef, useState } from "react";
import useChatStream, {
  UseChatStreamChatMessage,
} from "@magicul/react-chat-stream";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import useChatStore from "@/app/store/chat.store";
import ChatForm from "./ChatForm";

export default function ChatCard({
  handleShowChat,
}: {
  handleShowChat: () => void;
}) {
  // const { storeChat, chats, clearChats } = useChatStore();
  const [startChat, setStartChat] = useState(false);

  const [initialQuestions] = useState([
    "Write me a post about child abuse",
    "Show me quick and easy lunch recipes",
    "Can you provide the most recent child care news updates?",
    "What are the major health or medical news updates for this week?",
  ]);
  // clearChats();
  const chatref = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isStreaming,
  } = useChatStream({
    options: {
      url: `${location.origin}/chat`,
      method: "GET",
    },
    method: {
      type: "query",
      key: "prompt",
    },
    handlers: {
      onMessageAdded: function () {
        console.log("");
      },
    },
  });

  useEffect(() => {
    chatref.current?.lastElementChild?.scrollIntoView();
  }, [messages]);
  const handleStartChat = async (question: string) => {
    setInput(question);
    setStartChat(true);
    // setTimeout(() => {
    //   handleSubmit();
    // });
  };
  const handleSetShowChat = () => {
    handleShowChat();
  };

  const copyTopClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const editUserInput = (text: string) => {
    setInput(text);
  };

  console.log(location.origin);

  return (
    <motion.div
      className="fixed top-0 h-screen -right-5 w-[42%] bg-white z-[1000]"
      initial={{ x: 0 }}
      animate={{ x: -20 }}
    >
      <div className="fixed top-0 right-0  py-6 px-2 shadow-2xl w-full bg-white  h-full">
        <div className="flex justify-end pb-4 px-5">
          <button onClick={handleSetShowChat}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.001 4.99988L5.00098 18.9999M5.00098 4.99988L19.001 18.9999"
                stroke="#141B34"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {!startChat && (
          <div className="flex flex-col items-center space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">Hello</h2>
            <h2 className="font-semibold text-lg tracking-tight">
              How can I help you today?
            </h2>
          </div>
        )}
        {!startChat && (
          <div className="text-[12px] flex justify-center gap-1 flex-wrap">
            {initialQuestions?.map((question) => (
              <button
                onClick={() => {
                  handleStartChat(question);
                }}
                data-target={question}
                className="flex items-center gap-2 border w-fit rounded-lg px-3 py-1 cursor-pointer hover:bg-slate-100"
                key={question}
                type="button"
              >
                <SparkIcon />
                {question}
              </button>
            ))}
          </div>
        )}

        <div
          ref={chatref}
          className="flex flex-col object-bottom gap-5 text-sm px-2  h-[80%] max-h-[80%] overflow-y-scroll no-scrollbar rounded-lg"
        >
          {messages?.map((message: UseChatStreamChatMessage) => (
            <div key={message.id}>
              <div className="flex gap-2">
                {message.role == "user" ? (
                  <span className="mr-2 font-bold text-gray-600">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        rx="16"
                        fill="url(#paint0_linear_2662_339)"
                      />
                      <path
                        d="M10.5776 19.4816C9.1628 20.324 5.45336 22.0441 7.71266 24.1966C8.81631 25.248 10.0455 26 11.5909 26H20.4091C21.9545 26 23.1837 25.248 24.2873 24.1966C26.5466 22.0441 22.8372 20.324 21.4224 19.4816C18.1048 17.5061 13.8952 17.5061 10.5776 19.4816Z"
                        fill="white"
                      />
                      <path
                        d="M20.5 10.5C20.5 12.9853 18.4853 15 16 15C13.5147 15 11.5 12.9853 11.5 10.5C11.5 8.01472 13.5147 6 16 6C18.4853 6 20.5 8.01472 20.5 10.5Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2662_339"
                          x1="16"
                          y1="0"
                          x2="16"
                          y2="32"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#3D6CF8" />
                          <stop offset="1" stopColor="#08194A" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                ) : (
                  <span className="mr-2 font-bold text-gray-600">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.25"
                        y="0.25"
                        width="31.5"
                        height="31.5"
                        rx="15.75"
                        fill="white"
                      />
                      <rect
                        x="0.25"
                        y="0.25"
                        width="31.5"
                        height="31.5"
                        rx="15.75"
                        stroke="url(#paint0_linear_2659_144)"
                        strokeWidth="0.5"
                      />
                      <g clipPath="url(#clip0_2659_144)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.3188 22.0616C17.2563 22.5283 18.3375 22.7956 19.4896 22.7956C19.675 22.7956 19.8604 22.7883 20.0438 22.7683C20.6021 22.7304 21.1604 22.8802 21.6271 23.1946L23.5229 24.4706C23.6542 24.5591 23.825 24.5654 23.9625 24.4869C24.03 24.4484 24.0853 24.3917 24.1221 24.3233C24.159 24.2549 24.1758 24.1775 24.1708 24.1L23.9958 21.1831C25.2771 20.0891 26 18.5777 26 16.9979C26 14.5302 24.2625 12.4089 21.8 11.5758C20.4375 9.14102 17.6104 7.45831 14.3333 7.45831C9.72083 7.45831 6 10.7925 6 14.8658C6 16.9021 6.94167 18.8485 8.60625 20.2483L8.375 24.1C8.36667 24.2583 8.44792 24.4081 8.58542 24.4869C8.72292 24.5654 8.89375 24.5591 9.025 24.4706L11.3854 22.8816C12.0699 22.4209 12.8866 22.1971 13.7104 22.2446C13.9208 22.2662 14.1271 22.2731 14.3333 22.2731C15.0167 22.2731 15.6813 22.1998 16.3188 22.0616ZM22.2979 12.6837C22.542 13.3853 22.6667 14.1229 22.6667 14.8658C22.6667 17.9133 20.5833 20.5473 17.6021 21.6806C18.1938 21.8631 18.8292 21.9623 19.4896 21.9623C19.6458 21.9623 19.8021 21.9566 19.9563 21.9396C19.9625 21.9389 19.9667 21.9383 19.9729 21.9381C20.7229 21.8846 21.4688 22.0835 22.0917 22.5033L23.2896 23.3087L23.1521 21.0212C23.1438 20.8858 23.2021 20.7548 23.3083 20.6702C24.4875 19.7323 25.1667 18.3994 25.1667 16.9979C25.1667 15.1448 24.0042 13.5364 22.2979 12.6837ZM12.0479 15.5833L12.6104 17.1039L14.1313 17.6666L12.6104 18.2294L12.0479 19.75L11.4854 18.2294L9.96458 17.6666L11.4854 17.1039L12.0479 15.5833ZM15.7917 10.1666L16.8604 13.0558L19.75 14.125L16.8604 15.1941L15.7917 18.0833L14.7229 15.1941L11.8333 14.125L14.7229 13.0558L15.7917 10.1666ZM12.4583 11.2083V10.7916C12.4583 10.5616 12.2708 10.375 12.0417 10.375C11.8125 10.375 11.625 10.5616 11.625 10.7916V11.2083H11.2083C10.9792 11.2083 10.7917 11.395 10.7917 11.625C10.7917 11.855 10.9792 12.0416 11.2083 12.0416H11.625V12.4583C11.625 12.6883 11.8125 12.875 12.0417 12.875C12.2708 12.875 12.4583 12.6883 12.4583 12.4583V12.0416H12.875C13.1042 12.0416 13.2917 11.855 13.2917 11.625C13.2917 11.395 13.1042 11.2083 12.875 11.2083H12.4583Z"
                          fill="url(#paint1_linear_2659_144)"
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_2659_144"
                          x1="16"
                          y1="0"
                          x2="16"
                          y2="32"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#3D6CF8" />
                          <stop offset="1" stopColor="#08194A" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_2659_144"
                          x1="16"
                          y1="7.45831"
                          x2="16"
                          y2="24.5417"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#B09FFF" />
                          <stop offset="1" stopColor="#0B1F86" />
                        </linearGradient>
                        <clipPath id="clip0_2659_144">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(6 6)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                )}
                <div>
                  <div
                    className={`flex flex-col justify-start py-2 px-4 rounded-lg ${
                      message.role === "user"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-full text-xs ${
                          message.content ==
                          "Something went wrong fetching AI response."
                            ? "text-red-600 font-semibold"
                            : ""
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    {message.role == "user" ? (
                      <div className="flex items-center gap-2">
                        <div>
                          <Popover>
                            <PopoverTrigger>
                              <svg
                                className="cursor-pointer"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => editUserInput(message.content)}
                              >
                                <path
                                  d="M14.6781 6.98536L15.8462 5.81723C16.4913 5.17209 17.5373 5.17209 18.1825 5.81723C18.8276 6.46237 18.8276 7.50836 18.1825 8.1535L17.0143 9.32163M14.6781 6.98536L7.81653 13.847C6.94545 14.718 6.50989 15.1535 6.21332 15.6843C5.91673 16.215 5.61834 17.4683 5.33301 18.6667C6.53142 18.3814 7.78467 18.083 8.31542 17.7864C8.84617 17.4898 9.28171 17.0543 10.1528 16.1832L17.0143 9.32163M14.6781 6.98536L17.0143 9.32163"
                                  stroke="#141B34"
                                  strokeOpacity="0.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.167 18.6666H16.167"
                                  stroke="#141B34"
                                  strokeOpacity="0.6"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </PopoverTrigger>
                            <PopoverContent side="top" className="z-[3000]">
                              <p className="text-xs w-fit text-green-600">
                                Edit
                              </p>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Popover>
                            <PopoverTrigger>
                              <svg
                                className="cursor-pointer "
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() =>
                                  copyTopClipBoard(message.content)
                                }
                                id={message.id}
                              >
                                <path
                                  d="M16.1859 4.52794L15.3904 4.31599C13.1405 3.71651 12.0155 3.41678 11.1293 3.92558C10.243 4.43438 9.94153 5.55302 9.33866 7.7903L8.48606 10.9543C7.88317 13.1915 7.58174 14.3102 8.09342 15.1915C8.60511 16.0728 9.7301 16.3725 11.9801 16.972L12.7756 17.184C15.0255 17.7834 16.1505 18.0831 17.0368 17.5744C17.923 17.0655 18.2245 15.9469 18.8273 13.7096L19.6799 10.5456C20.2828 8.30833 20.5843 7.18969 20.0726 6.30843C19.5609 5.42716 18.4359 5.12742 16.1859 4.52794Z"
                                  stroke="#141B34"
                                  strokeOpacity="0.6"
                                />
                                <path
                                  d="M12.0003 19.4553L11.2067 19.6714C8.96202 20.2826 7.83968 20.5883 6.95549 20.0694C6.0713 19.5507 5.77057 18.4101 5.1691 16.1289L4.31851 12.9029C3.71704 10.6217 3.41631 9.48112 3.9268 8.58256C4.36839 7.80529 5.33366 7.83359 6.58366 7.83349"
                                  stroke="#141B34"
                                  strokeOpacity="0.6"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </PopoverTrigger>
                            <PopoverContent side="top" className="z-[3000]">
                              <p className="text-xs w-fit text-green-600">
                                copied
                              </p>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    ) : !isStreaming ? (
                      <div className="flex items-center gap-1 mb-5">
                        <Popover>
                          <PopoverTrigger>
                            <svg
                              className="cursor-pointer "
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              onClick={() => copyTopClipBoard(message.content)}
                              id={message.id}
                            >
                              <path
                                d="M16.1859 4.52794L15.3904 4.31599C13.1405 3.71651 12.0155 3.41678 11.1293 3.92558C10.243 4.43438 9.94153 5.55302 9.33866 7.7903L8.48606 10.9543C7.88317 13.1915 7.58174 14.3102 8.09342 15.1915C8.60511 16.0728 9.7301 16.3725 11.9801 16.972L12.7756 17.184C15.0255 17.7834 16.1505 18.0831 17.0368 17.5744C17.923 17.0655 18.2245 15.9469 18.8273 13.7096L19.6799 10.5456C20.2828 8.30833 20.5843 7.18969 20.0726 6.30843C19.5609 5.42716 18.4359 5.12742 16.1859 4.52794Z"
                                stroke="#141B34"
                                strokeOpacity="0.6"
                              />
                              <path
                                d="M12.0003 19.4553L11.2067 19.6714C8.96202 20.2826 7.83968 20.5883 6.95549 20.0694C6.0713 19.5507 5.77057 18.4101 5.1691 16.1289L4.31851 12.9029C3.71704 10.6217 3.41631 9.48112 3.9268 8.58256C4.36839 7.80529 5.33366 7.83359 6.58366 7.83349"
                                stroke="#141B34"
                                strokeOpacity="0.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </PopoverTrigger>
                          <PopoverContent side="top" className="z-[3000]">
                            <p className="text-xs w-fit text-green-600">
                              copied
                            </p>
                          </PopoverContent>
                        </Popover>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ChatForm
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
          isStreaming={isStreaming}
          startChat={startChat}
        />
      </div>
    </motion.div>
  );
}
