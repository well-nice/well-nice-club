import { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import shortMark from "@/imports/Well_Nice_Short_Mark.png";
import fullMark from "@/imports/Well_Nice_Full_Mark__1_.png";

type Screen =
  | "onboarding"
  | "signin"
  | "feed"
  | "spaces"
  | "spaceDetail"
  | "events"
  | "nice"
  | "profile"
  | "editProfile"
  | "notifications"
  | "postDetail"
  | "search"
  | "compose";

type Tab = "feed" | "spaces" | "events" | "nice" | "profile";

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconFeed = ({ active }: { active?: boolean }) => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={active ? "#111" : "#BBB"} strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="14" width="18" height="6" rx="2" />
  </svg>
);
const IconSpaces = ({ active }: { active?: boolean }) => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={active ? "#111" : "#BBB"} strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const IconNice = ({ active }: { active?: boolean }) => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={active ? "#111" : "#BBB"} strokeWidth="1.8">
    <path d="M12 3 L13.7 9.4 L20 12 L13.7 14.6 L12 21 L10.3 14.6 L4 12 L10.3 9.4 Z" strokeLinejoin="round" />
  </svg>
);
const IconEvents = ({ active }: { active?: boolean }) => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={active ? "#111" : "#BBB"} strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
  </svg>
);
const IconYou = ({ active }: { active?: boolean }) => (
  <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={active ? "#111" : "#BBB"} strokeWidth="1.8">
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" strokeLinecap="round" />
  </svg>
);
const IconHeart = ({ color = "#888", filled = false }: { color?: string; filled?: boolean }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="1.8">
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" strokeLinejoin="round" />
  </svg>
);
const IconChat = ({ color = "#888" }: { color?: string }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M21 11.5a8.4 8.4 0 0 1-11.6 7.8L4 20.5l1.3-4.3A8.4 8.4 0 1 1 21 11.5z" strokeLinejoin="round" />
  </svg>
);
const IconShare = ({ color = "#888" }: { color?: string }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" strokeLinecap="round" />
    <path d="M12 15V3M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconBell = ({ dot = false, active = false }: { dot?: boolean; active?: boolean }) => (
  <div style={{ position: "relative", display: "flex" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#E8203A" : "#111"} strokeWidth="1.7" style={{ transition: "stroke 0.15s ease" }}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" strokeLinecap="round" />
    </svg>
    {dot && <span style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, background: "#E8203A", borderRadius: "50%", border: "1.5px solid #EFEFED" }} />}
  </div>
);
const IconCheck = ({ color = "#111" }: { color?: string }) => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconSearch = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#BBB" strokeWidth="1.9">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
  </svg>
);
const IconBack = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPlus = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

// ─── Atoms ────────────────────────────────────────────────────────────────────

const StatusBar = () => (
  <div style={{ height: 52, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px 0 32px", zIndex: 40, position: "relative" }}>
    <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>9:41</div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 11 }}>
        {[5, 7, 9, 11].map((h, i) => (
          <div key={i} style={{ width: 3, height: h, background: "#111", borderRadius: 1 }} />
        ))}
      </div>
      <div style={{ width: 24, height: 12, border: "1.5px solid #111", borderRadius: 3, position: "relative", padding: 1.5 }}>
        <div style={{ width: "72%", height: "100%", background: "#111", borderRadius: 1 }} />
        <div style={{ position: "absolute", right: -3, top: 3.5, width: 2, height: 4, background: "#111", borderRadius: "0 1px 1px 0" }} />
      </div>
    </div>
  </div>
);

const BottomTabBar = ({ activeTab, onTab }: { activeTab: Tab; onTab: (t: Tab) => void }) => {
  const [spinKey, setSpinKey] = useState(0);

  const tabs: { key: Tab; label: string; Icon: React.FC<{ active?: boolean }> }[] = [
    { key: "feed", label: "feed", Icon: IconFeed },
    { key: "spaces", label: "spaces", Icon: IconSpaces },
    { key: "nice", label: "concierge", Icon: IconNice },
    { key: "events", label: "events", Icon: IconEvents },
    { key: "profile", label: "you", Icon: IconYou },
  ];

  return (
    <div style={{ flexShrink: 0, height: 88, borderTop: "1px solid #E6E6E4", background: "#FFFFFF", display: "flex", alignItems: "flex-start", justifyContent: "space-around", padding: "13px 0 0", position: "relative" }}>
      {tabs.map(({ key, label, Icon }) => (
        <div
          key={key}
          onClick={() => { onTab(key); if (key === "nice") setSpinKey((k) => k + 1); }}
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: activeTab === key ? "#111" : "#BBB", cursor: "pointer" }}
        >
          {key === "nice" ? (
            <span key={spinKey} className={spinKey > 0 ? "wn-spin-once" : ""} style={{ display: "flex" }}>
              <Icon active={activeTab === key} />
            </span>
          ) : (
            <Icon active={activeTab === key} />
          )}
          <div style={{ fontSize: 10, fontWeight: activeTab === key ? 600 : 500 }}>{label}</div>
        </div>
      ))}
      <div style={{ position: "absolute", bottom: 9, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 3, background: "#111" }} />
    </div>
  );
};

const Avatar = ({ initials, src, size = 38 }: { initials?: string; src?: string; size?: number }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.34, fontWeight: 600, color: "#666", flexShrink: 0, overflow: "hidden" }}>
    {src ? <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(1)" }} alt="" /> : initials}
  </div>
);

