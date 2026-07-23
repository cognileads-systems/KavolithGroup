import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919492044168"; // TODO: replace with your actual number, country code no '+' or spaces
const WHATSAPP_MESSAGE = "Hi VectraSyn, I'd like to talk about an AI SDR pipeline.";

export default function FloatingWhatsApp() {
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/40 transition-transform hover:scale-110">
        <MessageCircle className="h-7 w-7 text-white" fill="white" strokeWidth={0} />
      </span>
    </a>
  );
}
