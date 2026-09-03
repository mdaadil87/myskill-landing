import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  AlertTriangle,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  RotateCcw,
  Send,
  User,
  Wallet,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const SERVICE_OPTIONS = [
  "Website / Landing page",
  "Mobile app (iOS & Android)",
  "Web app / SaaS",
  "AI editing or automation",
  "Something else",
];

const BUDGET_OPTIONS = [
  "Not sure yet — guide me",
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000+",
];

const OWNER_EMAIL = "mdaadilansari248@gmail.com";
const OWNER_PHONE_DISPLAY = "9871814324";
const OWNER_PHONE_TEL = "+919871814324";
const ENDPOINT = `https://formsubmit.co/ajax/${OWNER_EMAIL}`;

type Status = "idle" | "sending" | "sent" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  service: SERVICE_OPTIONS[0],
  budget: BUDGET_OPTIONS[0],
  message: "",
};

function Field({
  id,
  label,
  hint,
  icon: Icon,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  icon: typeof User;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 text-left ${className ?? ""}`}>
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-[0.18em] text-zinc-400 uppercase"
      >
        <Icon className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
        {label}
      </label>
      {children}
      {hint ? <p className="text-[11.5px] text-zinc-500">{hint}</p> : null}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder-zinc-500 transition-colors duration-200 focus:border-violet-400/60 focus:bg-white/[0.09] focus:outline-none";

export default function CTA() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const mailtoFallback = () => {
    const body = encodeURIComponent(
      `New MySkill Project Request\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\nService: ${form.service}\nBudget: ${form.budget}\nDetails: ${form.message || "—"}\n\n— Sent from MySkill landing page`
    );
    return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
      `Project request — ${form.service} — ${form.name || "New client"}`
    )}&body=${body}`;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New project request — ${form.service} — ${form.name}`,
          _template: "table",
          _captcha: "false",
          Name: form.name,
          Email: form.email,
          "Phone / WhatsApp": form.phone || "—",
          "Service needed": form.service,
          Budget: form.budget,
          "Project details": form.message || "—",
          Source: "MySkill landing page",
        }),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Network error — please try again.");
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <Reveal dir="scale" className="mx-auto max-w-6xl">
        <div className="noise relative overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-16 sm:px-12 sm:py-20">
          {/* animated backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="bg-grid absolute inset-0 opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-base-900 to-fuchsia-950" />
            <div className="animate-blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-500/30 blur-[110px]" />
            <div
              className="animate-blob absolute -right-24 -bottom-32 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-[110px]"
              style={{ animationDelay: "-8s" }}
            />
            <div
              className="animate-blob absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-[100px]"
              style={{ animationDelay: "-14s" }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="text-center">
              <span className="animate-rise glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.22em] text-emerald-300 uppercase">
                <CalendarCheck className="h-3.5 w-3.5" />
                Limited slots each month
              </span>

              <h2
                className="font-display animate-rise mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
                style={{ animationDelay: "80ms" }}
              >
                Have an idea? <span className="text-shine">Let&apos;s ship it.</span>
              </h2>

              <p
                className="animate-rise mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg"
                style={{ animationDelay: "160ms" }}
              >
                Fill this short brief — it lands straight in my inbox. Within 48 hours
                you&apos;ll get a fixed-price proposal and a plan you can act on, free.
              </p>

              <div
                className="animate-rise mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-xs text-zinc-400 sm:text-[13px]"
                style={{ animationDelay: "200ms" }}
              >
                <a
                  href={`mailto:${OWNER_EMAIL}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-violet-300"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {OWNER_EMAIL}
                </a>
                <span className="hidden text-zinc-600 sm:inline" aria-hidden="true">
                  ·
                </span>
                <a
                  href={`tel:${OWNER_PHONE_TEL}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-violet-300"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {OWNER_PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* ---------- form / states ---------- */}
            <div className="animate-rise mt-10" style={{ animationDelay: "260ms" }}>
              {status === "sent" ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="glass mx-auto flex max-w-xl flex-col items-center gap-3 rounded-3xl px-8 py-10 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-900/50">
                    <CheckCircle2 className="h-7 w-7 text-white" />
                  </span>
                  <p className="font-display text-xl font-semibold text-white">
                    Request received — thank you, {form.name.split(" ")[0] || "friend"}!
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    Your brief has been emailed to{" "}
                    <span className="font-semibold text-emerald-300">{OWNER_EMAIL}</span>.
                    Here&apos;s what was sent:
                  </p>
                  <dl className="mt-2 grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-2">
                    {[
                      ["Name", form.name],
                      ["Email", form.email],
                      ["Phone", form.phone || "—"],
                      ["Service", form.service],
                      ["Budget", form.budget],
                      ["Details", form.message || "—"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5"
                      >
                        <dt className="font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase">
                          {k}
                        </dt>
                        <dd className="mt-0.5 truncate text-[13.5px] text-zinc-200" title={v}>
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-1 text-[13px] text-zinc-400">
                    Expect my reply within 48 hours — usually much sooner.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY);
                      setStatus("idle");
                    }}
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Send another request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate={false}
                  className="glass-strong rounded-[1.75rem] p-6 sm:p-8"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field id="f-name" label="Your name" icon={User}>
                      <input
                        id="f-name"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={set("name")}
                        placeholder="e.g. Rahul Sharma"
                        className={inputCls}
                      />
                    </Field>

                    <Field id="f-email" label="Email" hint="Your proposal will be sent here" icon={Mail}>
                      <input
                        id="f-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@company.com"
                        className={inputCls}
                      />
                    </Field>

                    <Field
                      id="f-phone"
                      label="Phone / WhatsApp"
                      hint="Optional — for a quick call"
                      icon={Phone}
                    >
                      <input
                        id="f-phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+91 98xxx xxxxx"
                        className={inputCls}
                      />
                    </Field>

                    <Field id="f-service" label="Service needed" icon={Briefcase}>
                      <select
                        id="f-service"
                        value={form.service}
                        onChange={set("service")}
                        className={`${inputCls} appearance-none`}
                      >
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-base-900">
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      id="f-budget"
                      label="Budget range"
                      hint="A rough idea is enough"
                      icon={Wallet}
                      className="sm:col-span-2"
                    >
                      <select
                        id="f-budget"
                        value={form.budget}
                        onChange={set("budget")}
                        className={`${inputCls} appearance-none`}
                      >
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b} className="bg-base-900">
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      id="f-message"
                      label="Project details"
                      hint="What are you building? Goals, references, deadline…"
                      icon={MessageSquare}
                      className="sm:col-span-2"
                    >
                      <textarea
                        id="f-message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={set("message")}
                        placeholder="I need a landing page for my coaching institute that captures NEET enquiries…"
                        className={`${inputCls} resize-y`}
                      />
                    </Field>
                  </div>

                  {status === "error" ? (
                    <div
                      role="alert"
                      className="mt-5 flex flex-col gap-3 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-rose-200">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        Couldn&apos;t send right now ({errorMsg}). Please retry, or email me
                        directly — your details stay filled in.
                      </p>
                      <a
                        href={mailtoFallback()}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-rose-300/30 bg-rose-400/10 px-4 py-2 text-[13px] font-semibold text-rose-100 transition hover:bg-rose-400/20"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        Email instead
                      </a>
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <p className="text-center font-mono text-[11px] text-zinc-500 sm:text-left">
                      Goes straight to {OWNER_EMAIL}
                      <br className="hidden sm:block" /> · No spam, ever
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_36px_-8px_rgba(139,92,246,0.7)] transition-all duration-300 hover:brightness-110 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden="true" />
                          Sending your brief…
                        </>
                      ) : (
                        <>
                          Send request
                          <Send
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
