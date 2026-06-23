import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt, FaTimes, FaWhatsapp } from "react-icons/fa";
import type { ContactData, ProfileData } from "../types/portfolio";
import { withBase } from "../utils/paths";

interface ContactSectionProps {
  contact: ContactData;
  profile: ProfileData;
}

type SubmissionStatus = "idle" | "sending" | "success" | "error";

export const ContactSection = ({ contact, profile }: ContactSectionProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const whatsappNumber = profile.phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  useEffect(() => () => document.body.classList.remove("contact-modal-open"), []);

  const openContactForm = () => {
    setSubmissionStatus("idle");
    document.body.classList.add("contact-modal-open");
    dialogRef.current?.showModal();
  };

  const closeContactForm = () => dialogRef.current?.close();

  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const bounds = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) closeContactForm();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    if (String(formData.get("_honey") ?? "").trim()) {
      form.reset();
      setSubmissionStatus("success");
      return;
    }

    setSubmissionStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.formRecipientEmail}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(formData.get("name") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          phone: String(formData.get("phone") ?? "").trim(),
          message: String(formData.get("message") ?? "").trim(),
          _subject: contact.formSubject,
          _template: "table",
          _captcha: "false",
        }),
      });

      const result = await response.json().catch(() => null) as { success?: boolean | string } | null;
      const rejected = result?.success === false || result?.success === "false";
      if (!response.ok || rejected) throw new Error("Contact form submission failed");

      form.reset();
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    }
  };

  return (
  <>
    <section className="contact-banner section-block reveal reveal-scale" id="contact">
      <div className="contact-message">
        <FaPaperPlane size={48} aria-hidden="true" />
        <div><h2>{contact.title}</h2><p>{contact.message}</p></div>
      </div>
      <address className="contact-details">
        <a href={`mailto:${profile.email}`}><FaEnvelope size={16} aria-hidden="true" />{profile.email}</a>
        <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}><FaPhoneAlt size={16} aria-hidden="true" />{profile.phone}</a>
        <span><FaMapMarkerAlt size={16} aria-hidden="true" />{profile.location}</span>
      </address>
      <div className="contact-map">
        <button className="contact-conversation-button" type="button" onClick={openContactForm}>
          <FaPaperPlane size={17} aria-hidden="true" />
          <span>Start a Conversation</span>
        </button>
      </div>
    </section>
    <dialog
      ref={dialogRef}
      className="contact-modal"
      aria-labelledby="contact-modal-title"
      aria-describedby="contact-modal-description"
      onClick={handleDialogClick}
      onClose={() => {
        document.body.classList.remove("contact-modal-open");
        setSubmissionStatus("idle");
      }}
    >
      <header className="contact-modal-header">
        <div>
          <span className="contact-modal-eyebrow">Contact</span>
          <h2 id="contact-modal-title">{contact.formTitle}</h2>
          <p id="contact-modal-description">{contact.formMessage}</p>
        </div>
        <button className="contact-modal-close" type="button" onClick={closeContactForm} aria-label="Close contact form">
          <FaTimes size={18} aria-hidden="true" />
        </button>
      </header>
      <div className="contact-modal-body">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-grid">
            <label>
              <span>Name</span>
              <input type="text" name="name" autoComplete="name" maxLength={100} required autoFocus />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" maxLength={160} required />
            </label>
            <label className="contact-form-full">
              <span>Phone</span>
              <input type="tel" name="phone" autoComplete="tel" maxLength={30} required />
            </label>
            <label className="contact-form-full">
              <span>Message</span>
              <textarea name="message" rows={6} maxLength={2000} required />
            </label>
          </div>
          <label className="contact-form-honeypot" aria-hidden="true">
            Leave this field empty
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          </label>
          <div className="contact-form-status" aria-live="polite">
            {submissionStatus === "success" && <p className="is-success">Thank you. Your message has been sent successfully.</p>}
            {submissionStatus === "error" && (
              <p className="is-error">
                The message could not be sent from this browser. <a href={`mailto:${profile.email}`}>Email me directly</a>.
              </p>
            )}
          </div>
          <div className="contact-modal-actions">
            <button className="contact-submit-button" type="submit" disabled={submissionStatus === "sending"}>
              <FaPaperPlane size={15} aria-hidden="true" />
              <span>{submissionStatus === "sending" ? "Sending..." : "Send Message"}</span>
            </button>
            <a className="contact-modal-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
              <FaWhatsapp size={18} aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
          <p className="contact-form-note">
            Your contact details will only be used to respond to your inquiry.
          </p>
        </form>
      </div>
    </dialog>
    <footer className="site-footer reveal reveal-fade">
      <div className="footer-inner">
        <span className="footer-logo" aria-hidden="true">
          <img className="theme-logo theme-logo-on-light" src={withBase("images/logo-light.png")} alt="" width={772} height={579} loading="lazy" />
          <img className="theme-logo theme-logo-on-dark" src={withBase("images/logo-dark.png")} alt="" width={771} height={579} loading="lazy" />
        </span>
        <p>Copyright {new Date().getFullYear()} atmhasan.com. All rights reserved.</p>
      </div>
    </footer>
  </>
  );
};
