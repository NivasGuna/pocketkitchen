import { MessageCircle } from "lucide-react";
import data from "./floating-whatsapp.json";

export function FloatingWhatsApp() {
  return (
    <a
      href={data.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={data.label}
      className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-40 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-[#25d366]/25 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-[#25d366]/30 active:scale-95 sm:right-6 sm:bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] sm:size-[3.75rem]"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
