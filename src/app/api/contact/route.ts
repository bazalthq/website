import { NextRequest } from "next/server";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Contact endpoint. Runs as a serverless function on Vercel and sends the
 * message through Resend's REST API (no SDK needed). Configure with env vars:
 *   RESEND_API_KEY  — required to actually send
 *   CONTACT_TO      — recipient (defaults to site.contact.email)
 *   CONTACT_FROM    — verified sender, e.g. "BAZALTHQ <hello@bazalthq.eu>"
 * Until the key is set it returns a clear "email us directly" message.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // honeypot: pretend success so bots don't learn anything
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!validEmail(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length < 5) {
    return Response.json({ error: "Your message is a little short." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || site.contact.email;
  const from = process.env.CONTACT_FROM || "BAZALTHQ <onboarding@resend.dev>";

  if (!key) {
    return Response.json(
      { error: `Email isn't wired up yet — reach us directly at ${to}.` },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry — ${name || email}`,
        text: `From: ${name || "(no name)"} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      return Response.json(
        { error: `Couldn't send right now — please email ${to} directly.` },
        { status: 502 },
      );
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: `Couldn't send right now — please email ${to} directly.` },
      { status: 502 },
    );
  }
}
