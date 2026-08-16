import { Translate } from "@/i18n";
import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactFormBase() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const company = String(fd.get("company") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const next: typeof errors = {};
    if (!name) next.name = "Your name is required";
    if (!email) next.email = "An email address is required";
    else if (!EMAIL_RE.test(email)) next.email = "That email doesn't look right";
    if (!message) next.message = "Tell us a little about the project";

    if (Object.keys(next).length) {
      setErrors(next);
      setState("idle");
      return;
    }
    setErrors({});
    setState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, message }),
      });
      const json = await response.json();
      if (response.ok && json?.ok === true) {
        form.reset();
        setState("ok");
      } else {
        setState("err");
      }
    } catch (err) {
      console.warn("[Kavolith] contact dispatch failed", err);
      setState("err");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-border bg-surface p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Priya Menon" required error={errors.name} />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          error={errors.email}
        />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Phone (optional)" name="phone" type="tel" placeholder="+91 98765 43210" />
        <Field label="Company" name="company" placeholder="Northwind Realty" />
      </div>
      <div className="mt-5">
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          What do you want to build?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          className="w-full rounded-lg border border-border bg-panel px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent aria-[invalid=true]:border-destructive"
          placeholder="Describe your current process, tools, and where things break down."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        aria-busy={state === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending…" : state === "err" ? "Try again" : "Send message"}
      </button>

      {state === "ok" && (
        <p className="mt-4 rounded-lg border border-accent/40 bg-accent-soft px-3 py-2 text-sm text-accent">
          Thanks — your message is in. We'll reply within one business day.
        </p>
      )}
      {state === "err" && (
        <p className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Something went wrong sending that. Please retry, or email us directly.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        className="w-full rounded-lg border border-border bg-panel px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent aria-[invalid=true]:border-destructive"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  return (
    <Translate>
      <ContactFormBase />
    </Translate>
  );
}
