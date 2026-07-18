"use client";

import { useState } from "react";

interface CopyBoxProps {
  text: string;
}

export default function CopyBox({ text }: CopyBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err);
    }
  };

  return (
    <div className="my-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 sm:p-4">
      <div className="mb-3 flex justify-end">
        <button
          onClick={handleCopy}
          className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
        >
          {copied ? "¡Copiado!" : "Copiar"}
        </button>
      </div>

      <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap break-words text-xs font-mono text-slate-200 sm:text-sm">
        {text}
      </pre>
    </div>
  );
}