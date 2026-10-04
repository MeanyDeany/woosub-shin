export const CONTACT_EMAIL = "woosub815@gmail.com";

export type ContactDraftFields = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

/** Build an email draft, never send it or persist its contents. */
export function buildContactDraft(fields: ContactDraftFields = {}) {
  const singleLine = (value = "") => Array.from(value, (character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127 ? " " : character;
  }).join("").trim();
  const name = singleLine(fields.name);
  const subject = name ? `[meanydeany.com] Message from ${name}` : "[meanydeany.com] Contact";
  const body = [
    `Name: ${name}`,
    `Reply email: ${singleLine(fields.email)}`,
    `Phone: ${singleLine(fields.phone) || "Not provided"}`,
    "",
    fields.message || "",
  ].join("\r\n");

  return {
    subject,
    body,
    mailtoUrl: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    gmailUrl: `https://mail.google.com/mail/?${new URLSearchParams({ view: "cm", fs: "1", to: CONTACT_EMAIL, su: subject, body })}`,
    clipboardText: `To: ${CONTACT_EMAIL}\nSubject: ${subject}\n\n${body}`,
  };
}
