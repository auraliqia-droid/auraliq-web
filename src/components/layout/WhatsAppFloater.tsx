import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function WhatsAppFloater() {
  return (
    <Link
      href="https://wa.me/529221530320"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
      <span className="absolute right-full mr-4 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
        ¿Hablamos?
      </span>
    </Link>
  );
}

