"use client";

import { useRef, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef(Date.now());
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
      company: String(form.get("company") || ""),
      formStartedAt: startedAtRef.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "The message could not be sent.");
      }

      formRef.current?.reset();
      startedAtRef.current = Date.now();
      setStatus("success");
      setFeedback("Message sent. I will reply to the email address you provided.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "The message could not be sent. Please use the direct email link.",
      );
    }
  }

  const inputClass =
    "site-strong w-full rounded-2xl border border-[#7187AB]/22 bg-white/62 px-4 py-3.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] outline-none backdrop-blur-xl transition focus:border-[#2580D8]/55 focus:ring-4 focus:ring-[#2580D8]/10 dark:border-white/10";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="glass-panel rounded-[2rem] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="site-strong text-sm font-semibold">Name</span>
          <input
            className={inputClass}
            type="text"
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="site-strong text-sm font-semibold">Phone number</span>
          <input
            className={inputClass}
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={40}
            placeholder="Optional"
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="site-strong text-sm font-semibold">Email</span>
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            required
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="site-strong text-sm font-semibold">Question or message</span>
          <textarea
            className={`${inputClass} min-h-44 resize-y leading-7`}
            name="message"
            minLength={10}
            maxLength={4000}
            required
          />
        </label>
      </div>

      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <span>Company</span>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="site-muted max-w-xl text-xs leading-5">
          Your contact details and message are emailed privately to Woosub Shin. They are not
          published on the site. Approximate country and city may be attached from Vercel&apos;s
          geolocation headers; the raw IP address is not included or stored by this form.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#17243D] px-6 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(39,66,109,0.20)] transition hover:-translate-y-0.5 hover:bg-[#22375B] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
      </div>

      {feedback ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-5 rounded-2xl px-4 py-3 text-sm ${
            status === "success"
              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700"
              : "border border-red-500/20 bg-red-500/10 text-red-700"
          }`}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
