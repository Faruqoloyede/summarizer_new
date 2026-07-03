import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { FiFileText, FiPaperclip, FiSend, FiUploadCloud, FiX } from "react-icons/fi";
import { ClipLoader } from "react-spinners";

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const UploadArea = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incomingFiles: FileList | File[]) => {
    const nextFiles = Array.from(incomingFiles);

    setFiles((currentFiles) => {
      const existingFileKeys = new Set(
        currentFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`)
      );
      const uniqueFiles = nextFiles.filter(
        (file) => !existingFileKeys.has(`${file.name}-${file.size}-${file.lastModified}`)
      );

      return [...currentFiles, ...uniqueFiles];
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles((currentFiles) => currentFiles.filter((file) => file !== fileToRemove));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim() && files.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setMessage("");
      setFiles([]);
      setIsSubmitting(false);
    }, 1800);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-4xl flex-col gap-3">
      <label
        htmlFor="document-upload"
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-5 py-6 text-center transition ${
          isDragging
            ? "border-[#0E2E2E] bg-white shadow-md"
            : "border-[#44E5E7]/60 bg-white/75 hover:border-[#0E2E2E]/50 hover:bg-white"
        }`}
      >
        <input
          ref={fileInputRef}
          id="document-upload"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="sr-only"
        />
        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-[#44E5E7]/20 text-[#0E2E2E]">
          <FiUploadCloud className="text-2xl" />
        </span>
        <span className="text-sm font-semibold text-[#0E2E2E]">Drop documents here or choose files</span>
        <span className="mt-1 text-xs text-[#0E2E2E]/60">PDF, DOC, DOCX, and TXT files are supported</span>
      </label>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 rounded-lg border border-[#44E5E7]/30 bg-white p-3">
          {files.map((file) => (
            <div
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="flex max-w-full items-center gap-2 rounded-lg border border-[#44E5E7]/30 bg-[#ECFCFD] px-3 py-2 text-sm text-[#0E2E2E]"
            >
              <FiFileText className="shrink-0 text-[#0E2E2E]/70" />
              <span className="min-w-0 truncate font-medium">{file.name}</span>
              <span className="shrink-0 text-xs text-[#0E2E2E]/55">{formatFileSize(file.size)}</span>
              <button
                type="button"
                onClick={() => removeFile(file)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded-md p-1 text-[#0E2E2E]/55 hover:bg-[#44E5E7]/20 hover:text-[#0E2E2E]"
              >
                <FiX />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg border border-[#44E5E7]/40 bg-white p-3 shadow-sm focus-within:border-[#0E2E2E]/50 focus-within:ring-2 focus-within:ring-[#44E5E7]/25">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          placeholder="Ask Summerizer to summarize, explain, or extract key points..."
          className="max-h-40 min-h-20 w-full resize-none bg-transparent text-sm leading-6 text-[#0E2E2E] outline-none placeholder:text-[#0E2E2E]/45"
        />

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#44E5E7]/20 pt-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0E2E2E]/70 transition hover:bg-[#44E5E7]/15 hover:text-[#0E2E2E]"
            aria-label="Attach files"
          >
            <FiPaperclip className="text-lg" />
          </button>

          <button
            type="submit"
            disabled={isSubmitting || (!message.trim() && files.length === 0)}
            className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-[#0E2E2E] px-3 text-white transition hover:bg-[#164545] disabled:cursor-not-allowed disabled:bg-[#0E2E2E]/35"
            aria-label="Send upload request"
          >
            {isSubmitting ? <ClipLoader color="#ECFCFD" size={18} /> : <FiSend className="text-lg" />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadArea;