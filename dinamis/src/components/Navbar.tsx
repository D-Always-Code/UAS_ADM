"use client";

import { useState, useEffect } from "react";
import Link from "next/link";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .navbar-fantasy {
          position: fixed; top: 0; width: 100%; z-index: 1000;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.4rem 5%;
          transition: 0.4s;
        }
        .navbar-fantasy.scrolled {
          background: rgba(7, 5, 10, 0.95);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201, 168, 76, 0.2);
          padding: 0.9rem 5%;
        }
        .nav-rune-left,
        .nav-rune-right {
          font-family: var(--font-title), serif;
          font-size: 0.7rem;
          color: rgba(201,168,76,0.35);
          letter-spacing: 4px;
          text-transform: uppercase;
        }
        .nav-logo {
          font-family: var(--font-title), serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--gold);
          text-shadow: 0 0 20px rgba(201,168,76,0.5), 0 0 60px rgba(255,94,0,0.2);
          letter-spacing: 2px;
          position: relative;
        }
        .nav-logo::before,
        .nav-logo::after {
          content: '⸺';
          font-size: 0.7rem;
          color: var(--parch-dark);
          margin: 0 0.8rem;
          vertical-align: middle;
        }
        .nav-links {
          display: flex; gap: 2.2rem; list-style: none; margin: 0; padding: 0;
        }
        .nav-links a {
          font-family: var(--font-head), serif;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--parch-dark);
          transition: color 0.3s, text-shadow 0.3s;
          position: relative;
          text-decoration: none;
        }
        .nav-links a::after {
          content: '';
          position: absolute; bottom: -4px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transform: scaleX(0);
          transition: transform 0.3s;
        }
        .nav-links a:hover { color: var(--gold-bright); text-shadow: 0 0 12px rgba(201,168,76,0.6); }
        .nav-links a:hover::after { transform: scaleX(1); }

        @media (max-width: 768px) {
          .nav-links, .nav-rune-left, .nav-rune-right { display: none; }
        }
      `}} />

      <nav className={`navbar-fantasy ${scrolled ? "scrolled" : ""}`} id="navbar">
        <span className="nav-rune-left">⸻ ✦ ⸻</span>
        <Link href="#hero" className="nav-logo">Iron & Blade</Link>
        <ul className="nav-links">
          <li><Link href="#hero">Beranda</Link></li>
          <li><Link href="#armory">Armory</Link></li>
          <li><Link href="#vision">Sumpah</Link></li>
          <li><Link href="#lore">Lore</Link></li>
          <li><Link href="#contact">Pesan Senjata</Link></li>
        </ul>
        <span className="nav-rune-right">⸻ ✦ ⸻</span>
      </nav>
    </>
  );
}