const Card = ({ children, style = {}, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) => (
  <div onClick={onClick} className={onClick ? "wn-tap" : ""} style={{ margin: "0 18px 14px", background: "#FFF", borderRadius: 22, padding: "17px 17px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", ...style }}>
    {children}
  </div>
);

// ─── Screens ─────────────────────────────────────────────────────────────────

const SPACES_LIST = [
  { id: "studio", label: "The Studio", desc: "Behind the seams of everything we make" },
  { id: "drops", label: "Drops & Releases", desc: "New products, first" },
  { id: "style", label: "Style", desc: "Considered dressing, no noise" },
  { id: "wellness", label: "Wellness", desc: "Cold water, movement, quiet mornings" },
  { id: "movement", label: "Movement", desc: "Run, swim, walk — just move" },
  { id: "introductions", label: "Introductions", desc: "Say hello, meet the club" },
];

function OnboardingScreen({ onStart, onSignIn }: { onStart: () => void; onSignIn: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", bio: "" });
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(["studio"]);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resent, setResent] = useState(false);
  const codeRefs = [
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
  ];

  const TOTAL_STEPS = 5; // name, email, verify, bio, spaces
  const progress = step / TOTAL_STEPS;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleSpace = (id: string) =>
    setSelectedSpaces((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  const handleCodeInput = (i: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = digit;
    setCode(next);
    if (digit && i < 5) codeRefs[i + 1].current?.focus();
    if (!digit && i > 0) codeRefs[i - 1].current?.focus();
  };

  const canNext = () => {
    if (step === 1) return form.firstName.trim().length > 0;
    if (step === 2) return form.email.includes("@");
    if (step === 3) return code.every((d) => d !== "");
    if (step === 4) return true;
    if (step === 5) return selectedSpaces.length > 0;
    return true;
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#FFF", border: "1.5px solid #E4E4E1",
    borderRadius: 14, padding: "15px 17px", fontSize: 15, color: "#111",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };
  const focusStyle = "outline: none;";

  // Welcome splash
  if (step === 0) return (
    <div className="wn-screen" style={{ minHeight: 774, display: "flex", flexDirection: "column", padding: "0 30px 40px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 34, padding: 16 }}>
          <ImageWithFallback src={shortMark} alt="w/n" style={{ width: "100%", height: "auto", display: "block", filter: "invert(1)" }} />
        </div>
        <div style={{ fontSize: 46, lineHeight: 1.0, fontWeight: 700, letterSpacing: "-0.04em" }}>A quieter<br />kind of<br />community.</div>
        <div style={{ fontSize: 16, lineHeight: 1.55, color: "#666", marginTop: 22, maxWidth: 280 }}>Well Nice is a members' club for people who care about how things are made. Clarity, not complexity.</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <div onClick={() => setStep(1)} className="wn-tap" style={{ background: "#111", color: "#fff", textAlign: "center", padding: 17, borderRadius: 16, fontSize: 16, fontWeight: 600 }}>Create your account</div>
        <div onClick={onSignIn} className="wn-tap" style={{ textAlign: "center", padding: 15, fontSize: 15, fontWeight: 500, color: "#444" }}>I already have an account</div>
      </div>
    </div>
  );

  // Completion screen
  if (step === 6) return (
    <div className="wn-screen" style={{ minHeight: 774, display: "flex", flexDirection: "column", padding: "0 30px 40px", justifyContent: "center" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 34, padding: 16 }}>
          <ImageWithFallback src={shortMark} alt="w/n" style={{ width: "100%", height: "auto", display: "block", filter: "invert(1)" }} />
        </div>
        <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
          Welcome,<br />{form.firstName || "friend"}.
        </div>
        <div style={{ fontSize: 16, color: "#666", lineHeight: 1.6, marginTop: 18, maxWidth: 280 }}>
          You're in. {selectedSpaces.length} space{selectedSpaces.length !== 1 ? "s" : ""} joined. The club is quieter than you think.
        </div>
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
          {selectedSpaces.slice(0, 3).map((id) => {
            const s = SPACES_LIST.find((x) => x.id === id);
            return s ? (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#111", flexShrink: 0 }} />
                <div style={{ fontSize: 14, color: "#444" }}>{s.label}</div>
              </div>
            ) : null;
          })}
          {selectedSpaces.length > 3 && <div style={{ fontSize: 13, color: "#AAA", marginLeft: 20 }}>+{selectedSpaces.length - 3} more</div>}
        </div>
      </div>
      <div onClick={onStart} className="wn-tap" style={{ background: "#111", color: "#fff", textAlign: "center", padding: 17, borderRadius: 16, fontSize: 16, fontWeight: 600 }}>
        Take me in →
      </div>
    </div>
  );

  // Steps 1–5
  const steps = [
    {
      title: "What's your name?",
      subtitle: "This is how you'll appear in the club.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>First name</div>
            <input autoFocus value={form.firstName} onChange={set("firstName")} placeholder="Jordan" style={inputStyle} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>Last name</div>
            <input value={form.lastName} onChange={set("lastName")} placeholder="Reeve" style={inputStyle} />
          </div>
        </div>
      ),
    },
    {
      title: "Your email address.",
      subtitle: "We'll never share it. No newsletters unless you ask.",
      content: (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>Email</div>
          <input autoFocus type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" style={inputStyle} />
        </div>
      ),
    },
    {
      title: "Check your email.",
      subtitle: `We've sent a 6-digit code to ${form.email || "your email"}.`,
      content: (
        <div>
          {/* Email icon */}
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#F0F0EE", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" strokeLinecap="round" />
            </svg>
          </div>

          {/* 6 digit boxes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 24 }}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={codeRefs[i]}
                value={digit}
                onChange={(e) => handleCodeInput(i, e.target.value)}
                onKeyDown={(e) => e.key === "Backspace" && !digit && i > 0 && codeRefs[i - 1].current?.focus()}
                maxLength={1}
                inputMode="numeric"
                style={{
                  width: "100%", height: 54, textAlign: "center", fontSize: 22, fontWeight: 700,
                  boxSizing: "border-box", background: "#FFF",
                  border: `1.5px solid ${digit ? "#111" : "#E4E4E1"}`,
                  borderRadius: 14, outline: "none", fontFamily: "inherit",
                  boxShadow: digit ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "border-color 0.15s",
                }}
              />
            ))}
          </div>

          {/* Resend */}
          <div style={{ fontSize: 14, color: "#999", lineHeight: 1.5 }}>
            Didn't get it?{" "}
            <span
              onClick={() => { setResent(true); setTimeout(() => setResent(false), 3000); }}
              style={{ color: resent ? "#AAA" : "#111", fontWeight: 600, cursor: "pointer", textDecoration: resent ? "none" : "underline" }}
            >
              {resent ? "Code sent ✓" : "Resend code"}
            </span>
          </div>

          <div style={{ marginTop: 16, fontSize: 13, color: "#BBB", lineHeight: 1.5 }}>
            No password to remember. Ever.
          </div>
        </div>
      ),
    },
    {
      title: "Tell us a little about you.",
      subtitle: "Optional — but it helps people know who you are.",
      content: (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>Bio</div>
          <textarea value={form.bio} onChange={set("bio") as any} placeholder="Designer. Interested in how things are made." rows={4}
            style={{ ...inputStyle, resize: "none", lineHeight: 1.6 } as any} />
          <div style={{ fontSize: 12, color: "#CCC", marginTop: 6, textAlign: "right" }}>{form.bio.length} / 160</div>
        </div>
      ),
    },
    {
      title: "Choose your spaces.",
      subtitle: "Pick the rooms that feel right. You can change these any time.",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SPACES_LIST.map((space) => {
            const on = selectedSpaces.includes(space.id);
            return (
              <div key={space.id} onClick={() => toggleSpace(space.id)} className="wn-tap"
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 16, border: `1.5px solid ${on ? "#111" : "#E4E4E1"}`, background: on ? "#111" : "#FFF", cursor: "pointer", transition: "all 0.15s ease" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: on ? "#FFF" : "#111", letterSpacing: "-0.01em" }}>{space.label}</div>
                  <div style={{ fontSize: 12.5, color: on ? "rgba(255,255,255,0.55)" : "#999", marginTop: 2 }}>{space.desc}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${on ? "rgba(255,255,255,0.4)" : "#DDD"}`, background: on ? "rgba(255,255,255,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
  ];

  const current = steps[step - 1];

  return (
    <div className="wn-screen" style={{ minHeight: 774, display: "flex", flexDirection: "column", padding: "0 0 32px" }}>
      {/* Progress bar + back */}
      <div style={{ padding: "16px 24px 0", display: "flex", alignItems: "center", gap: 14 }}>
        <div onClick={() => setStep((s) => s - 1)} className="wn-tap" style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconBack />
        </div>
        <div style={{ flex: 1, height: 3, background: "#EAEAE8", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress * 100}%`, background: "#111", borderRadius: 2, transition: "width 0.35s cubic-bezier(.4,0,.2,1)" }} />
        </div>
        <div style={{ fontSize: 12, color: "#AAA", flexShrink: 0, fontWeight: 500 }}>{step} / {TOTAL_STEPS}</div>
      </div>

      {/* Step content */}
      <div key={step} className="wn-screen" style={{ flex: 1, padding: "32px 28px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 8 }}>{current.title}</div>
        <div style={{ fontSize: 14.5, color: "#666", lineHeight: 1.5, marginBottom: 28 }}>{current.subtitle}</div>
        <div style={{ flex: 1, overflowY: "auto" }}>{current.content}</div>
      </div>

      {/* CTA */}
      <div style={{ padding: "20px 28px 0" }}>
        <div
          onClick={() => canNext() && setStep((s) => s + 1)}
          className="wn-tap"
          style={{ background: canNext() ? "#111" : "#E4E4E1", color: canNext() ? "#fff" : "#AAA", textAlign: "center", padding: 17, borderRadius: 16, fontSize: 16, fontWeight: 600, transition: "all 0.2s", cursor: canNext() ? "pointer" : "default" }}
        >
          {step === TOTAL_STEPS ? "Finish →" : "Continue"}
        </div>
        {step === 4 && (
          <div onClick={() => setStep((s) => s + 1)} style={{ textAlign: "center", padding: "14px 0 0", fontSize: 14, color: "#AAA", cursor: "pointer" }}>Skip for now</div>
        )}
      </div>
    </div>
  );
}

function SignInScreen({ onBack, onSignIn }: { onBack: () => void; onSignIn: () => void }) {
  const [signInStep, setSignInStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resent, setResent] = useState(false);
  const codeRefs = [
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
  ];

  const handleCodeInput = (i: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = digit;
    setCode(next);
    if (digit && i < 5) codeRefs[i + 1].current?.focus();
    if (!digit && i > 0) codeRefs[i - 1].current?.focus();
    if (next.every((d) => d !== "")) setTimeout(onSignIn, 300);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#FFF", border: "1.5px solid #E4E4E1",
    borderRadius: 14, padding: "15px 17px", fontSize: 15, color: "#111",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };

  if (signInStep === "email") return (
    <div className="wn-screen" style={{ padding: "6px 30px 40px", display: "flex", flexDirection: "column", minHeight: 774 }}>
      <div onClick={onBack} className="wn-tap" style={{ fontSize: 27, color: "#111", width: 24, marginBottom: 26, lineHeight: 1 }}>‹</div>
      <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.05 }}>Welcome back.</div>
      <div style={{ fontSize: 15, color: "#666", marginTop: 8, marginBottom: 30 }}>Enter your email and we'll send you a code.</div>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>Email</div>
      <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com" style={inputStyle}
        onKeyDown={(e) => e.key === "Enter" && email.includes("@") && setSignInStep("code")} />
      <div onClick={() => email.includes("@") && setSignInStep("code")} className="wn-tap"
        style={{ background: email.includes("@") ? "#111" : "#E4E4E1", color: email.includes("@") ? "#fff" : "#AAA", textAlign: "center", padding: 17, borderRadius: 16, fontSize: 16, fontWeight: 600, marginTop: 20, transition: "all 0.2s" }}>
        Send code
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "24px 0" }}>
        <div style={{ flex: 1, height: 1, background: "#DDD" }} />
        <div style={{ fontSize: 12, color: "#AAA", letterSpacing: "0.06em" }}>OR</div>
        <div style={{ flex: 1, height: 1, background: "#DDD" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <div onClick={onSignIn} style={{ background: "#fff", border: "1px solid #E4E4E1", borderRadius: 14, padding: 14, textAlign: "center", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Continue with Apple</div>
        <div onClick={onSignIn} style={{ background: "#fff", border: "1px solid #E4E4E1", borderRadius: 14, padding: 14, textAlign: "center", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Continue with Google</div>
      </div>
    </div>
  );

  return (
    <div className="wn-screen" style={{ padding: "6px 30px 40px", display: "flex", flexDirection: "column", minHeight: 774 }}>
      <div onClick={() => setSignInStep("email")} className="wn-tap" style={{ fontSize: 27, color: "#111", width: 24, marginBottom: 26, lineHeight: 1 }}>‹</div>
      <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.05 }}>Check your email.</div>
      <div style={{ fontSize: 15, color: "#666", marginTop: 8, marginBottom: 30 }}>We sent a 6-digit code to <span style={{ color: "#111", fontWeight: 600 }}>{email}</span>.</div>

      <div style={{ width: 56, height: 56, borderRadius: 16, background: "#F0F0EE", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 7l10 7 10-7" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 24 }}>
        {code.map((digit, i) => (
          <input key={i} ref={codeRefs[i]} value={digit}
            onChange={(e) => handleCodeInput(i, e.target.value)}
            onKeyDown={(e) => e.key === "Backspace" && !digit && i > 0 && codeRefs[i - 1].current?.focus()}
            maxLength={1} inputMode="numeric"
            style={{ width: "100%", height: 54, textAlign: "center", fontSize: 22, fontWeight: 700, boxSizing: "border-box", background: "#FFF", border: `1.5px solid ${digit ? "#111" : "#E4E4E1"}`, borderRadius: 14, outline: "none", fontFamily: "inherit", boxShadow: digit ? "0 1px 3px rgba(0,0,0,0.08)" : "none", transition: "border-color 0.15s" }} />
        ))}
      </div>

      <div style={{ fontSize: 14, color: "#999" }}>
        Didn't get it?{" "}
        <span onClick={() => { setResent(true); setTimeout(() => setResent(false), 3000); }}
          style={{ color: resent ? "#AAA" : "#111", fontWeight: 600, cursor: "pointer", textDecoration: resent ? "none" : "underline" }}>
          {resent ? "Code sent ✓" : "Resend code"}
        </span>
      </div>
      <div style={{ fontSize: 13, color: "#CCC", marginTop: 12 }}>No password. Just you.</div>
    </div>
  );
}

function FeedScreen({
  onConcierge, onPost, onCompose, onNotifications,
  streak, justChecked, onCheckIn,
  rsvpDone, onRsvp,
  voted, onVote,
  thought, bellActive,
}: {
  onConcierge: () => void; onPost: () => void; onCompose: () => void; onNotifications: () => void;
  streak: number; justChecked: boolean; onCheckIn: () => void;
  rsvpDone: boolean; onRsvp: () => void;
  voted: boolean; onVote: () => void;
  thought: { content: string; author: string } | null;
  bellActive: boolean;
}) {
  const circumference = 2 * Math.PI * 20;
  const offset = circumference * (1 - Math.min(streak / 30, 1));
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselSlide, setCarouselSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Following");
  const [likedPost, setLikedPost] = useState(false);
  const [likeAnimKey, setLikeAnimKey] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
    { initials: "DO", img: "13", name: "Devon Okafor", body: "Three seams nobody asked about is exactly the kind of thing that makes the difference.", time: "1h" },
    { initials: "TS", img: "52", name: "Theo Sand", body: "Clarity over complexity. Saved that.", time: "45m" },
  ]);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, offsetWidth } = carouselRef.current;
    setCarouselSlide(Math.round(scrollLeft / offsetWidth));
  };

  return (
    <div className="wn-screen" style={{ paddingBottom: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 22px 4px" }}>
        <ImageWithFallback src={fullMark} alt="well nice" style={{ height: 19, width: "auto", display: "block" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div onClick={onNotifications} className="wn-tap"><IconBell dot active={bellActive} /></div>
          <Avatar src="https://i.pravatar.cc/160?img=68" size={34} initials="JR" />
        </div>
      </div>

      {/* Greeting */}
      <div style={{ padding: "14px 22px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#AAA" }}>Tuesday · 23 June</div>
        <div style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 700, marginTop: 6 }}>Good morning, Jordan.</div>
      </div>

      {/* Concierge card */}
      <div onClick={onConcierge} className="wn-tap" style={{ margin: "0 18px 16px", background: "#111", borderRadius: 18, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, flexShrink: 0 }}>c</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#FFF", letterSpacing: "-0.01em" }}>Ask the concierge</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>What to wear, read, do.</div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>›</div>
      </div>

      {/* Carousel: Thought of the day + Daily ritual */}
      <div style={{ marginBottom: 14 }}>
        <div ref={carouselRef} onScroll={handleCarouselScroll}
          style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollBehavior: "smooth", gap: 10, padding: "0 18px" }}>

          {/* Slide 1: Thought of the day */}
          <div style={{ flexShrink: 0, width: "calc(100% - 36px)", scrollSnapAlign: "start", background: "#FFF", borderRadius: 20, padding: "18px 20px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 130 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#AAA", marginBottom: 10 }}>Thought of the day</div>
            {thought ? (
              <>
                <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "#1A1A1A", fontStyle: "italic", flex: 1 }}>"{thought.content}"</div>
                <div style={{ fontSize: 12.5, color: "#999", marginTop: 12 }}>— {thought.author}</div>
              </>
            ) : (
              <>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 12, width: "88%", background: "#F0F0EE", borderRadius: 6, marginBottom: 8 }} />
                  <div style={{ height: 12, width: "65%", background: "#F0F0EE", borderRadius: 6 }} />
                </div>
                <div style={{ height: 10, width: "28%", background: "#F0F0EE", borderRadius: 6, marginTop: 12 }} />
              </>
            )}
          </div>

          {/* Slide 2: Daily ritual */}
          <div style={{ flexShrink: 0, width: "calc(100% - 36px)", scrollSnapAlign: "start", background: "#FFF", borderRadius: 20, padding: "18px 20px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", minHeight: 130 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#AAA", marginBottom: 12 }}>Daily ritual</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ position: "relative", width: 60, height: 60, flexShrink: 0 }}>
                <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="30" cy="30" r="23" fill="none" stroke="#ECECEA" strokeWidth="5" />
                  <circle cx="30" cy="30" r="23" fill="none" stroke="#111" strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 23}
                    strokeDashoffset={2 * Math.PI * 23 * (1 - Math.min(streak / 30, 1))}
                    style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(.4,0,.2,1)" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em" }}>{streak}</div>
                  <div style={{ fontSize: 7, letterSpacing: "0.06em", textTransform: "uppercase", color: "#999", marginTop: 2 }}>days</div>
                </div>
                {justChecked && (
                  <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", fontSize: 13, fontWeight: 700, color: "#111", animation: "wnfloat 1.1s ease forwards", pointerEvents: "none" }}>+1</div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>No phone, first hour</div>
                <div style={{ fontSize: 12.5, color: "#999", marginTop: 4 }}>{justChecked ? "Done for today ✓" : `${streak} days — keep going`}</div>
              </div>
              <div onClick={onCheckIn} className="wn-tap" style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: justChecked ? "#111" : "transparent", border: "1.5px solid #111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconCheck color={justChecked ? "#fff" : "#111"} />
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 10 }}>
          {[0, 1].map((i) => (
            <div key={i} onClick={() => carouselRef.current?.scrollTo({ left: i * carouselRef.current.offsetWidth, behavior: "smooth" })}
              style={{ width: carouselSlide === i ? 16 : 5, height: 5, borderRadius: 3, background: carouselSlide === i ? "#111" : "#CCC", transition: "all 0.25s ease", cursor: "pointer" }} />
          ))}
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 7, padding: "0 18px 14px", overflowX: "auto" }}>
        {["Following", "Drops", "Wellness", "Style"].map((f) => {
          const active = activeFilter === f;
          return (
            <div key={f} onClick={() => setActiveFilter(f)} className="wn-tap"
              style={{ background: active ? "#111" : "#FFF", color: active ? "#FFF" : "#555", padding: "7px 15px", borderRadius: 999, fontSize: 12.5, fontWeight: active ? 600 : 500, flexShrink: 0, boxShadow: active ? "none" : "0 1px 2px rgba(0,0,0,0.05)", cursor: "pointer", transition: "background 0.15s, color 0.15s" }}>{f}</div>
          );
        })}
      </div>

      {/* Filtered alternate views */}
      {activeFilter !== "Following" && (
        <div key={activeFilter} className="wn-screen" style={{ paddingBottom: 20 }}>
          {activeFilter === "Drops" && (
            <>
              <div style={{ padding: "4px 22px 14px", fontSize: 13, color: "#999" }}>Latest from Drops &amp; Releases</div>
              <div className="wn-tap" style={{ margin: "0 18px 14px", background: "#FFF", borderRadius: 24, overflow: "hidden", boxShadow: "0 6px 24px -10px rgba(0,0,0,0.18)" }}>
                <div style={{ position: "relative", aspectRatio: "4/3", background: "#E8E8E6" }}>
                  <img src="https://wellnice.com/cdn/shop/files/Grey-Sweat_Front.jpg?v=1776693891&width=900" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" alt="" />
                  <div style={{ position: "absolute", top: 16, left: 16, background: "#111", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999 }}>New drop</div>
                </div>
                <div style={{ padding: "16px 17px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 600 }}>Grey Melange Sweatshirt</div><div style={{ fontSize: 13, color: "#999", marginTop: 2 }}>£35.00 · Just landed</div></div>
                  <div style={{ background: "#111", color: "#fff", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 600 }}>Shop</div>
                </div>
              </div>
              <Card>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
                  <Avatar src="https://i.pravatar.cc/160?img=47" size={36} initials="MJ" />
                  <div><div style={{ fontSize: 14, fontWeight: 600 }}>Mara Jensen</div><div style={{ fontSize: 12, color: "#999" }}>Drops &amp; Releases · 3h</div></div>
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: "#1A1A1A" }}>The black sweatshirt is finally here. Took us three sampling rounds to get the weight right. Worth it.</div>
                <div style={{ display: "flex", gap: 18, marginTop: 12, color: "#888", fontSize: 13 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconHeart />18</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconChat />4</span>
                </div>
              </Card>
            </>
          )}
          {activeFilter === "Wellness" && (
            <>
              <div style={{ padding: "4px 22px 14px", fontSize: 13, color: "#999" }}>From the Wellness space</div>
              {[
                { img: "13", initials: "DO", name: "Devon Okafor", time: "1h", space: "Wellness", body: "Cold water, no phone for the first hour. Three weeks in and I don't recognise my mornings anymore — in the best way.", likes: 41, replies: 12 },
                { img: "52", initials: "TS", name: "Theo Sand", time: "6h", space: "Wellness", body: "50 days of the morning ritual. Didn't miss one. The streak was never the point — it's what the streak represents.", likes: 88, replies: 21 },
                { img: "44", initials: "PV", name: "Priya Voss", time: "1d", space: "Wellness", body: "Walked instead of scrolled this morning. Ten minutes. Recommend.", likes: 34, replies: 7 },
              ].map((p) => (
                <Card key={p.name}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
                    <Avatar src={`https://i.pravatar.cc/160?img=${p.img}`} size={36} initials={p.initials} />
                    <div><div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 12, color: "#999" }}>{p.space} · {p.time}</div></div>
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.55, color: "#1A1A1A" }}>{p.body}</div>
                  <div style={{ display: "flex", gap: 18, marginTop: 12, color: "#888", fontSize: 13 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconHeart />{p.likes}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconChat />{p.replies}</span>
                  </div>
                </Card>
              ))}
            </>
          )}
          {activeFilter === "Style" && (
            <>
              <div style={{ padding: "4px 22px 14px", fontSize: 13, color: "#999" }}>From the Style space</div>
              {[
                { img: "32", initials: "SK", name: "Sam Kestrel", time: "2h", body: "The rule I keep coming back to: one thing at a time. One good piece, worn well, worn often.", likes: 52, replies: 9 },
                { img: "44", initials: "PV", name: "Priya Voss", time: "8h", body: "Grey melange sweat, dark trousers, white socks visible. Not for everyone but it's mine.", likes: 29, replies: 5 },
              ].map((p) => (
                <Card key={p.name}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
                    <Avatar src={`https://i.pravatar.cc/160?img=${p.img}`} size={36} initials={p.initials} />
                    <div><div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 12, color: "#999" }}>Style · {p.time}</div></div>
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.55, color: "#1A1A1A" }}>{p.body}</div>
                  <div style={{ display: "flex", gap: 18, marginTop: 12, color: "#888", fontSize: 13 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconHeart />{p.likes}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconChat />{p.replies}</span>
                  </div>
                </Card>
              ))}
            </>
          )}
        </div>
      )}

      {activeFilter === "Following" && <>
      {/* Featured post */}
      <div style={{ margin: "0 18px 16px", background: "#FFF", borderRadius: 24, overflow: "hidden", boxShadow: "0 6px 24px -10px rgba(0,0,0,0.18)" }}>
        <div onClick={onPost} className="wn-tap" style={{ position: "relative", aspectRatio: "4/5", background: "#E8E8E6" }}>
          <img src="https://picsum.photos/id/1/900/1130?grayscale" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" alt="" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.74), rgba(0,0,0,0.04) 52%, rgba(0,0,0,0.14))" }} />
          <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999 }}>The Studio</div>
          <div style={{ position: "absolute", left: 20, right: 20, bottom: 18, color: "#fff" }}>
            <div style={{ fontSize: 23, lineHeight: 1.22, letterSpacing: "-0.01em", fontWeight: 600 }}>Reworked the heavyweight tee pattern all morning. Pulled three seams nobody asked about.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 15 }}>
              <Avatar src="https://i.pravatar.cc/160?img=47" size={32} initials="MJ" />
              <div style={{ fontSize: 13, fontWeight: 600 }}>Mara Jensen</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>· 2h</div>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "13px 18px", color: "#888", fontSize: 13 }}>
          <span
            onClick={() => { setLikedPost((v) => !v); setLikeAnimKey((k) => k + 1); }}
            className="wn-tap"
            style={{ display: "flex", alignItems: "center", gap: 6, color: likedPost ? "#111" : "#888", fontWeight: likedPost ? 600 : 400, cursor: "pointer" }}
          >
            <span key={likeAnimKey} className={likeAnimKey > 0 ? "wn-pop" : ""} style={{ display: "flex" }}>
              <IconHeart color={likedPost ? "#111" : "#888"} filled={likedPost} />
            </span>
            {likedPost ? 25 : 24}
          </span>
          <span
            onClick={() => { setShowComments((v) => !v); setTimeout(() => commentInputRef.current?.focus(), 50); }}
            className="wn-tap"
            style={{ display: "flex", alignItems: "center", gap: 6, color: showComments ? "#111" : "#888", fontWeight: showComments ? 600 : 400, cursor: "pointer" }}
          >
            <IconChat color={showComments ? "#111" : "#888"} />{comments.length}
          </span>
          <span style={{ marginLeft: "auto", display: "flex" }}><IconShare /></span>
        </div>

        {/* Inline comments */}
        {showComments && (
          <div className="wn-screen" style={{ borderTop: "1px solid #F4F4F2" }}>
            {/* Existing comments */}
            <div style={{ padding: "14px 18px 0", display: "flex", flexDirection: "column", gap: 14 }}>
              {comments.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Avatar src={`https://i.pravatar.cc/160?img=${c.img}`} size={30} initials={c.initials} />
                  <div style={{ flex: 1, background: "#F6F6F4", borderRadius: "6px 16px 16px 16px", padding: "10px 13px" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 3 }}>{c.name} <span style={{ fontWeight: 400, color: "#AAA" }}>· {c.time}</span></div>
                    <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#1A1A1A" }}>{c.body}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px 16px" }}>
              <Avatar src="https://i.pravatar.cc/160?img=68" size={30} initials="JR" />
              <div style={{ flex: 1, background: "#F1F1EF", borderRadius: 20, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  ref={commentInputRef}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && commentInput.trim()) {
                      setComments((cs) => [...cs, { initials: "JR", img: "68", name: "Jordan Reeve", body: commentInput.trim(), time: "now" }]);
                      setCommentInput("");
                    }
                  }}
                  placeholder="Add a comment…"
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13.5, color: "#111", fontFamily: "inherit" }}
                />
                {commentInput.trim() && (
                  <div
                    onClick={() => { setComments((cs) => [...cs, { initials: "JR", img: "68", name: "Jordan Reeve", body: commentInput.trim(), time: "now" }]); setCommentInput(""); }}
                    style={{ width: 26, height: 26, borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, cursor: "pointer" }}
                  >↑</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Livestream card */}
      <div className="wn-tap" style={{ margin: "0 18px 16px", borderRadius: 24, overflow: "hidden", position: "relative", boxShadow: "0 6px 24px -10px rgba(0,0,0,0.25)" }}>
        <div style={{ position: "relative", aspectRatio: "16/9", background: "#111" }}>
          <img src="https://picsum.photos/id/1043/900/506?grayscale" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.6 }} loading="lazy" alt="" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1) 60%)" }} />
          {/* Live badge */}
          <div style={{ position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ background: "#E8203A", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "4px 10px", borderRadius: 999, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "wnblink 1.4s ease infinite" }} />
              LIVE
            </div>
            <div style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", color: "#fff", fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 999 }}>142 watching</div>
          </div>
          <div style={{ position: "absolute", left: 18, right: 18, bottom: 16, color: "#fff" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>Livestream · The Studio</div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>Behind the collection: cutting the new season</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
              <Avatar src="https://i.pravatar.cc/160?img=47" size={28} initials="MJ" />
              <div style={{ fontSize: 13, fontWeight: 600 }}>Mara Jensen</div>
            </div>
          </div>
        </div>
        <div style={{ background: "#111", padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Started 8 min ago</div>
          <div style={{ background: "#fff", color: "#111", borderRadius: 999, padding: "8px 18px", fontSize: 13, fontWeight: 700 }}>Join live</div>
        </div>
      </div>

      {/* Event RSVP */}
      <Card>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", marginBottom: 13 }}>Event · Wellness</div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0, width: 50 }}>
            <div style={{ background: "#111", borderRadius: "12px 12px 0 0", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textAlign: "center", padding: "4px 0" }}>SAT</div>
            <div style={{ border: "1px solid #EAEAE8", borderTop: "none", borderRadius: "0 0 12px 12px", fontSize: 20, fontWeight: 700, textAlign: "center", padding: "5px 0", letterSpacing: "-0.02em" }}>28</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>Cold-water swim</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 3, lineHeight: 1.4 }}>7:00am · Clevedon Marine Lake</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
              <div style={{ display: "flex" }}>
                {[13, 52, 47].map((n, i) => (
                  <div key={n} style={{ width: 26, height: 26, borderRadius: "50%", overflow: "hidden", background: "#999", border: "2px solid #fff", marginLeft: i > 0 ? -9 : 0, flexShrink: 0 }}>
                    <img src={`https://i.pravatar.cc/160?img=${n}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(1)" }} alt="" />
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 12.5, color: "#666" }}>{rsvpDone ? "24" : "23"} going</span>
            </div>
          </div>
        </div>
        <div onClick={onRsvp} className="wn-tap" style={{ marginTop: 15, textAlign: "center", padding: 12, borderRadius: 14, border: "1.5px solid #111", background: rsvpDone ? "#111" : "transparent", color: rsvpDone ? "#fff" : "#111", fontSize: 14, fontWeight: 600 }}>
          {rsvpDone ? "I'm going ✓" : "RSVP"}
        </div>
      </Card>

      {/* Dark quote */}
      <div style={{ margin: "0 18px 14px", background: "#111", borderRadius: 24, padding: "22px 20px", boxShadow: "0 6px 22px -12px rgba(0,0,0,0.3)" }}>
        <div style={{ fontStyle: "italic", fontSize: 21, lineHeight: 1.4, color: "#fff", letterSpacing: "-0.005em" }}>"Cold water, no phone for the first hour. Three weeks in and I don't recognise my mornings — in the best way."</div>
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 18 }}>
          <Avatar src="https://i.pravatar.cc/160?img=13" size={34} initials="DO" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#fff" }}>Devon Okafor</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>Wellness · 5h</div>
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.65)", fontSize: 13 }}><IconHeart color="rgba(255,255,255,0.65)" />41</span>
        </div>
      </div>

      {/* Poll */}
      <Card>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>Poll · The Studio</div>
        <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.35 }}>Next hoodie — which weight should we run?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          {([{ key: "mid", label: "Midweight · 320gsm", pct: 62 }, { key: "heavy", label: "Heavyweight · 440gsm", pct: 38 }] as const).map(({ key, label, pct }) => (
            <div key={key} onClick={onVote} className="wn-tap" style={{ position: "relative", border: `1.5px solid ${voted ? "#111" : "#E4E4E1"}`, borderRadius: 13, overflow: "hidden" }}>
              {voted && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: "#F0F0EE", width: `${pct}%`, animation: "wnbar 0.7s cubic-bezier(.4,0,.2,1) both" }} />}
              <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 15px", fontSize: 14, fontWeight: voted ? 600 : 400 }}>
                <span>{label}</span>
                {voted && <span>{pct}%</span>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#AAA", marginTop: 13 }}>{voted ? "1,204 votes · closed" : "1,204 members can vote"}</div>
      </Card>

      {/* Product drop */}
      <div className="wn-tap" style={{ margin: "0 18px 14px", background: "#FFF", borderRadius: 24, overflow: "hidden", boxShadow: "0 6px 24px -10px rgba(0,0,0,0.18)" }}>
        <div style={{ position: "relative", aspectRatio: "4/3", background: "#E8E8E6" }}>
          <img src="https://wellnice.com/cdn/shop/files/Grey-Sweat_Front.jpg?v=1776693891&width=900" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt="Grey Melange Sweatshirt" />
          <div style={{ position: "absolute", top: 16, left: 16, background: "#111", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 999 }}>New drop</div>
        </div>
        <div style={{ padding: "16px 17px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>Grey Melange Sweatshirt</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 2 }}>£35.00 · Just landed in Drops</div>
          </div>
          <div style={{ background: "#111", color: "#fff", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>Shop</div>
        </div>
      </div>

      {/* Milestone */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 14, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M12 3 L13.7 9.4 L20 12 L13.7 14.6 L12 21 L10.3 14.6 L4 12 L10.3 9.4 Z" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, lineHeight: 1.45, color: "#1A1A1A" }}><b style={{ fontWeight: 600 }}>Theo Sand</b> reached a 50-day streak.</div>
            <div style={{ fontSize: 12.5, color: "#999", marginTop: 2 }}>Celebrate the consistency</div>
          </div>
          <div className="wn-tap" style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, border: "1px solid #111", borderRadius: 999, padding: "8px 14px", fontSize: 12.5, fontWeight: 600 }}>
            <IconHeart color="#111" />Nice
          </div>
        </div>
      </Card>

      {/* Compose FAB */}
      <div onClick={onCompose} className="wn-tap" style={{ position: "sticky", bottom: 16, margin: "0 18px 16px", background: "#FFF", color: "#111", border: "1.5px solid #111", borderRadius: 999, padding: "14px 22px", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.14)" }}>
        <IconPlus />New post
      </div>
      </>}
    </div>
  );
}

function SpacesScreen({ onSpaceDetail, onSearch }: { onSpaceDetail: () => void; onSearch: () => void }) {
  const spaces = [
    { name: "Drops & Releases", members: "3,488", img: "https://picsum.photos/id/1015/300/300?grayscale", joined: true },
    { name: "Style", members: "2,012", img: "https://picsum.photos/id/1016/300/300?grayscale", joined: true },
    { name: "Wellness", members: "1,567", img: null, initial: "W", joined: false },
    { name: "Movement", members: "884", img: null, initial: "M", joined: false },
    { name: "Introductions", members: "940", img: null, initial: "I", joined: true },
  ];
  return (
    <div className="wn-screen" style={{ paddingBottom: 20 }}>
      <div style={{ padding: "10px 22px 14px" }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1 }}>Spaces</div>
        <div style={{ fontSize: 14, color: "#666", marginTop: 7 }}>Seven rooms. One studio.</div>
      </div>
      <div onClick={onSearch} className="wn-tap" style={{ margin: "0 18px 16px", background: "#FFF", borderRadius: 999, padding: "13px 18px", fontSize: 14, color: "#999", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
        <IconSearch />Search spaces
      </div>
      <div onClick={onSpaceDetail} className="wn-tap" style={{ margin: "0 18px 14px", background: "#FFF", borderRadius: 22, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ position: "relative", aspectRatio: "16/9", background: "#F5F5F5" }}>
          <img src="https://picsum.photos/id/48/900/506?grayscale" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" alt="" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 55%)" }} />
          <div style={{ position: "absolute", left: 16, bottom: 14, color: "#FFF" }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>The Studio</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>1,204 members · active now</div>
          </div>
        </div>
      </div>
      {spaces.map((s) => (
        <div key={s.name} onClick={onSpaceDetail} className="wn-tap" style={{ display: "flex", alignItems: "center", gap: 13, margin: "0 18px 12px", background: "#FFF", borderRadius: 18, padding: "12px 14px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
          <div style={{ width: 50, height: 50, borderRadius: 13, overflow: "hidden", background: "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 600, color: "#666", flexShrink: 0 }}>
            {s.img ? <img src={s.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" alt="" /> : s.initial}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{s.name}</div>
            <div style={{ fontSize: 12.5, color: "#999", marginTop: 2 }}>{s.members} members</div>
          </div>
          <div style={{ background: s.joined ? "transparent" : "#111", color: s.joined ? "#111" : "#FFF", border: s.joined ? "1px solid #111" : "none", borderRadius: 999, padding: "7px 15px", fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>
            {s.joined ? "Joined" : "Join"}
          </div>
        </div>
      ))}
    </div>
  );
}

const ALL_MEMBERS = [
  { initials: "MJ", name: "Mara Jensen", bio: "Pattern cutter, Bristol", img: "47", posts: 34, followers: 210 },
  { initials: "TS", name: "Theo Sand", bio: "Textile designer", img: "52", posts: 21, followers: 158 },
  { initials: "DO", name: "Devon Okafor", bio: "Wellness · Movement", img: "13", posts: 18, followers: 94 },
  { initials: "JR", name: "Jordan Reeve", bio: "Designer, Bristol", img: "68", posts: 48, followers: 312, isMe: true },
  { initials: "SK", name: "Sam Kestrel", bio: "Maker, London", img: "32", posts: 9, followers: 67 },
  { initials: "PV", name: "Priya Voss", bio: "Sustainable fashion", img: "44", posts: 15, followers: 88 },
];

function MembersTab() {
  const [following, setFollowing] = useState<Record<string, boolean>>({ "Mara Jensen": true, "Devon Okafor": true });
  const toggle = (name: string) => setFollowing((f) => ({ ...f, [name]: !f[name] }));

  return (
    <div style={{ padding: "14px 18px" }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA", marginBottom: 14 }}>New this week</div>
      {ALL_MEMBERS.map((m) => {
        const isFollowing = !!following[m.name];
        return (
          <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 16 }}>
            <Avatar src={`https://i.pravatar.cc/160?img=${m.img}`} initials={m.initials} size={46} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{m.name}{m.isMe && <span style={{ fontSize: 11, color: "#AAA", fontWeight: 400, marginLeft: 6 }}>· you</span>}</div>
              <div style={{ fontSize: 13, color: "#999", marginTop: 1 }}>{m.bio}</div>
              <div style={{ fontSize: 12, color: "#BBB", marginTop: 3 }}>{m.posts} posts · {m.followers} followers</div>
            </div>
            {!m.isMe && (
              <div onClick={() => toggle(m.name)} className="wn-tap"
                style={{ border: `1.5px solid ${isFollowing ? "#111" : "#E4E4E1"}`, background: isFollowing ? "#111" : "transparent", color: isFollowing ? "#FFF" : "#555", borderRadius: 999, padding: "7px 14px", fontSize: 12.5, fontWeight: 600, flexShrink: 0, cursor: "pointer", transition: "all 0.15s" }}>
                {isFollowing ? "Following" : "Connect"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SpaceDetailScreen({ onBack, onNotifications }: { onBack: () => void; onNotifications: () => void }) {
  const [tab, setTab] = useState<"posts" | "courses" | "members" | "events" | "pages">("posts");
  const [joined, setJoined] = useState(true);
  const [lessonDone, setLessonDone] = useState<Record<number, boolean>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeKeys, setLikeKeys] = useState<Record<string, number>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [postComments, setPostComments] = useState<Record<string, { img: string; name: string; body: string; time: string }[]>>({
    "MJ": [{ img: "13", name: "Devon Okafor", body: "Three seams nobody asked about is exactly the kind of thing that makes the difference.", time: "1h" }],
    "JR": [],
  });

  const toggleLike = (key: string) => {
    setLikedPosts((l) => ({ ...l, [key]: !l[key] }));
    setLikeKeys((k) => ({ ...k, [key]: (k[key] || 0) + 1 }));
  };

  const sendComment = (key: string) => {
    const text = (commentInputs[key] || "").trim();
    if (!text) return;
    setPostComments((c) => ({ ...c, [key]: [...(c[key] || []), { img: "68", name: "Jordan Reeve", body: text, time: "now" }] }));
    setCommentInputs((c) => ({ ...c, [key]: "" }));
  };

  const courses = [
    {
      id: 1, title: "Making things well", lessons: [
        { id: 1, title: "Why craft still matters", duration: "8 min", free: true },
        { id: 2, title: "The seam that changed everything", duration: "12 min", free: true },
        { id: 3, title: "Material honesty", duration: "10 min", free: false },
        { id: 4, title: "Slow production, fast thinking", duration: "15 min", free: false },
      ]
    },
  ];

  const spaceEvents = [
    { day: "WED", date: "2", month: "Jul", title: "Studio open day", time: "11am – 4pm", location: "Well Nice HQ", going: 61 },
    { day: "THU", date: "10", month: "Jul", title: "Member Q&A", time: "7:00pm · Online", location: "Zoom", going: 112 },
  ];

  const tabs: { key: typeof tab; label: string }[] = [
    { key: "posts", label: "Posts" },
    { key: "courses", label: "Courses" },
    { key: "events", label: "Events" },
    { key: "members", label: "Members" },
    { key: "pages", label: "Pages" },
  ];

  return (
    <div className="wn-screen">
      <div style={{ position: "relative", aspectRatio: "5/3", background: "#F5F5F5" }}>
        <img src="https://picsum.photos/id/48/1000/600?grayscale" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" alt="" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 60%)" }} />
        <div onClick={onBack} className="wn-tap" style={{ position: "absolute", top: 14, left: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <IconBack />
        </div>
        <div style={{ position: "absolute", left: 20, bottom: 16, color: "#fff" }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em" }}>The Studio</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>1,204 members · active now</div>
        </div>
      </div>

      <div style={{ padding: "16px 18px 0" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div onClick={() => setJoined(v => !v)} className="wn-tap" style={{ flex: 1, background: joined ? "#111" : "transparent", color: joined ? "#fff" : "#111", textAlign: "center", padding: 12, borderRadius: 14, fontSize: 14, fontWeight: 600, border: joined ? "none" : "1.5px solid #111", transition: "all 0.18s ease", cursor: "pointer" }}>{joined ? "Joined ✓" : "Join"}</div>
          <div onClick={onNotifications} className="wn-tap" style={{ width: 46, height: 46, borderRadius: 14, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><IconBell dot /></div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.55, color: "#555", marginTop: 15 }}>Behind the seams of everything we make. Patterns, fabric trials, and the occasional honest mistake.</div>

        {/* Scrollable tab bar */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E4E4E1", marginTop: 16, overflowX: "auto" }}>
          {tabs.map(({ key, label }) => (
            <div key={key} onClick={() => setTab(key)} style={{ padding: "11px 16px 11px 0", fontSize: 14, fontWeight: tab === key ? 600 : 400, color: tab === key ? "#111" : "#999", borderBottom: tab === key ? "2px solid #111" : "2px solid transparent", marginBottom: -1, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{label}</div>
          ))}
        </div>
      </div>

      {/* Posts */}
      {tab === "posts" && (
        <div>
          {[
            { key: "MJ", initials: "MJ", img: "47", name: "Mara Jensen", time: "2h", body: "Reworked the heavyweight tee pattern all morning. Pulled three seams nobody asked about.", likes: 24 },
            { key: "JR", initials: "JR", img: "68", name: "Jordan Reeve", time: "1d", body: "The new label stock arrived. Uncoated, heavier than last time. Small thing, makes the whole box feel considered.", likes: 62 },
          ].map((p) => {
            const liked = !!likedPosts[p.key];
            const likeKey = likeKeys[p.key] || 0;
            const showCmts = !!openComments[p.key];
            const cmts = postComments[p.key] || [];
            return (
              <div key={p.key} style={{ margin: "14px 18px", background: "#FFF", borderRadius: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                <div style={{ padding: "17px 17px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13 }}>
                    <Avatar src={`https://i.pravatar.cc/160?img=${p.img}`} initials={p.initials} size={38} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#999", marginTop: 1 }}>The Studio · {p.time}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.55, color: "#1A1A1A" }}>{p.body}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 13, color: "#888", fontSize: 13 }}>
                    <span onClick={() => toggleLike(p.key)} className="wn-tap"
                      style={{ display: "flex", alignItems: "center", gap: 6, color: liked ? "#111" : "#888", fontWeight: liked ? 600 : 400, cursor: "pointer" }}>
                      <span key={likeKey} className={likeKey > 0 ? "wn-pop" : ""} style={{ display: "flex" }}>
                        <IconHeart color={liked ? "#111" : "#888"} filled={liked} />
                      </span>
                      {liked ? p.likes + 1 : p.likes}
                    </span>
                    <span onClick={() => setOpenComments((c) => ({ ...c, [p.key]: !c[p.key] }))} className="wn-tap"
                      style={{ display: "flex", alignItems: "center", gap: 6, color: showCmts ? "#111" : "#888", fontWeight: showCmts ? 600 : 400, cursor: "pointer" }}>
                      <IconChat color={showCmts ? "#111" : "#888"} />{cmts.length}
                    </span>
                    <span style={{ marginLeft: "auto", display: "flex" }}><IconShare /></span>
                  </div>
                </div>

                {/* Inline comments */}
                {showCmts && (
                  <div style={{ borderTop: "1px solid #F4F4F2" }}>
                    <div style={{ padding: "12px 17px 0", display: "flex", flexDirection: "column", gap: 12 }}>
                      {cmts.length === 0 && <div style={{ fontSize: 13, color: "#CCC", paddingBottom: 4 }}>No comments yet.</div>}
                      {cmts.map((c, i) => (
                        <div key={i} style={{ display: "flex", gap: 9 }}>
                          <Avatar src={`https://i.pravatar.cc/160?img=${c.img}`} size={28} initials={c.name[0]} />
                          <div style={{ flex: 1, background: "#F6F6F4", borderRadius: "6px 16px 16px 16px", padding: "9px 12px" }}>
                            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{c.name} <span style={{ fontWeight: 400, color: "#AAA" }}>· {c.time}</span></div>
                            <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#1A1A1A" }}>{c.body}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 17px 14px" }}>
                      <Avatar src="https://i.pravatar.cc/160?img=68" size={28} initials="JR" />
                      <div style={{ flex: 1, background: "#F1F1EF", borderRadius: 18, padding: "9px 13px", display: "flex", alignItems: "center", gap: 8 }}>
                        <input value={commentInputs[p.key] || ""} onChange={(e) => setCommentInputs((c) => ({ ...c, [p.key]: e.target.value }))}
                          onKeyDown={(e) => e.key === "Enter" && sendComment(p.key)}
                          placeholder="Add a comment…"
                          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13.5, color: "#111", fontFamily: "inherit" }} />
                        {(commentInputs[p.key] || "").trim() && (
                          <div onClick={() => sendComment(p.key)}
                            style={{ width: 24, height: 24, borderRadius: "50%", background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, cursor: "pointer" }}>↑</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Courses */}
      {tab === "courses" && (
        <div style={{ padding: "18px 18px 24px" }}>
          {courses.map((course) => {
            const completed = course.lessons.filter((l) => lessonDone[l.id]).length;
            const pct = Math.round((completed / course.lessons.length) * 100);
            return (
              <div key={course.id}>
                <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 }}>{course.title}</div>
                <div style={{ fontSize: 13, color: "#999", marginBottom: 4 }}>{course.lessons.length} lessons · {completed} completed</div>
                {/* Progress bar */}
                <div style={{ height: 4, background: "#EAEAE8", borderRadius: 2, marginBottom: 18, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: "#111", borderRadius: 2, transition: "width 0.4s ease" }} />
                </div>
                {course.lessons.map((lesson, i) => {
                  const done = !!lessonDone[lesson.id];
                  const locked = !lesson.free && i > 1;
                  return (
                    <div key={lesson.id} onClick={() => !locked && setLessonDone((d) => ({ ...d, [lesson.id]: !d[lesson.id] }))}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < course.lessons.length - 1 ? "1px solid #EAEAE8" : "none", opacity: locked ? 0.45 : 1, cursor: locked ? "default" : "pointer" }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", background: done ? "#111" : "#F0F0EE", border: done ? "none" : "1.5px solid #DDD", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {done ? <IconCheck color="#fff" /> : locked
                          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round"/></svg>
                          : <span style={{ fontSize: 13, fontWeight: 700, color: "#999" }}>{i + 1}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: "-0.01em" }}>{lesson.title}</div>
                        <div style={{ fontSize: 12, color: "#AAA", marginTop: 2 }}>{lesson.duration}{lesson.free ? " · Free" : ""}</div>
                      </div>
                      {!locked && !done && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4V8z" fill="#CCC" stroke="none"/></svg>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* Events */}
      {tab === "events" && (
        <div style={{ padding: "14px 18px 24px" }}>
          {spaceEvents.map((e) => (
            <div key={e.title} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #EAEAE8" }}>
              <div style={{ flexShrink: 0, width: 48, textAlign: "center" }}>
                <div style={{ background: "#111", borderRadius: "8px 8px 0 0", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", padding: "3px 0" }}>{e.day}</div>
                <div style={{ border: "1px solid #EAEAE8", borderTop: "none", borderRadius: "0 0 8px 8px", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", padding: "3px 0", lineHeight: 1.1 }}>{e.date}</div>
                <div style={{ fontSize: 10, color: "#AAA", marginTop: 2 }}>{e.month}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{e.title}</div>
                <div style={{ fontSize: 13, color: "#999", marginTop: 3 }}>{e.time}</div>
                <div style={{ fontSize: 13, color: "#999" }}>{e.location}</div>
                <div style={{ fontSize: 12.5, color: "#666", marginTop: 8 }}>{e.going} going</div>
              </div>
              <div style={{ flexShrink: 0, alignSelf: "center", border: "1px solid #111", borderRadius: 999, padding: "7px 14px", fontSize: 13, fontWeight: 600 }}>RSVP</div>
            </div>
          ))}
        </div>
      )}

      {/* Members */}
      {tab === "members" && (
        <MembersTab />
      )}

      {/* Pages */}
      {tab === "pages" && (
        <div style={{ padding: "18px 18px 24px" }}>
          {[
            { title: "Welcome to The Studio", body: "This is the place for everything behind the seams — patterns, material decisions, and the honest process of making things worth wearing." },
            { title: "How we make things", body: "Every piece starts with a problem worth solving. We don't add features; we remove them. The garment is done when there's nothing left to take away." },
            { title: "Recommended materials", body: "Deadstock cotton from Offset Warehouse. 100% organic wherever possible. We list our full supplier chain in the About page on the main site." },
          ].map((page) => (
            <div key={page.title} className="wn-tap" style={{ background: "#FFF", borderRadius: 18, padding: "16px 18px", marginBottom: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 6 }}>{page.title}</div>
              <div style={{ fontSize: 13.5, color: "#555", lineHeight: 1.55 }}>{page.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type ChatMessage = { role: "concierge" | "user"; body: string; products?: { img: string; name: string; price: string }[] };
type ChatThread = { id: number; title: string; preview: string; time: string; messages: ChatMessage[] };

const CHAT_HISTORY: ChatThread[] = [
  {
    id: 1,
    title: "Dinner outfit",
    preview: "Keep the tee — it does the heavy lifting…",
    time: "Today",
    messages: [
      { role: "concierge", body: "Morning. What are we sorting out today — what to wear, what to read, or where to start?" },
      { role: "user", body: "Dinner tonight, smart but relaxed. I've got the black heavyweight tee." },
      { role: "concierge", body: "Keep the tee — it does the heavy lifting. Layer the grey melange sweatshirt over it, sleeves pushed back. Dark trousers, clean trainers. Smart comes from the fit being right, not from adding more.", products: [
        { img: "https://wellnice.com/cdn/shop/files/Grey-Sweat_Front.jpg?v=1776693891&width=400", name: "Grey melange sweat", price: "£35.00" },
        { img: "https://wellnice.com/cdn/shop/files/Black-Tee_Front.jpg?v=1776693892&width=400", name: "Heavyweight tee", price: "£20.00" },
      ]},
    ],
  },
  {
    id: 2,
    title: "Morning routine",
    preview: "Cold water is the simplest reset there is…",
    time: "Yesterday",
    messages: [
      { role: "concierge", body: "Morning. What are we sorting out today?" },
      { role: "user", body: "I want to build a better morning routine. Where do I start?" },
      { role: "concierge", body: "Cold water is the simplest reset there is. No phone for the first hour, then something physical — even ten minutes. The rest sorts itself out once you've protected those first sixty minutes." },
    ],
  },
  {
    id: 3,
    title: "What to read",
    preview: "The Making of the Atomic Bomb is the long one…",
    time: "Mon",
    messages: [
      { role: "concierge", body: "What kind of read are you after — something to lose yourself in, or something to sharpen your thinking?" },
      { role: "user", body: "Both if possible. Non-fiction." },
      { role: "concierge", body: "The Making of the Atomic Bomb is the long one — worth every page. For something shorter, try Shop Class as Soulcraft. It's about making things with your hands, which feels right for this community." },
    ],
  },
  {
    id: 4,
    title: "Running plan",
    preview: "Start slower than you think you need to…",
    time: "Last week",
    messages: [
      { role: "concierge", body: "Running from scratch or picking it back up?" },
      { role: "user", body: "From scratch. I've never really run." },
      { role: "concierge", body: "Start slower than you think you need to. Three times a week, twenty minutes, and the goal is just to finish — not to push. After four weeks you'll be surprised how quickly it stops being hard." },
    ],
  },
];

function ConciergeChat({ thread, onBack }: { thread: ChatThread | null; onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(thread?.messages ?? [
    { role: "concierge", body: "Morning. What are we sorting out today — what to wear, what to read, or where to start?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", body: text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "concierge", body: "Give me a moment to think about that…" }]);
    }, 800);
  };

  return (
    <div className="wn-screen" style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ flexShrink: 0, height: 62, padding: "0 18px", display: "flex", flexDirection: "row", alignItems: "center", gap: 12, background: "#FFFFFF", borderBottom: "1px solid #EAEAE8" }}>
        <div onClick={onBack} className="wn-tap" style={{ flexShrink: 0, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconBack />
        </div>
        <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: "50%", background: "#111", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>c</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>{thread?.title ?? "New conversation"}</div>
          <div style={{ fontSize: 11.5, color: "#999", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#111", display: "inline-block", flexShrink: 0 }} />
            concierge · here to help
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "18px 18px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ textAlign: "center", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#BBB", marginBottom: 4 }}>{thread?.time ?? "Today"}</div>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: 8 }}>
            {msg.role === "concierge" ? (
              <div style={{ maxWidth: "88%", background: "#FFF", padding: "13px 16px", borderRadius: "6px 20px 20px 20px", fontSize: 14.5, lineHeight: 1.6, color: "#1A1A1A", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
                {msg.body}
              </div>
            ) : (
              <div style={{ maxWidth: "82%", background: "#111", color: "#FFF", padding: "13px 16px", borderRadius: "20px 20px 6px 20px", fontSize: 14.5, lineHeight: 1.55 }}>
                {msg.body}
              </div>
            )}
            {msg.products && (
              <div style={{ display: "flex", gap: 10, width: "88%" }}>
                {msg.products.map((p) => (
                  <div key={p.name} style={{ flex: 1, background: "#FFF", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
                    <div style={{ aspectRatio: "1/1", background: "#EAEAE8" }}>
                      <ImageWithFallback src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.01em" }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ flexShrink: 0, background: "#FFFFFF", borderTop: "1px solid #EAEAE8" }}>
        <div style={{ display: "flex", gap: 8, padding: "12px 18px 10px", overflowX: "auto" }}>
          {["Help me start running", "Recommend a read", "What to watch"].map((s) => (
            <div key={s} onClick={() => { setInput(s); inputRef.current?.focus(); }} style={{ background: "#F1F1EF", color: "#444", padding: "8px 15px", borderRadius: 999, fontSize: 12.5, whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer" }}>{s}</div>
          ))}
        </div>
        <div style={{ padding: "0 18px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message concierge"
            style={{ flex: 1, background: "#F1F1EF", border: "none", borderRadius: 22, padding: "13px 18px", fontSize: 14, color: "#111", outline: "none", fontFamily: "inherit" }} />
          <div onClick={send} style={{ width: 44, height: 44, borderRadius: "50%", background: input.trim() ? "#111" : "#DDD", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, transition: "background 0.2s", cursor: "pointer" }}>↑</div>
        </div>
        <div style={{ height: 22, position: "relative" }}>
          <div style={{ position: "absolute", bottom: 9, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, borderRadius: 3, background: "#111" }} />
        </div>
      </div>
    </div>
  );
}

function NiceScreen() {
  const [openThread, setOpenThread] = useState<ChatThread | null | "new">(null);

  if (openThread !== null) {
    return <ConciergeChat thread={openThread === "new" ? null : openThread} onBack={() => setOpenThread(null)} />;
  }

  return (
    <div className="wn-screen" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ flexShrink: 0, padding: "10px 22px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1 }}>Concierge</div>
            <div style={{ fontSize: 14, color: "#666", marginTop: 6 }}>Your personal taste-maker.</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#111", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>c</div>
        </div>
      </div>

      <div onClick={() => setOpenThread("new")} className="wn-tap"
        style={{ margin: "0 18px 20px", background: "#111", borderRadius: 22, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#FFF" }}>New conversation</div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>What to wear, read, do, or make.</div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }}>›</div>
      </div>

      <div style={{ padding: "0 22px 12px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAA" }}>Recent conversations</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
        {CHAT_HISTORY.map((thread, i) => (
          <div key={thread.id} onClick={() => setOpenThread(thread)} className="wn-tap"
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 22px", borderBottom: i < CHAT_HISTORY.length - 1 ? "1px solid #EAEAE8" : "none" }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: "#F0F0EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                <path d="M21 11.5a8.4 8.4 0 0 1-11.6 7.8L4 20.5l1.3-4.3A8.4 8.4 0 1 1 21 11.5z" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{thread.title}</div>
                <div style={{ fontSize: 12, color: "#AAA", flexShrink: 0 }}>{thread.time}</div>
              </div>
              <div style={{ fontSize: 13, color: "#999", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{thread.preview}</div>
            </div>
            <div style={{ color: "#CCC", fontSize: 18 }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditProfileScreen({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState({
    firstName: "Jordan",
    lastName: "Reeve",
    username: "jordanreeve",
    location: "Bristol",
    bio: "Designer. Trying to make things worth sharing. Big believer in clarity over complexity.",
    website: "",
  });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); onBack(); }, 900);
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%", background: "#FFF", border: "1.5px solid #E8E8E6",
    borderRadius: 14, padding: "14px 16px", fontSize: 15, color: "#111",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };

  const Label = ({ children }: { children: string }) => (
    <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#AAA", marginBottom: 8 }}>{children}</div>
  );

  return (
    <div className="wn-screen" style={{ paddingBottom: 32 }}>
      {/* Header */}
      <div style={{ height: 62, padding: "0 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #EAEAE8", background: "#FFF" }}>
        <div onClick={onBack} className="wn-tap" style={{ fontSize: 15, fontWeight: 500, color: "#666", cursor: "pointer" }}>Cancel</div>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>Edit profile</div>
        <div onClick={handleSave} className="wn-tap"
          style={{ background: saved ? "#4CAF50" : "#111", color: "#FFF", borderRadius: 999, padding: "8px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}>
          {saved ? "Saved ✓" : "Save"}
        </div>
      </div>

      {/* Avatar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 18px 24px", borderBottom: "1px solid #EAEAE8" }}>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", background: "#F0F0F0" }}>
            <img src="https://i.pravatar.cc/160?img=68" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)" }} alt="" />
          </div>
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: "#111", border: "2px solid #EFEFED", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111", cursor: "pointer" }}>Change photo</div>
        <div style={{ fontSize: 12.5, color: "#AAA", marginTop: 3 }}>or remove</div>
      </div>

      {/* Fields */}
      <div style={{ padding: "24px 18px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Name row */}
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <Label>First name</Label>
            <input value={form.firstName} onChange={set("firstName")} style={fieldStyle} placeholder="First name" />
          </div>
          <div style={{ flex: 1 }}>
            <Label>Last name</Label>
            <input value={form.lastName} onChange={set("lastName")} style={fieldStyle} placeholder="Last name" />
          </div>
        </div>

        {/* Username */}
        <div>
          <Label>Username</Label>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#AAA", pointerEvents: "none" }}>@</div>
            <input value={form.username} onChange={set("username")} style={{ ...fieldStyle, paddingLeft: 30 }} placeholder="username" />
          </div>
        </div>

        {/* Location */}
        <div>
          <Label>Location</Label>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="1.8">
                <path d="M12 21s-7-6.6-7-11a7 7 0 1 1 14 0c0 4.4-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <input value={form.location} onChange={set("location")} style={{ ...fieldStyle, paddingLeft: 36 }} placeholder="City, Country" />
          </div>
        </div>

        {/* Bio */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <Label>Bio</Label>
            <div style={{ fontSize: 11.5, color: form.bio.length > 150 ? "#E8203A" : "#CCC" }}>{form.bio.length} / 160</div>
          </div>
          <textarea value={form.bio} onChange={set("bio")} rows={4} maxLength={160}
            style={{ ...fieldStyle, resize: "none", lineHeight: 1.6 } as any}
            placeholder="Tell the club a little about you." />
        </div>

        {/* Website */}
        <div>
          <Label>Website</Label>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" strokeLinecap="round" />
              </svg>
            </div>
            <input value={form.website} onChange={set("website")} style={{ ...fieldStyle, paddingLeft: 36 }} placeholder="yoursite.com" type="url" />
          </div>
        </div>

        {/* Danger zone */}
        <div style={{ marginTop: 8, paddingTop: 20, borderTop: "1px solid #EAEAE8" }}>
          <div style={{ fontSize: 13, color: "#E8203A", fontWeight: 600, cursor: "pointer" }}>Delete account</div>
          <div style={{ fontSize: 12.5, color: "#AAA", marginTop: 4 }}>This can't be undone.</div>
        </div>

      </div>
    </div>
  );
}

function ProfileScreen({ onEditProfile }: { onEditProfile: () => void }) {
  const [tab, setTab] = useState<"posts" | "activity" | "recognitions" | "leaderboard" | "spaces">("posts");
  const [recognized, setRecognized] = useState(false);

  const streakDays = [
    { label: "M", done: true }, { label: "T", done: true }, { label: "W", done: true },
    { label: "T", done: true }, { label: "F", done: false }, { label: "S", done: false }, { label: "S", done: false },
  ];

  const leaderboard = [
    { rank: 1, name: "Mara Jensen", img: "47", points: 2840, badge: "Maker" },
    { rank: 2, name: "Theo Sand", img: "52", points: 2610, badge: "Consistent" },
    { rank: 3, name: "Devon Okafor", img: "13", points: 2205, badge: "Welcoming" },
    { rank: 4, name: "Jordan Reeve", img: "68", points: 1920, badge: "Creative", isMe: true },
    { rank: 5, name: "Sam Kestrel", img: "32", points: 1740, badge: "Curious" },
    { rank: 6, name: "Priya Voss", img: "44", points: 1580, badge: "Thoughtful" },
  ];

  const recognitions = [
    { from: "Mara Jensen", img: "47", badge: "Creative", note: "Recognised you for your post about label stock.", time: "2h" },
    { from: "Devon Okafor", img: "13", badge: "Thoughtful", note: "Appreciated your reply in the Wellness space.", time: "1d" },
    { from: "Theo Sand", img: "52", badge: "Consistent", note: "Acknowledged your 7-day streak.", time: "3d" },
  ];

  const tabs: { key: typeof tab; label: string }[] = [
    { key: "posts", label: "Posts" },
    { key: "activity", label: "Activity" },
    { key: "recognitions", label: "Badges" },
    { key: "leaderboard", label: "Leaderboard" },
    { key: "spaces", label: "Spaces" },
  ];

  return (
    <div className="wn-screen" style={{ paddingBottom: 20 }}>
      <div style={{ padding: "8px 18px 0" }}>

        {/* Profile card */}
        <div style={{ background: "#FFF", borderRadius: 24, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Avatar src="https://i.pravatar.cc/160?img=68" size={72} initials="JR" />
            <div onClick={onEditProfile} className="wn-tap" style={{ background: "#111", color: "#FFF", borderRadius: 999, padding: "9px 18px", fontSize: 13, fontWeight: 600, marginTop: 6, cursor: "pointer" }}>Edit profile</div>
          </div>
          <div style={{ marginTop: 15 }}>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>Jordan Reeve</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 3 }}>@jordanreeve · Bristol</div>
          </div>
          <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "#444", marginTop: 12 }}>Designer. Trying to make things worth sharing. Big believer in clarity over complexity.</div>
          <div style={{ display: "flex", gap: 0, marginTop: 20, borderTop: "1px solid #F0F0EE", paddingTop: 16 }}>
            {[["48", "Posts"], ["312", "Followers"], ["28", "Following"], ["6", "Spaces"]].map(([n, l], i) => (
              <div key={l} style={{ flex: 1, textAlign: "center", borderLeft: i > 0 ? "1px solid #F0F0EE" : "none" }}>
                <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em" }}>{n}</div>
                <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak calendar */}
        <div style={{ background: "#FFF", borderRadius: 20, padding: "16px 18px", marginTop: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Daily streak</div>
            <div style={{ fontSize: 12, color: "#999" }}>4 / 7 this week</div>
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "space-between" }}>
            {streakDays.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <div style={{ fontSize: 10, color: "#AAA", fontWeight: 500 }}>{d.label}</div>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: d.done ? "#111" : "#F0F0EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {d.done && <IconCheck color="#fff" />}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ height: 4, background: "#EAEAE8", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "23.3%", background: "#111", borderRadius: 2 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <div style={{ fontSize: 11, color: "#AAA" }}>7 day streak</div>
              <div style={{ fontSize: 11, color: "#AAA" }}>Next: 30 days</div>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E4E4E1", marginTop: 16, overflowX: "auto" }}>
          {tabs.map(({ key, label }) => (
            <div key={key} onClick={() => setTab(key)} style={{ padding: "11px 14px 11px 0", fontSize: 13.5, fontWeight: tab === key ? 600 : 400, color: tab === key ? "#111" : "#BBB", borderBottom: tab === key ? "2px solid #111" : "2px solid transparent", marginBottom: -1, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{label}</div>
          ))}
        </div>
      </div>

      {/* Posts */}
      {tab === "posts" && (
        <div style={{ padding: "14px 18px 0" }}>
          {[
            { space: "The Studio", age: "1d", body: "The new label stock arrived. Uncoated, heavier than last time. Small thing, makes the whole box feel considered.", likes: 62, replies: 9 },
            { space: "Wellness", age: "4d", body: "Walked instead of scrolled. Ten minutes. Recommend.", likes: 28, replies: 3 },
            { space: "Style", age: "1w", body: "The rule I keep coming back to: one thing at a time. One good piece, worn often.", likes: 44, replies: 7 },
          ].map((p) => (
            <div key={p.body} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: "1px solid #E8E8E6" }}>
              <div style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>{p.space} · {p.age}</div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: "#1A1A1A" }}>{p.body}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 12, fontSize: 13, color: "#666" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><IconHeart /> {p.likes}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><IconChat /> {p.replies}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity */}
      {tab === "activity" && (
        <div style={{ padding: "16px 18px 0" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            {[["1,920", "Points"], ["7", "Day streak"], ["3", "Badges"]].map(([n, l]) => (
              <div key={l} style={{ flex: 1, background: "#FFF", borderRadius: 16, padding: "14px 12px", textAlign: "center", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ fontSize: 11.5, color: "#999", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
          {[
            { icon: "✦", label: "Posted in The Studio", pts: "+40", time: "1d ago" },
            { icon: "♡", label: "Received 12 appreciations", pts: "+60", time: "2d ago" },
            { icon: "◎", label: "Completed daily ritual", pts: "+10", time: "Today" },
            { icon: "◎", label: "Completed daily ritual", pts: "+10", time: "Yesterday" },
            { icon: "✦", label: "Replied in Wellness", pts: "+20", time: "4d ago" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid #EAEAE8" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#F0F0EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{a.label}</div>
                <div style={{ fontSize: 12, color: "#AAA", marginTop: 2 }}>{a.time}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{a.pts}</div>
            </div>
          ))}
        </div>
      )}

      {/* Recognitions / Badges */}
      {tab === "recognitions" && (
        <div style={{ padding: "16px 18px 0" }}>
          {/* Recognition received banner */}
          {!recognized && (
            <div style={{ background: "#111", borderRadius: 20, padding: "18px 18px", marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>New recognition</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <Avatar src="https://i.pravatar.cc/160?img=47" size={36} initials="MJ" />
                <div style={{ fontSize: 18, color: "#fff" }}>→</div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✦</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 4 }}>Mara recognised you as Creative</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>For your post about label stock and quality.</div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#fff" }}>View post</div>
                <div onClick={() => setRecognized(true)} className="wn-tap" style={{ flex: 1, background: "#fff", borderRadius: 12, padding: "10px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#111" }}>Say thanks ✓</div>
              </div>
            </div>
          )}

          {/* Badge shelf */}
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA", marginBottom: 14 }}>Your badges</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {[
              { label: "Creative", emoji: "✦", earned: true },
              { label: "Thoughtful", emoji: "◎", earned: true },
              { label: "Consistent", emoji: "⬡", earned: true },
              { label: "Welcoming", emoji: "❋", earned: false },
              { label: "Maker", emoji: "◈", earned: false },
            ].map((b) => (
              <div key={b.label} style={{ background: b.earned ? "#111" : "#F0F0EE", borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 7, opacity: b.earned ? 1 : 0.45 }}>
                <span style={{ fontSize: 16, color: b.earned ? "#fff" : "#999" }}>{b.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: b.earned ? "#fff" : "#999" }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Recognition history */}
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA", marginBottom: 14 }}>Received</div>
          {recognitions.map((r) => (
            <div key={r.from} style={{ display: "flex", gap: 13, paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid #EAEAE8" }}>
              <Avatar src={`https://i.pravatar.cc/160?img=${r.img}`} size={40} initials={r.from[0]} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{r.from} <span style={{ fontWeight: 400, color: "#AAA" }}>recognised you as</span> {r.badge}</div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 3 }}>{r.note}</div>
                <div style={{ fontSize: 12, color: "#AAA", marginTop: 3 }}>{r.time} ago</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {tab === "leaderboard" && (
        <div style={{ padding: "16px 18px 0" }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA", marginBottom: 16 }}>This month · The Studio</div>
          {leaderboard.map((m) => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 13, padding: "10px 12px", marginBottom: 8, borderRadius: 16, background: m.isMe ? "#111" : "#FFF", boxShadow: m.isMe ? "none" : "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 24, textAlign: "center", fontSize: 13, fontWeight: 700, color: m.isMe ? "rgba(255,255,255,0.5)" : "#AAA", flexShrink: 0 }}>{m.rank}</div>
              <Avatar src={`https://i.pravatar.cc/160?img=${m.img}`} size={38} initials={m.name[0]} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: m.isMe ? "#fff" : "#111" }}>{m.name} {m.isMe && <span style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>· you</span>}</div>
                <div style={{ fontSize: 11.5, color: m.isMe ? "rgba(255,255,255,0.5)" : "#AAA", marginTop: 1 }}>{m.badge}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: m.isMe ? "#fff" : "#111" }}>{m.points.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      {/* Spaces */}
      {tab === "spaces" && (
        <div style={{ padding: "14px 18px 0" }}>
          {["The Studio", "Drops & Releases", "Style", "Wellness", "Movement", "Introductions"].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#666" }}>{s[0]}</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{s}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="wn-screen">
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px 16px" }}>
        <div onClick={onBack} className="wn-tap" style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}><IconBack /></div>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>Activity</div>
      </div>
      {([
        { img: "47", text: "Mara Jensen recognised you as Creative for your post.", time: "2m", badge: true },
        { img: "47", text: "Mara Jensen appreciated your post in The Studio.", time: "8m", badge: false },
        { img: "13", text: "Devon Okafor replied to your comment in Wellness.", time: "1h", badge: false },
        { img: "52", text: "Theo Sand reached a 50-day streak.", time: "3h", badge: false },
        { img: "68", text: "New drop in Drops & Releases: Grey Melange Sweatshirt.", time: "5h", badge: false },
        { img: "32", text: "Sam Kestrel started following you.", time: "6h", badge: false },
      ] as { img: string; text: string; time: string; badge: boolean }[]).map((n, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 13, padding: "14px 18px", borderBottom: "1px solid #EAEAE8", background: n.badge ? "#FAFAF8" : "transparent" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <Avatar src={`https://i.pravatar.cc/160?img=${n.img}`} size={40} />
            {n.badge && <div style={{ position: "absolute", bottom: -2, right: -2, width: 16, height: 16, borderRadius: "50%", background: "#111", border: "2px solid #FAFAF8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>✦</div>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: "#1A1A1A" }}>{n.text}</div>
            <div style={{ fontSize: 12, color: "#AAA", marginTop: 3 }}>{n.time} ago</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PostDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="wn-screen">
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px 8px" }}>
        <div onClick={onBack} className="wn-tap" style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}><IconBack /></div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Post</div>
      </div>
      <div style={{ padding: "0 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13 }}>
          <Avatar src="https://i.pravatar.cc/160?img=47" size={42} initials="MJ" />
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Mara Jensen</div>
            <div style={{ fontSize: 12, color: "#999" }}>The Studio · 2h</div>
          </div>
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.6, color: "#1A1A1A" }}>Reworked the heavyweight tee pattern all morning. Pulled three seams nobody asked about. Clarity over complexity — always.</div>
        <div style={{ marginTop: 16, borderRadius: 18, overflow: "hidden", aspectRatio: "4/3" }}>
          <img src="https://wellnice.com/cdn/shop/files/Black-Tee_Back.jpg?v=1776693891&width=900" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt="Heavyweight Tee" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 16, fontSize: 14, color: "#666" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconHeart />24</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconChat />6</span>
          <span style={{ marginLeft: "auto", display: "flex" }}><IconShare /></span>
        </div>
        <div style={{ borderTop: "1px solid #EAEAE8", marginTop: 16, paddingTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#999", marginBottom: 14 }}>6 replies</div>
          {[
            { initials: "DO", name: "Devon Okafor", body: "Three seams nobody asked about is exactly the kind of thing that makes the difference.", time: "1h" },
            { initials: "TS", name: "Theo Sand", body: "Clarity over complexity. Saved that.", time: "45m" },
          ].map((r) => (
            <div key={r.name} style={{ display: "flex", gap: 11, marginBottom: 16 }}>
              <Avatar initials={r.initials} size={34} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{r.name} <span style={{ fontWeight: 400, color: "#AAA" }}>· {r.time}</span></div>
                <div style={{ fontSize: 14, lineHeight: 1.5, color: "#1A1A1A", marginTop: 3 }}>{r.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="wn-screen">
      <div style={{ padding: "12px 18px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div onClick={onBack} className="wn-tap" style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}><IconBack /></div>
          <div style={{ flex: 1, background: "#FFF", borderRadius: 999, padding: "13px 18px", fontSize: 14, color: "#999", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
            <IconSearch />Search spaces & members
          </div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA", margin: "20px 0 12px" }}>Trending</div>
        {["#coldwater", "#heavyweighttee", "#morningritual", "#clarity", "#fabrictrials"].map((tag) => (
          <div key={tag} style={{ fontSize: 15, fontWeight: 500, color: "#111", padding: "10px 0", borderBottom: "1px solid #EAEAE8" }}>{tag}</div>
        ))}
      </div>
    </div>
  );
}

const EVENT_DETAILS: Record<number, { description: string; whatToBring: string[]; host: string; hostImg: string }> = {
  1: {
    description: "A morning cold-water swim at Clevedon Marine Lake. Open water, no wetsuit required — though you're welcome to bring one. This is a regular Well Nice Wellness ritual. Slow mornings, cold water, good people.",
    whatToBring: ["Towel", "Warm layers for after", "Flask of something hot", "Willingness to feel alive"],
    host: "Devon Okafor", hostImg: "13",
  },
  2: {
    description: "Come and see how we make things. The studio will be open all day — you can handle the fabrics, see the cutting table, and ask the team anything. No agenda, no presentations. Just the work.",
    whatToBring: ["Curiosity", "Questions you've been sitting on", "Optional: bring something you're working on"],
    host: "Mara Jensen", hostImg: "47",
  },
  3: {
    description: "An easy 5k along the harbourside, starting at Pero's Bridge. All paces welcome — this isn't a race. We usually stop for coffee at the end. It's more of a moving conversation than a run.",
    whatToBring: ["Running shoes", "Something to run in", "£3–4 for coffee after"],
    host: "Theo Sand", hostImg: "52",
  },
  4: {
    description: "A live Q&A on what it means to make things well in 2025. We'll be covering process, material choices, pricing fairly, and the question of scale. Bring the questions you've never quite got to ask.",
    whatToBring: ["Your questions", "Pen and paper if that's your thing"],
    host: "Jordan Reeve", hostImg: "68",
  },
};

function EventsScreen() {
  const [filter, setFilter] = useState<"upcoming" | "going" | "past">("upcoming");
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const events = [
    { id: 1, day: "SAT", date: "28", month: "Jun", title: "Cold-water swim", location: "Clevedon Marine Lake", time: "7:00am", space: "Wellness", going: 24, rsvp: true, img: "https://picsum.photos/id/338/900/400?grayscale" },
    { id: 2, day: "WED", date: "2", month: "Jul", title: "Studio open day", location: "Well Nice HQ, Bristol", time: "11:00am – 4:00pm", space: "The Studio", going: 61, rsvp: false, img: "https://picsum.photos/id/48/900/400?grayscale" },
    { id: 3, day: "SAT", date: "5", month: "Jul", title: "Morning run — harbourside", location: "Pero's Bridge, Bristol", time: "8:00am", space: "Movement", going: 18, rsvp: false, img: "https://picsum.photos/id/137/900/400?grayscale" },
    { id: 4, day: "THU", date: "10", month: "Jul", title: "Member Q&A — making things well", location: "Online", time: "7:00pm", space: "The Studio", going: 112, rsvp: true, img: "https://picsum.photos/id/1019/900/400?grayscale" },
  ];

  const [rsvps, setRsvps] = useState<Record<number, boolean>>(
    Object.fromEntries(events.map((e) => [e.id, e.rsvp]))
  );

  const toggle = (id: number) => setExpanded((ex) => ({ ...ex, [id]: !ex[id] }));
  const filtered = filter === "going" ? events.filter((e) => rsvps[e.id]) : events;

  return (
    <div className="wn-screen" style={{ paddingBottom: 20 }}>
      <div style={{ padding: "10px 22px 14px" }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1 }}>Events</div>
        <div style={{ fontSize: 14, color: "#666", marginTop: 7 }}>What's on in the club.</div>
      </div>

      <div style={{ display: "flex", gap: 8, padding: "0 18px 18px" }}>
        {(["upcoming", "going", "past"] as const).map((f) => (
          <div key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? "#111" : "#FFF", color: filter === f ? "#FFF" : "#555", padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: filter === f ? 600 : 500, flexShrink: 0, boxShadow: filter !== f ? "0 1px 2px rgba(0,0,0,0.05)" : "none", textTransform: "capitalize", cursor: "pointer" }}>{f}</div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: "40px 22px", textAlign: "center", color: "#999", fontSize: 14 }}>No events yet. Check back soon.</div>
      )}

      {filtered.map((event) => {
        const isExpanded = !!expanded[event.id];
        const detail = EVENT_DETAILS[event.id];
        return (
          <div key={event.id} style={{ margin: "0 18px 16px", background: "#FFF", borderRadius: 24, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

            {/* Hero image */}
            <div style={{ position: "relative", aspectRatio: "16/7", background: "#E8E8E6" }}>
              <img src={event.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" alt="" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0) 60%)" }} />
              <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 999 }}>{event.space}</div>
              {rsvps[event.id] && (
                <div style={{ position: "absolute", top: 14, right: 14, background: "#111", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 999 }}>Going ✓</div>
              )}
            </div>

            {/* Summary row */}
            <div style={{ padding: "16px 17px 6px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 50, textAlign: "center" }}>
                <div style={{ background: "#111", borderRadius: "10px 10px 0 0", color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 0" }}>{event.day}</div>
                <div style={{ border: "1px solid #EAEAE8", borderTop: "none", borderRadius: "0 0 10px 10px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", padding: "4px 0", lineHeight: 1.1 }}>{event.date}</div>
                <div style={{ fontSize: 10, color: "#AAA", marginTop: 3 }}>{event.month}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{event.title}</div>
                <div style={{ fontSize: 13, color: "#999", marginTop: 5 }}>{event.time}</div>
                <div style={{ fontSize: 13, color: "#999", marginTop: 2 }}>{event.location}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                  <div style={{ display: "flex" }}>
                    {[13, 52, 47].map((n, i) => (
                      <div key={n} style={{ width: 24, height: 24, borderRadius: "50%", overflow: "hidden", background: "#999", border: "2px solid #fff", marginLeft: i > 0 ? -8 : 0, flexShrink: 0 }}>
                        <img src={`https://i.pravatar.cc/160?img=${n}`} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)" }} alt="" />
                      </div>
                    ))}
                  </div>
                  <span style={{ fontSize: 12.5, color: "#666" }}>{rsvps[event.id] ? event.going + 1 : event.going} going</span>
                </div>
              </div>
            </div>

            {/* More info toggle */}
            <div onClick={() => toggle(event.id)} className="wn-tap"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 17px", borderTop: "1px solid #F0F0EE", marginTop: 10, cursor: "pointer" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>More info</div>
              <div style={{ fontSize: 18, color: "#BBB", transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.22s ease", lineHeight: 1 }}>⌄</div>
            </div>

            {/* Expanded detail */}
            {isExpanded && (
              <div className="wn-screen" style={{ borderTop: "1px solid #F0F0EE", padding: "16px 17px 4px" }}>
                {/* Host */}
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
                  <Avatar src={`https://i.pravatar.cc/160?img=${detail.hostImg}`} size={36} initials={detail.host[0]} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA" }}>Hosted by</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 1 }}>{detail.host}</div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ fontSize: 14.5, lineHeight: 1.65, color: "#333", marginBottom: 18 }}>{detail.description}</div>

                {/* What to bring */}
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA", marginBottom: 10 }}>What to bring</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
                  {detail.whatToBring.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#111", flexShrink: 0 }} />
                      <div style={{ fontSize: 14, color: "#444" }}>{item}</div>
                    </div>
                  ))}
                </div>

                {/* See all RSVPs */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>See all {rsvps[event.id] ? event.going + 1 : event.going} going</div>
                  <div style={{ display: "flex" }}>
                    {[13, 52, 47, 32, 44].map((n, i) => (
                      <div key={n} style={{ width: 26, height: 26, borderRadius: "50%", overflow: "hidden", background: "#999", border: "2px solid #fff", marginLeft: i > 0 ? -8 : 0 }}>
                        <img src={`https://i.pravatar.cc/160?img=${n}`} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)" }} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* RSVP button */}
            <div style={{ padding: "12px 17px 16px" }}>
              <div onClick={() => setRsvps((r) => ({ ...r, [event.id]: !r[event.id] }))} className="wn-tap"
                style={{ textAlign: "center", padding: "12px", borderRadius: 14, border: "1.5px solid #111", background: rsvps[event.id] ? "#111" : "transparent", color: rsvps[event.id] ? "#fff" : "#111", fontSize: 14, fontWeight: 600 }}>
                {rsvps[event.id] ? "I'm going ✓" : "RSVP"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ComposeScreen({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState("");
  return (
    <div className="wn-screen" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px" }}>
        <div onClick={onBack} className="wn-tap" style={{ fontSize: 15, fontWeight: 500, color: "#666" }}>Cancel</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>New post</div>
        <div style={{ background: text.trim() ? "#111" : "#DDD", color: "#fff", borderRadius: 999, padding: "8px 18px", fontSize: 14, fontWeight: 600, transition: "background 0.2s" }}>Post</div>
      </div>
      <div style={{ flex: 1, padding: "8px 18px" }}>
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar src="https://i.pravatar.cc/160?img=68" size={38} initials="JR" />
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?"
            style={{ flex: 1, border: "none", background: "transparent", fontSize: 16, lineHeight: 1.55, color: "#111", outline: "none", resize: "none", minHeight: 120, fontFamily: "inherit" }} />
        </div>
        <div style={{ marginTop: 16, borderTop: "1px solid #EAEAE8", paddingTop: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#999", marginBottom: 10 }}>Post to</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["The Studio", "Drops & Releases", "Style", "Wellness"].map((s) => (
              <div key={s} style={{ background: "#FFF", border: "1px solid #E4E4E1", borderRadius: 999, padding: "7px 14px", fontSize: 13, fontWeight: 500 }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [streak, setStreak] = useState(7);
  const [justChecked, setJustChecked] = useState(false);
  const [rsvpDone, setRsvpDone] = useState(false);
  const [voted, setVoted] = useState(false);
  const [thought, setThought] = useState<{ content: string; author: string } | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [niceKey, setNiceKey] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [closingNotif, setClosingNotif] = useState(false);
  const [bellActive, setBellActive] = useState(false);

  const closeNotif = () => {
    setClosingNotif(true);
    setTimeout(() => { setShowNotif(false); setClosingNotif(false); setBellActive(false); }, 300);
  };
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetch("https://api.quotable.io/random?tags=wisdom|mindfulness|inspirational&maxLength=160")
      .then((r) => r.json())
      .then((d) => setThought({ content: d.content, author: d.author }))
      .catch(() => setThought({ content: "Clarity over complexity — always.", author: "Well Nice" }));
  }, []);

  const TAB_SCREENS: Record<Tab, Screen> = { feed: "feed", spaces: "spaces", events: "events", nice: "nice", profile: "profile" };
  const TABBED: Screen[] = ["feed", "spaces", "events", "nice", "profile"];

  const nav = (s: Screen) => {
    setScreen(s);
    requestAnimationFrame(() => scrollRef.current?.scrollTo(0, 0));
  };

  const switchTab = (t: Tab) => {
    setActiveTab(t);
    if (t === "nice") setNiceKey((k) => k + 1);
    nav(TAB_SCREENS[t]);
  };

  const handleCheckIn = () => {
    if (!justChecked) {
      setStreak((s) => s + 1);
      setJustChecked(true);
      setTimeout(() => setJustChecked(false), 1200);
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case "onboarding": return <OnboardingScreen onStart={() => nav("feed")} onSignIn={() => nav("signin")} />;
      case "signin": return <SignInScreen onBack={() => nav("onboarding")} onSignIn={() => { setActiveTab("feed"); nav("feed"); }} />;
      case "feed": return (
        <FeedScreen
          onConcierge={() => switchTab("nice")}
          onPost={() => nav("postDetail")}
          onCompose={() => nav("compose")}
          onNotifications={() => { setBellActive(true); setShowNotif(true); }}
          bellActive={bellActive}
          streak={streak} justChecked={justChecked} onCheckIn={handleCheckIn}
          rsvpDone={rsvpDone} onRsvp={() => setRsvpDone((v) => !v)}
          voted={voted} onVote={() => setVoted(true)}
          thought={thought}
        />
      );
      case "spaces": return <SpacesScreen onSpaceDetail={() => nav("spaceDetail")} onSearch={() => nav("search")} />;
      case "events": return <EventsScreen />;
      case "spaceDetail": return <SpaceDetailScreen onBack={() => nav("spaces")} onNotifications={() => { setBellActive(true); setShowNotif(true); }} />;
      case "nice": return <div key={niceKey} className="wn-expand" style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}><NiceScreen /></div>;
      case "profile": return <ProfileScreen onEditProfile={() => nav("editProfile")} />;
      case "editProfile": return <EditProfileScreen onBack={() => nav("profile")} />;
      case "notifications": return null;
      case "postDetail": return <PostDetailScreen onBack={() => nav("feed")} />;
      case "search": return <SearchScreen onBack={() => nav("spaces")} />;
      case "compose": return <ComposeScreen onBack={() => nav("feed")} />;
    }
  };

  const showTabs = TABBED.includes(screen);
  const isNice = screen === "nice";

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#D7D6D1", padding: "44px 20px", fontFamily: "'Inter', Helvetica, Arial, sans-serif" }}>
      <div style={{ width: 404, background: "#0A0A0A", borderRadius: 56, padding: 11, boxShadow: "0 50px 100px -35px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.35)", flexShrink: 0 }}>
        <div style={{ position: "relative", width: 382, height: 826, borderRadius: 46, overflow: "hidden", background: "#EFEFED", display: "flex", flexDirection: "column" }}>
          {/* Dynamic island */}
          <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 120, height: 33, background: "#000", borderRadius: 18, zIndex: 50 }} />

          {/* Splash screen */}
          {showSplash && (
            <div className="wn-splash-bg" style={{ position: "absolute", inset: 0, background: "#111", zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <div className="wn-splash-logo" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <ImageWithFallback
                  src={shortMark}
                  alt="well nice"
                  style={{ width: 72, height: "auto", filter: "invert(1)", display: "block" }}
                />
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)" }}>the well nice club</div>
              </div>
            </div>
          )}

          <StatusBar />

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: isNice ? "hidden" : "auto",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {renderScreen()}
          </div>

          {showTabs && <BottomTabBar activeTab={activeTab} onTab={switchTab} />}

          {/* Notifications slide-in panel */}
          {showNotif && (
            <>
              {/* Backdrop */}
              <div onClick={closeNotif}
                style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 80, backdropFilter: "blur(2px)", opacity: closingNotif ? 0 : 1, transition: "opacity 0.3s ease" }} />
              {/* Panel */}
              <div className={closingNotif ? "wn-slide-out" : "wn-slide-in"}
                style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "88%", background: "#EFEFED", zIndex: 90, display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.18)", borderRadius: "0 46px 46px 0" }}>
                <div style={{ height: 62, padding: "0 20px", display: "flex", alignItems: "center", gap: 12, background: "#FFF", borderBottom: "1px solid #EAEAE8", borderRadius: "0 46px 0 0" }}>
                  <div onClick={closeNotif} className="wn-tap"
                    style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>Activity</div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
                  {([
                    { img: "47", text: "Mara Jensen recognised you as Creative for your post.", time: "2m", badge: true },
                    { img: "47", text: "Mara Jensen appreciated your post in The Studio.", time: "8m", badge: false },
                    { img: "13", text: "Devon Okafor replied to your comment in Wellness.", time: "1h", badge: false },
                    { img: "52", text: "Theo Sand reached a 50-day streak.", time: "3h", badge: false },
                    { img: "68", text: "New drop in Drops & Releases: Grey Melange Sweatshirt.", time: "5h", badge: false },
                    { img: "32", text: "Sam Kestrel started following you.", time: "6h", badge: false },
                  ] as { img: string; text: string; time: string; badge: boolean }[]).map((n, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px", borderBottom: "1px solid #EAEAE8", background: n.badge ? "#FAFAF8" : "transparent" }}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <Avatar src={`https://i.pravatar.cc/160?img=${n.img}`} size={40} />
                        {n.badge && <div style={{ position: "absolute", bottom: -2, right: -2, width: 16, height: 16, borderRadius: "50%", background: "#111", border: "2px solid #FAFAF8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#fff" }}>✦</div>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#1A1A1A" }}>{n.text}</div>
                        <div style={{ fontSize: 12, color: "#AAA", marginTop: 3 }}>{n.time} ago</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
