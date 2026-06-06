"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ══════════════════════════════════
           FOOTER
        ══════════════════════════════════ */
        .footer {
          background: #07050a;
          border-top: 1px solid rgba(201,168,76,0.1);
          padding: 5rem 6% 2.5rem;
          position: relative; z-index: 2;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 3.5rem;
          margin-bottom: 4rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 900px) {
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 500px) {
          .footer-inner { grid-template-columns: 1fr; }
        }
        .footer-logo {
          font-family: var(--font-title), serif;
          font-size: 1.6rem;
          color: var(--gold);
          text-shadow: 0 0 20px rgba(201,168,76,0.4);
          display: block;
          margin-bottom: 1rem;
        }
        .footer-tagline {
          font-style: italic;
          color: var(--steel);
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .footer-col h4 {
          font-family: var(--font-head), serif;
          font-size: 0.72rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.5rem;
        }
        .footer-col a,
        .footer-col span {
          display: block;
          color: var(--steel);
          font-size: 0.88rem;
          font-style: italic;
          margin-bottom: 0.8rem;
          transition: color 0.3s;
          text-decoration: none;
        }
        .footer-col a:hover { color: var(--parch-dark); }
        .footer-bottom {
          border-top: 1px solid rgba(201,168,76,0.08);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        .footer-copy {
          font-family: var(--font-head), serif;
          font-size: 0.72rem;
          letter-spacing: 2px;
          color: rgba(201,168,76,0.25);
          text-transform: uppercase;
        }
        .footer-rune {
          font-size: 1.2rem;
          color: rgba(201,168,76,0.2);
          letter-spacing: 4px;
        }
      `}} />

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <Link href="#hero" className="footer-logo">Iron & Blade</Link>
            <p className="footer-tagline">
              Ditempa dalam api, dibaptis dalam darah baja.<br />
              Melayani para legenda sejak zaman kegelapan pertama.
            </p>
          </div>
          <div className="footer-col">
            <h4>Navigasi</h4>
            <Link href="#hero">Beranda</Link>
            <Link href="#armory">Armory</Link>
            <Link href="#vision">Sumpah Pandai Besi</Link>
            <Link href="#lore">Kisah & Lore</Link>
          </div>
          <div className="footer-col">
            <h4>Senjata</h4>
            <span>Longswords</span>
            <span>Daggers & Knives</span>
            <span>Battle Axes</span>
            <span>Armor Sets</span>
          </div>
          <div className="footer-col">
            <h4>The Forge</h4>
            <span>Jalan Naga Emas No. 7</span>
            <span>Kingdom of X</span>
            <span>blacksmith@ironandblade.com</span>
            <span>Via Burung Gagak Kerajaan</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Iron & Blade Forge — Moh Firdaus</span>
          <span className="footer-rune">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ</span>
          <span className="footer-copy">Semua hak dilindungi hukum kerajaan</span>
        </div>
      </footer>
    </>
  );
}
