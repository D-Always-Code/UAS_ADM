"use client";

import { useState } from "react";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      nama: formData.get("nama"),
      email: formData.get("email"),
      subjek: formData.get("tipe"), // We map type to subject for the existing backend
      pesan: formData.get("pesan"),
    };

    try {
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal mengirim surat gagak");
      
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ══════════════════════════════════
           CONTACT — Dark Contract Scroll
        ══════════════════════════════════ */
        #contact {
          padding: 9rem 0;
          position: relative;
          z-index: 2;
        }
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem;
          align-items: start;
          margin-top: 4rem;
        }
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr; }
        }

        /* Left — Runic address block */
        .contact-info h3 {
          font-family: var(--font-title), serif;
          font-size: 1.3rem;
          color: var(--gold-bright);
          margin-bottom: 1.5rem;
        }
        .contact-info-item {
          display: flex; gap: 1rem; align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .contact-info-item:last-child { border-bottom: none; }
        .contact-icon { font-size: 1.3rem; flex-shrink: 0; }
        .contact-label {
          font-family: var(--font-head), serif;
          font-size: 0.68rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--steel);
          display: block;
          margin-bottom: 0.25rem;
        }
        .contact-value {
          font-style: italic;
          color: var(--parch-dark);
          font-size: 0.95rem;
        }

        /* Right — Form as dark parchment */
        .contact-form-wrap {
          background: linear-gradient(150deg, #1e1608, #130e06);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 3px;
          padding: 2.8rem;
          position: relative;
        }
        .contact-form-wrap::before, .contact-form-wrap::after {
          content: '';
          position: absolute;
          width: 20px; height: 20px;
          border-color: rgba(201,168,76,0.35);
          border-style: solid;
        }
        .contact-form-wrap::before { top: 10px; left: 10px; border-width: 1px 0 0 1px; }
        .contact-form-wrap::after  { bottom: 10px; right: 10px; border-width: 0 1px 1px 0; }

        .form-title {
          font-family: var(--font-title), serif;
          font-size: 1.2rem;
          color: var(--gold-bright);
          margin-bottom: 2rem;
          text-align: center;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
        .form-group { margin-bottom: 1.3rem; }
        .form-group label {
          display: block;
          font-family: var(--font-head), serif;
          font-size: 0.68rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--steel);
          margin-bottom: 0.5rem;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.85rem 1rem;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 2px;
          color: var(--parchment);
          font-family: var(--font-body), serif;
          font-style: italic;
          font-size: 0.95rem;
          transition: 0.3s;
          outline: none;
        }
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          border-color: var(--gold);
          background: rgba(201,168,76,0.04);
          box-shadow: 0 0 15px rgba(201,168,76,0.08);
        }
        .form-group input::placeholder,
        .form-group textarea::placeholder { color: var(--steel); font-style: italic; }
        .form-group select option { background: var(--coal); }
      `}} />

      <section id="contact">
        <div className="container">
          <span className="section-eyebrow reveal" style={{display: 'block', marginBottom: '0.8rem', fontFamily: 'var(--font-head), serif', fontSize: '0.72rem', letterSpacing: '7px', textTransform: 'uppercase', color: 'var(--ember)'}}>⸻ &nbsp; Hubungi The Forge &nbsp; ⸻</span>
          <h2 className="section-title reveal" style={{fontFamily: 'var(--font-title), serif', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: '1.1', marginBottom: '1.2rem'}}>Kirim Surat <span className="gold-text">Burung Gagak</span></h2>

          <div className="contact-layout">
            {/* Info */}
            <div className="contact-info reveal-left">
              <h3>The Forge — Iron & Blade</h3>
              <div className="contact-info-item">
                <span className="contact-icon">🗺️</span>
                <div>
                  <span className="contact-label">Alamat Bengkel</span>
                  <span className="contact-value">Jalan Naga Emas No. 7,<br />Quarter of the Blacksmiths,<br />Kingdom of X</span>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-icon">🐦‍⬛</span>
                <div>
                  <span className="contact-label">Kirim Pesan Via</span>
                  <span className="contact-value">blacksmith@ironandblade.com<br /><em>atau Via Burung Gagak Kerajaan</em></span>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-icon">⏳</span>
                <div>
                  <span className="contact-label">Waktu Penempaan</span>
                  <span className="contact-value">14–90 hari tergantung<br />kompleksitas pesanan</span>
                </div>
              </div>
              <div className="contact-info-item">
                <span className="contact-icon">🔥</span>
                <div>
                  <span className="contact-label">Jadwal Kunjungan</span>
                  <span className="contact-value">Setiap hari kecuali malam bulan purnama — pandai besi kami sedang membakar rune.</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrap reveal-right">
              <p className="form-title">— Surat Kontrak Pesanan —</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nama">Nama Ksatria / Gelar</label>
                    <input id="nama" name="nama" type="text" placeholder="Sir Aldric the Brave..." required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Alamat Surat (Email)</label>
                    <input id="email" name="email" type="email" placeholder="nama@kastil.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="tipe">Jenis Pesanan</label>
                  <select id="tipe" name="tipe" required>
                    <option value="">— Pilih Senjata yang Kau Inginkan —</option>
                    <option value="Longsword / Great Sword">Longsword / Great Sword</option>
                    <option value="Dagger / Stiletto">Dagger / Stiletto</option>
                    <option value="Battle Axe">Battle Axe</option>
                    <option value="Shield / Buckler">Shield / Buckler</option>
                    <option value="Bow / Crossbow">Bow / Crossbow</option>
                    <option value="Full Armor Set">Full Armor Set</option>
                    <option value="Pesanan Khusus / Custom">Pesanan Khusus / Custom</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="pesan">Isi Surat / Detail Pesanan</label>
                  <textarea id="pesan" name="pesan" rows={5} placeholder="Ceritakan tentang bilah impianmu — material, ukuran, ukiran, tujuan penggunaan..." required></textarea>
                </div>
                
                {errorMsg && (
                  <div style={{ color: "var(--crimson)", marginBottom: "1rem", fontStyle: "italic", textAlign: "center" }}>
                    {errorMsg}
                  </div>
                )}
                
                {success && (
                  <div style={{ color: "var(--gold)", marginBottom: "1rem", fontStyle: "italic", textAlign: "center", border: "1px solid rgba(201,168,76,0.3)", padding: "0.5rem", borderRadius: "2px", background: "rgba(201,168,76,0.05)" }}>
                    🐦‍⬛ Surat telah sampai di The Forge. Master Aldric akan membalas dalam 1–3 hari.
                  </div>
                )}

                <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={loading}>
                  <span>{loading ? "Menerbangkan Burung Gagak..." : "Lepaskan Burung Gagak ⸻"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
