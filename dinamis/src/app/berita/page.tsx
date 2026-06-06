export const dynamic = "force-dynamic";

import Link from "next/link";
import { query } from "@/lib/db";

interface BeritaRow {
  id: number;
  judul: string;
  slug: string;
  excerpt: string;
  image: string | null;
  created_at: string;
}

export default async function BeritaIndexPage() {
  const rows = await query<BeritaRow>(
    "SELECT id, judul, slug, excerpt, image, created_at FROM berita WHERE is_published = 1 ORDER BY created_at DESC"
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ══════════════════════════════════
           LORE LIST — Torn Parchment Cards
        ══════════════════════════════════ */
        .lore-container {
          padding: 10rem 0 6rem;
          min-height: 100vh;
          position: relative;
          z-index: 2;
        }

        .lore-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
          margin-top: 4rem;
        }
        .lore-card {
          background: linear-gradient(160deg, #1c1608, #130e06);
          border: 1px solid rgba(201,168,76,0.12);
          position: relative;
          overflow: hidden;
          transition: 0.4s;
          text-decoration: none;
          display: block;
        }
        /* Torn top edge effect */
        .lore-card::before {
          content: '';
          position: absolute; top: -1px; left: 0; right: 0;
          height: 10px;
          background: linear-gradient(90deg, #07050a 0%, #1c1608 15%, #07050a 30%, #1c1608 45%, #07050a 60%, #1c1608 75%, #07050a 90%, #1c1608 100%);
          clip-path: polygon(0% 100%, 3% 0%, 6% 100%, 9% 20%, 12% 100%, 15% 0%, 18% 100%, 21% 30%, 24% 100%, 27% 0%, 30% 100%, 33% 10%, 36% 100%, 39% 0%, 42% 100%, 45% 25%, 48% 100%, 51% 0%, 54% 100%, 57% 15%, 60% 100%, 63% 0%, 66% 100%, 69% 20%, 72% 100%, 75% 5%, 78% 100%, 81% 0%, 84% 100%, 87% 15%, 90% 100%, 93% 0%, 96% 100%, 100% 30%, 100% 100%, 0% 100%);
          z-index: 10;
        }
        .lore-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

        .lore-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          filter: sepia(0.3) brightness(0.8) contrast(1.1);
          transition: 0.4s;
        }
        .lore-card:hover .lore-card-img { filter: sepia(0) brightness(1) contrast(1.2); }

        .lore-card-body { padding: 2rem; }
        .lore-date {
          font-family: var(--font-head), serif;
          font-size: 0.68rem;
          letter-spacing: 3px;
          color: var(--crimson);
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.8rem;
        }
        .lore-card h3 {
          font-family: var(--font-head), serif;
          font-size: 1.15rem;
          color: var(--gold-bright);
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .lore-card p {
          font-style: italic;
          color: var(--steel-light);
          font-size: 0.95rem;
          line-height: 1.7;
        }
        .lore-read-more {
          font-family: var(--font-head), serif;
          font-size: 0.7rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 1.5rem;
          display: inline-block;
          opacity: 0.8;
          transform: translateX(-4px);
          transition: 0.3s;
        }
        .lore-card:hover .lore-read-more { opacity: 1; transform: translateX(0); }
      `}} />

      <section className="lore-container container">
        <div className="rune-divider">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ</div>
        <div style={{ paddingBottom: "2rem", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-title), serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--gold)", marginBottom: "1rem" }}>
            Kumpulan <span className="gold-text">Perkamen Lore</span>
          </h1>
          <p style={{ fontStyle: "italic", color: "var(--steel-light)", maxWidth: "600px", margin: "0 auto" }}>
            Kisah, rumor, dan pengumuman yang ditulis dengan tinta darah dan arang, ditinggalkan di atas meja The Forge untuk dibaca oleh siapa saja yang lewat.
          </p>
        </div>

        <div className="lore-grid">
          {rows.length === 0 && (
            <p style={{ textAlign: "center", gridColumn: "1/-1", fontStyle: "italic", color: "var(--steel-light)" }}>Tidak ada perkamen yang tersisa saat ini.</p>
          )}
          
          {rows.map((item) => (
            <Link
              href={`/berita/${item.slug}`}
              key={item.id}
              className="lore-card"
            >
              {item.image && (
                <img src={item.image} alt={item.judul} loading="lazy" className="lore-card-img" />
              )}
              <div className="lore-card-body">
                <span className="lore-date">
                  ⸻ {new Date(item.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <h3>{item.judul}</h3>
                <p>{item.excerpt}</p>
                <span className="lore-read-more">Buka Gulungan →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
