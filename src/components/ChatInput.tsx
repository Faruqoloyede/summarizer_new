import {
  type ChangeEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

interface Props {
  onSend: (
    text: string,
    file: File | null
  ) => void;
}

export default function ChatInput({
  onSend,
}: Props) {
  const [text, setText] = useState("");
  const [file, setFile] =
    useState<File | null>(null);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const fileInput =
    useRef<HTMLInputElement>(null);

  const resize = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height =
      textarea.scrollHeight + "px";
  };

  const send = () => {
    if (!text.trim() && !file) return;

    onSend(text, file);

    setText("");
    setFile(null);

    if (textareaRef.current)
      textareaRef.current.style.height =
        "24px";
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      send();
    }
  };

  const handleFile = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="rounded-3xl border border-[#44E5E7] bg-[#ECFCFD]  p-3">

      {file && (
        <div className="mb-3 flex items-center justify-between rounded-xl bg-neutral-800 p-3 text-white">

          <span className="truncate">
            📎 {file.name}
          </span>

          <button
            onClick={() =>
              setFile(null)
            }
            className="text-red-400"
          >
            ✕
          </button>
        </div>
      )}

      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        placeholder="Message ChatGPT..."
        onChange={(e) => {
          setText(e.target.value);
          resize();
        }}
        onKeyDown={handleKeyDown}
        className="max-h-60 w-full resize-none overflow-y-auto bg-transparent text-black placeholder:text-neutral-400 outline-none"
      />

      <div className="mt-3 flex items-center justify-between">

        <div>

          <input
            ref={fileInput}
            type="file"
            hidden
            onChange={handleFile}
          />

          <button
            onClick={() =>
              fileInput.current?.click()
            }
            className="rounded-full p-2 text-white transition hover:bg-neutral-700"
          >
            📎
          </button>

        </div>

        <button
          onClick={send}
          disabled={!text.trim() && !file}
          className="rounded-full bg-white p-3 text-black transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          ↑
        </button>
      </div>
    </div>
  );
}