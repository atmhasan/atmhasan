import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "../utils/analytics";

interface FloatingWhatsAppProps {
  phone: string;
  message: string;
}

export const FloatingWhatsApp = ({ phone, message }: FloatingWhatsAppProps) => {
  const whatsappNumber = phone.replace(/\D/g, "");
  if (!whatsappNumber) return null;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact A T M Hasan on WhatsApp"
      title="Chat on WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { placement: "floating_button" })}
    >
      <FaWhatsapp size={29} aria-hidden="true" />
      <span className="whatsapp-tooltip" aria-hidden="true">WhatsApp</span>
    </a>
  );
};
