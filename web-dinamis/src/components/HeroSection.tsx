"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Add small delay for the dramatic entrance effect
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        #hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          overflow: hidden;
          position: relative;
        }

        /* Stone texture overlay */
        #hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 50% 80%, rgba(122, 0, 0, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 20%, rgba(201,168,76,0.05) 0%, transparent 60%);
          z-index: 1;
        }

        .hero-inner {
          position: relative; z-index: 2;
          text-align: center;
          padding: 0 5%;
        }

        /* Diagonal accent bars */
        .hero-bar-left,
        .hero-bar-right {
          position: absolute; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, transparent, var(--gold), var(--ember), transparent);
          opacity: 0.5;
        }
        .hero-bar-left { left: 8%; }
        .hero-bar-right { right: 8%; }

        .hero-eyebrow {
          font-family: var(--font-head), serif;
          font-size: 0.8rem;
          letter-spacing: 8px;
          text-transform: uppercase;
          color: var(--ember);
          margin-bottom: 2.5rem;
          display: block;
          opacity: 0; transform: translateY(15px);
          transition: 1s ease;
        }
        .hero-title {
          font-family: var(--font-title), serif;
          font-size: clamp(2.8rem, 7vw, 6.5rem);
          line-height: 1.05;
          margin-bottom: 1.5rem;
          opacity: 0; transform: translateY(20px);
          transition: 1s ease 0.2s;
        }
        .hero-title .line2 {
          font-size: clamp(1.6rem, 4vw, 3.2rem);
          display: block;
          font-weight: 400;
          color: var(--parch-dark);
          letter-spacing: 4px;
          margin-top: 0.5rem;
        }

        /* Sword ornament */
        .hero-sword {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; margin: 2rem 0;
          opacity: 0; transform: translateY(15px);
          transition: 1s ease 0.35s;
        }
        .hero-sword-line {
          width: 120px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold));
        }
        .hero-sword-line.right {
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .hero-sword-icon { font-size: 1.5rem; color: var(--gold); }

        .hero-sub {
          font-family: var(--font-body), serif;
          font-style: italic;
          font-size: 1.15rem;
          color: var(--steel-light);
          max-width: 560px;
          margin: 0 auto 3.5rem;
          opacity: 0; transform: translateY(15px);
          transition: 1s ease 0.5s;
        }

        .hero-cta-row {
          display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;
          opacity: 0; transform: translateY(15px);
          transition: 1s ease 0.65s;
        }

        .hero-content-wrapper.loaded .hero-eyebrow,
        .hero-content-wrapper.loaded .hero-title,
        .hero-content-wrapper.loaded .hero-sword,
        .hero-content-wrapper.loaded .hero-sub,
        .hero-content-wrapper.loaded .hero-cta-row {
          opacity: 1; transform: translateY(0);
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          font-family: var(--font-head), serif; font-size: 0.65rem;
          letter-spacing: 4px; color: rgba(201,168,76,0.4);
          animation: pulse-down 2s ease-in-out infinite;
          z-index: 2;
        }
        .scroll-indicator::after {
          content: '';
          width: 1px; height: 50px;
          background: linear-gradient(to bottom, var(--gold), transparent);
        }
        @keyframes pulse-down {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.9; transform: translateX(-50%) translateY(8px); }
        }
      `}} />

      <section id="hero">
        <div className="hero-bar-left"></div>
        <div className="hero-bar-right"></div>

        <div className="hero-inner">
          <div className={`hero-content-wrapper ${loaded ? "loaded" : ""}`} id="heroContent">
            <span className="hero-eyebrow">⸻ &nbsp; Berdiri Sejak Zaman Kegelapan &nbsp; ⸻</span>
            <h1 className="hero-title">
              <span className="gold-text">Iron & Blade</span>
              <span className="line2">Tempat Lahirnya Legenda</span>
            </h1>
            <div className="hero-sword">
              <div className="hero-sword-line"></div>
              <span className="hero-sword-icon">⚔</span>
              <div className="hero-sword-line right"></div>
            </div>
            <p className="hero-sub">
              &quot;Senjata sejati bukan lahir dari tambang — ia lahir dari api, palu, dan jiwa seorang pandai besi.&quot;
            </p>
            <div className="hero-cta-row">
              <Link href="#armory" className="btn-primary">Masuki Armory</Link>
              <Link href="#contact" className="btn-ghost">Pesan Senjata</Link>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">GULIR</div>
      </section>
    </>
  );
}
