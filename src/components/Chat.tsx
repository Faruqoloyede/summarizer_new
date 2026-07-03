import { useEffect, useState } from "react";
import ChatInput from "../components/ChatInput";
import Message from "../components/Message";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export interface MessageType {
  id: number;
  role: "user" | "assistant";
  content: string;
}

type UserProfile = {
  name: string;
  uid: string;
};

export default function Chat() {
  const [userData, setUserData] = useState<UserProfile>();
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData({
            uid: currentUser.uid,
            ...(docSnap.data() as Omit<UserProfile, "uid">),
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const username = userData?.name || "User";

  const handleSend = (text: string, file: File | null) => {
    if (!text.trim() && !file) return;

    const userMessage: MessageType = {
      id: Date.now(),
      role: "user",
      content: file ? `${text}\n📎 ${file.name}` : text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: "This is where your AI response will appear.",
      },
    ]);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-10">
        <div className="mx-auto flex h-full max-w-3xl flex-col">
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white">
                  Hey {username} 👋
                </h1>

                <p className="mt-3 text-lg text-gray-400">
                  What do you want to summarize today?
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 pb-6">
              {messages.map((msg) => (
                <Message key={msg.id} message={msg} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 px-4 pb-6">
        <div className="mx-auto max-w-3xl">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}