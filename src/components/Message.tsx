import type { MessageType } from "./Chat";

interface Props {
  message: MessageType;
}

export default function Message({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-5 py-4 ${
          isUser
            ? "bg-[#2f2f2f] text-white"
            : "bg-transparent text-black"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
}