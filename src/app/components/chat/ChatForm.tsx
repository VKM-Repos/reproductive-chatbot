import { ChangeEvent, useEffect, useRef } from "react";
import { Button } from "../ui/button";

export default function ChatForm({
  handleInputChange,
  handleSubmit,
  input,
  isStreaming,
  startChat,
}: {
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
  input: string;
  isStreaming: boolean;
  startChat: boolean;
}) {
  const myFormRef = useRef<HTMLFormElement>(null);
  const onEnterPress = (e: React.KeyboardEvent) => {
    if (e.key == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit();
    }
  };
  useEffect(() => {
    if (startChat) {
      myFormRef.current?.requestSubmit();
    }
  }, [startChat]);
  return (
    <div className="absolute z-[2000] flex items-end justify-center bottom-4 rounded-lg w-full mx-auto pr-4">
      <form
        ref={myFormRef}
        className="border rounded-lg w-full h-full flex justify-between px-4 py-1 bg-white"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-start w-full h-full">
          <textarea
            name=""
            id=""
            placeholder="Ask me Anything about Reproductive Health & Nutrition"
            className="h-full focus:outline-none no-scrollbar text-sm"
            rows={3}
            onChange={handleInputChange}
            onKeyDown={onEnterPress}
            value={input}
            disabled={isStreaming}
          ></textarea>
        </div>
        <Button type="submit" disabled={isStreaming || !input}>
          {isStreaming ? (
            <div role="status pr-2">
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <svg
              width="34"
              height="69"
              viewBox="0 0 34 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.7535 34.5711C29.872 31.3725 14.2244 23.8507 12.7506 25.3436C11.0793 27.0366 15.0751 32.0674 15.9751 33.6693C16.5164 34.6326 16.5014 35.0505 15.886 36.0128C13.0991 40.3709 11.7165 42.5423 12.5758 43.4809C13.9453 44.9772 29.6379 37.6928 29.7535 34.5711Z"
                stroke="#141B34"
                strokeWidth="1.5"
              />
              <path
                d="M16.322 34.5H21.2717"
                stroke="#141B34"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </Button>
      </form>
    </div>
  );
}
