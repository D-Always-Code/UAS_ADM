"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusUser, setFocusUser] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, username, password });
    if (res?.error) {
      setError("Surat mandat ditolak. Coba lagi.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#07050a",
      fontFamily: "var(--font-body), 'Inter', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background radial overlays */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 120%, rgba(122, 0, 0, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 60%)",
        zIndex: 1
      }} />

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-15px) scale(1.02)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .login-btn {
          font-family: var(--font-head), serif !important;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: linear-gradient(135deg, #7a0000, #b91c1c) !important;
          color: #f0ddb4 !important;
          border: 1px solid rgba(201,168,76,0.3) !important;
          border-radius: 2px !important;
          transition: 0.3s !important;
        }
        .login-btn:hover { 
          transform: translateY(-2px) !important; 
          box-shadow: 0 0 25px rgba(185,28,28,0.5), 0 0 60px rgba(122,0,0,0.2) !important; 
        }
        .login-btn:active { transform: translateY(0) !important; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
        
        .login-input {
          background: rgba(0,0,0,0.6) !important;
          border-radius: 2px !important;
          color: #f0ddb4 !important;
          font-style: italic !important;
        }
      `}</style>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "440px",
        margin: "20px",
        animation: "fadeUp 0.6s ease forwards",
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          background: "linear-gradient(150deg, #1e1608, #130e06)",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: "3px",
          padding: "48px 44px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.05) inset",
          position: "relative",
        }}>
          {/* Corner ornaments */}
          <div style={{ position: "absolute", top: 10, left: 10, width: 16, height: 16, borderTop: "1px solid rgba(201,168,76,0.4)", borderLeft: "1px solid rgba(201,168,76,0.4)" }} />
          <div style={{ position: "absolute", bottom: 10, right: 10, width: 16, height: 16, borderBottom: "1px solid rgba(201,168,76,0.4)", borderRight: "1px solid rgba(201,168,76,0.4)" }} />

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{
              width: "64px", height: "64px",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 15px",
              fontSize: "2.5rem",
            }}>
              ⚔️
            </div>

            <h1 style={{
              fontFamily: "var(--font-title), serif",
              fontSize: "26px", fontWeight: 700, margin: "0 0 8px",
              color: "#c9a84c", letterSpacing: "1px",
              textShadow: "0 0 15px rgba(201,168,76,0.3)"
            }}>
              Iron & Blade
            </h1>
            <p style={{ fontFamily: "var(--font-head), serif", color: "#6b7a8d", fontSize: "11px", margin: 0, letterSpacing: "3px", textTransform: "uppercase" }}>
              Secure Forge Access
            </p>
          </div>

          {/* Error box */}
          {error && (
            <div style={{
              background: "rgba(122,0,0,0.15)", border: "1px solid rgba(185,28,28,0.4)",
              borderRadius: "2px", padding: "12px 16px",
              color: "#ff5e00", fontSize: "13px", textAlign: "center",
              marginBottom: "24px", fontStyle: "italic"
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block", fontSize: "10px", fontFamily: "var(--font-head), serif",
                color: "#6b7a8d", textTransform: "uppercase", letterSpacing: "2px",
                marginBottom: "8px",
              }}>Nama Ksatria (Username)</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusUser ? "#c9a84c" : "#6b7a8d", transition: "color 0.2s",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text" required value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusUser(true)}
                  onBlur={() => setFocusUser(false)}
                  placeholder="Masukkan identitas..."
                  className="login-input"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    border: `1px solid ${focusUser ? "#c9a84c" : "rgba(201,168,76,0.15)"}`,
                    padding: "12px 16px 12px 44px",
                    fontSize: "14px", outline: "none",
                    boxShadow: focusUser ? "0 0 15px rgba(201,168,76,0.1)" : "none",
                    transition: "all 0.3s",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "35px" }}>
              <label style={{
                display: "block", fontSize: "10px", fontFamily: "var(--font-head), serif",
                color: "#6b7a8d", textTransform: "uppercase", letterSpacing: "2px",
                marginBottom: "8px",
              }}>Kata Sandi Rahasia</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusPass ? "#c9a84c" : "#6b7a8d", transition: "color 0.2s",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusPass(true)}
                  onBlur={() => setFocusPass(false)}
                  placeholder="Masukkan sandi..."
                  className="login-input"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    border: `1px solid ${focusPass ? "#c9a84c" : "rgba(201,168,76,0.15)"}`,
                    padding: "12px 48px 12px 44px",
                    fontSize: "14px", outline: "none",
                    boxShadow: focusPass ? "0 0 15px rgba(201,168,76,0.1)" : "none",
                    transition: "all 0.3s",
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#6b7a8d", padding: "4px",
                  display: "flex", alignItems: "center",
                }}>
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="login-btn" style={{
              width: "100%", padding: "14px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            }}>
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Membuka Pintu...
                </>
              ) : (
                <>
                  Masuk ke The Forge
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", color: "#6b7a8d", fontSize: "11px", letterSpacing: "1px" }}>
            ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ • HANYA MASTER ALDRIC
          </p>
        </div>
      </div>
    </div>
  );
}
