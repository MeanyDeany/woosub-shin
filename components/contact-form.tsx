"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { SiteLocale } from "@/components/language-switcher";
import { buildContactDraft, CONTACT_EMAIL } from "@/lib/contact-draft";

type FormStatus = "idle" | "sending" | "success" | "error" | "draft";

export function ContactForm({ locale = "en" }: { locale?: SiteLocale }) {
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);
  const feedbackId = useId();
  const modeId = useId();
  const startedAtRef = useRef(0);
  const sendingRef = useRef(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  // Email drafting works even when the status endpoint or provider is unavailable.
  const [deliveryMode, setDeliveryMode] = useState<"email" | "service">("email");
  const [draft, setDraft] = useState(() => buildContactDraft());
  const [copied, setCopied] = useState(false);
  const [manualCopy, setManualCopy] = useState(false);
  const korean = locale === "ko";

  useEffect(() => {
    startedAtRef.current = Date.now();
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5_000);
    let disposed = false;

    void fetch("/api/contact/status", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) return;
        const result: unknown = await response.json();
        if (!disposed && result && typeof result === "object" && "configured" in result && result.configured === true) {
          setDeliveryMode("service");
        }
      })
      .catch(() => { /* Keep direct email available on network or configuration failure. */ })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      disposed = true;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (status === "error" || status === "draft") feedbackRef.current?.focus();
  }, [status]);

  function readFields(form: HTMLFormElement) {
    const data = new FormData(form);
    return {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
      company: String(data.get("company") || ""),
    };
  }

  function updateDraft(event: React.FormEvent<HTMLFormElement>) {
    setDraft(buildContactDraft(readFields(event.currentTarget)));
    setCopied(false);
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft.clipboardText);
      setCopied(true);
      setManualCopy(false);
    } catch {
      setCopied(false);
      setManualCopy(true);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;

    const fields = readFields(event.currentTarget);
    const currentDraft = buildContactDraft(fields);
    setDraft(currentDraft);
    setCopied(false);

    if (deliveryMode === "email") {
      setStatus("draft");
      setFeedback(korean
        ? "이메일 앱에서 내용을 확인하고 보내기를 눌러 주세요. 웹사이트에서는 아직 전송하지 않았습니다. 앱이 열리지 않으면 아래 Gmail 또는 메시지 복사를 이용해 주세요."
        : "Review the draft and press Send in your email app. This website has not sent your message. If no app opens, use Gmail or Copy message below.");
      window.location.assign(currentDraft.mailtoUrl);
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    setFeedback("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, formStartedAt: startedAtRef.current }),
        signal: controller.signal,
      });
      const result: unknown = await response.json().catch(() => null);
      if (response.status === 503) setDeliveryMode("email");
      if (!response.ok || !result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
        throw new Error("Delivery was not confirmed.");
      }

      formRef.current?.reset();
      setDraft(buildContactDraft());
      setManualCopy(false);
      startedAtRef.current = Date.now();
      setStatus("success");
      setFeedback(korean
        ? "메시지를 전송했습니다. 입력한 이메일 주소로 답변드리겠습니다."
        : "Message sent. I will reply to the email address you provided.");
    } catch {
      setStatus("error");
      setFeedback(korean
        ? "전송을 확인하지 못했습니다. 작성한 내용은 그대로 남아 있습니다. 아래 이메일 앱 또는 Gmail로 직접 보내 주세요."
        : "Delivery could not be confirmed. Your message is still here. Use Email app or Gmail below to send it directly.");
    } finally {
      window.clearTimeout(timeout);
      sendingRef.current = false;
    }
  }

  const inputClass = "contact-input site-strong w-full rounded-2xl px-4 py-3.5 text-sm outline-none backdrop-blur-xl transition";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onInput={updateDraft}
      aria-describedby={`${modeId}${feedback ? ` ${feedbackId}` : ""}`}
      className="glass-panel min-w-0 rounded-[2rem] p-6 sm:p-8"
    >
      <p id={modeId} className="site-muted mb-6 text-sm leading-6" aria-live="polite">
        {deliveryMode === "email"
          ? korean
            ? "아래 내용을 작성하면 이메일 초안을 만들 수 있습니다. 이메일 앱이나 Gmail에서 보내기를 눌러야 전송됩니다."
            : "Write your message below, then send it using your email app or Gmail. Nothing is sent automatically."
          : korean
            ? "아래 폼으로 메시지를 보내거나 이메일로 직접 연락해 주세요."
            : "Send a message through the form or contact me directly by email."}
      </p>
      <fieldset disabled={status === "sending"} className="grid min-w-0 gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="site-strong text-sm font-semibold">{korean ? "이름" : "Name"}</span>
          <input className={inputClass} type="text" name="name" aria-describedby={status === "error" ? feedbackId : undefined} autoComplete="name" minLength={2} maxLength={80} required />
        </label>
        <label className="grid gap-2">
          <span className="site-strong text-sm font-semibold">{korean ? "전화번호" : "Phone number"}</span>
          <input className={inputClass} type="tel" name="phone" aria-describedby={status === "error" ? feedbackId : undefined} autoComplete="tel" maxLength={40} placeholder={korean ? "선택 사항" : "Optional"} />
        </label>
        <label className="grid gap-2 sm:col-span-2">
          <span className="site-strong text-sm font-semibold">{korean ? "이메일" : "Email"}</span>
          <input className={inputClass} type="email" name="email" aria-describedby={status === "error" ? feedbackId : undefined} autoComplete="email" maxLength={254} required />
        </label>
        <label className="grid gap-2 sm:col-span-2">
          <span className="site-strong text-sm font-semibold">{korean ? "질문 또는 메시지" : "Question or message"}</span>
          <textarea className={inputClass + " min-h-44 resize-y leading-7"} name="message" aria-describedby={status === "error" ? feedbackId : undefined} minLength={10} maxLength={4000} required />
        </label>
      </fieldset>
      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <span>{korean ? "회사" : "Company"}</span>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </label>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="site-muted max-w-xl text-xs leading-5">
          {deliveryMode === "email"
            ? korean
              ? "이메일 초안은 이 페이지에서만 준비되며 사이트에 저장되거나 공개되지 않습니다. 이메일 서비스로 이동한 뒤 직접 전송해 주세요."
              : "Your draft is prepared on this page, not saved or published on the site. You choose when to open your email provider and send it."
            : korean
              ? "연락처와 메시지는 비공개 이메일로 전달됩니다. 대략적인 국가와 도시 정보가 첨부될 수 있지만 원본 IP 주소는 이 폼에 저장되지 않습니다."
              : "Your details and message are emailed privately. Approximate country and city may be attached; the raw IP address is not stored by this form."}
        </p>
        <button type="submit" disabled={status === "sending"} className="research-button primary shrink-0 disabled:cursor-wait disabled:opacity-60">
          {status === "sending" ? (korean ? "전송 중..." : "Sending...")
            : deliveryMode === "email" ? (korean ? "이메일 앱 열기" : "Open email app")
              : korean ? "메시지 보내기" : "Send message"}
        </button>
      </div>
      {feedback ? (
        <p id={feedbackId} ref={feedbackRef} tabIndex={-1} role="status" aria-live="polite"
          className={`form-feedback mt-5 rounded-2xl px-4 py-3 text-sm ${status === "success" ? "form-feedback--success" : status === "error" ? "form-feedback--error" : ""}`}>
          {feedback}
        </p>
      ) : null}
      <div className="mt-6 border-t border-current/10 pt-5" data-contact-email-options>
        <p className="site-muted text-xs leading-5">
          {korean ? "직접 이메일: " : "Direct email: "}<a className="site-link break-all" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <a className="site-link" href={draft.mailtoUrl}>{korean ? "이메일 앱" : "Email app"}</a>
          <a className="site-link" href={draft.gmailUrl} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">{korean ? "Gmail에서 열기" : "Open Gmail"}</a>
          <button className="site-link cursor-pointer" type="button" onClick={copyDraft}>{copied ? (korean ? "복사됨" : "Copied") : korean ? "메시지 복사" : "Copy message"}</button>
        </div>
        {manualCopy ? (
          <label className="mt-4 grid gap-2">
            <span className="site-muted text-xs">{korean ? "자동 복사가 차단되어 있습니다. 아래 내용을 선택해 복사해 주세요." : "Automatic copying is unavailable. Select and copy the text below."}</span>
            <textarea className={inputClass + " min-h-32"} readOnly value={draft.clipboardText} onFocus={(event) => event.currentTarget.select()} />
          </label>
        ) : null}
      </div>
    </form>
  );
}
