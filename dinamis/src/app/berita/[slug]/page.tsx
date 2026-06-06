import { notFound } from "next/navigation";
import Link from "next/link";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface BeritaDetail {
  id: number;
  judul: string;
  slug: string;
  konten: string;
  image: string | null;
  created_at: string;
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const rows = await query<BeritaDetail>(
    "SELECT * FROM berita WHERE slug = ? AND is_published = 1 LIMIT 1",
    [slug]
  );

  if (rows.length === 0) {
    notFound();
  }

  const article = rows[0];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ══════════════════════════════════
           LORE DETAIL — Scroll Reading Style
        ══════════════════════════════════ */
        .lore-detail-container {
          padding-top: 10rem;
          padding-bottom: 8rem;
          min-height: 100vh;
          position: relative;
          z-index: 2;
        }

        .lore-detail-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 5%;
          position: relative;
        }

        .btn-back-rune {
          font-family: var(--font-head), serif;
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 3rem;
          transition: 0.3s;
          opacity: 0.8;
        }
        .btn-back-rune:hover { opacity: 1; transform: translateX(-4px); }

        .lore-detail-title {
          font-family: var(--font-title), serif;
          fontSize: clamp(2rem, 5vw, 3.5rem);
          color: var(--gold-bright);
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .lore-detail-meta {
          font-family: var(--font-head), serif;
          font-size: 0.8rem;
          letter-spacing: 3px;
          color: var(--crimson);
          text-transform: uppercase;
          margin-bottom: 3rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }

        .lore-detail-img-wrap {
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 4rem;
          border: 1px solid rgba(201,168,76,0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.8);
          position: relative;
        }
        .lore-detail-img-wrap::after {
          content: '';
          position: absolute; inset: 0;
          box-shadow: inset 0 0 40px rgba(0,0,0,0.5);
          pointer-events: none;
        }
        .lore-detail-img {
          width: 100%;
          max-height: 500px;
          object-fit: cover;
          display: block;
          filter: sepia(0.2) brightness(0.9) contrast(1.1);
        }

        .lore-content-prose {
          font-family: var(--font-body), serif;
          font-size: 1.15rem;
          line-height: 2.2;
          color: var(--parchment);
          font-style: italic;
          background: rgba(0,0,0,0.3);
          padding: 3rem 4rem;
          border-radius: 4px;
          border-left: 2px solid var(--blood);
        }
        
        @media (max-width: 600px) {
          .lore-content-prose { padding: 2rem 1.5rem; }
        }

        .lore-content-prose p { margin-bottom: 1.5rem; }
        .lore-content-prose h2, .lore-content-prose h3 {
          font-family: var(--font-head), serif;
          color: var(--gold);
          font-style: normal;
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
        .lore-content-prose a { color: var(--gold-bright); text-decoration: underline; text-decoration-color: rgba(201,168,76,0.4); }
        .lore-content-prose strong { color: var(--gold-bright); font-weight: normal; }
      `}} />

      <article className="lore-detail-container">
        <div className="lore-detail-inner">
          <Link href="/berita" className="btn-back-rune">
            <span>⸂</span> Tutup Perkamen
          </Link>
          
          <h1 className="lore-detail-title">
            {article.judul}
          </h1>
          
          <div className="lore-detail-meta">
            ⸻ {new Date(article.created_at).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {article.image && (
            <div className="lore-detail-img-wrap">
              <img 
                src={article.image} 
                alt={article.judul} 
                className="lore-detail-img"
              />
            </div>
          )}

          <div 
            className="lore-content-prose"
            dangerouslySetInnerHTML={{ __html: article.konten }} 
          />
          
          <div style={{ textAlign: "center", marginTop: "5rem" }}>
            <div className="rune-divider">ᛟ ᛞ ᛜ ᛚ ᛗ ᛖ ᛒ ᛏ ᛊ ᛉ ᛈ ᛇ ᛃ ᛁ ᚾ ᚺ ᚹ ᚷ ᚲ ᚱ ᚨ ᚦ ᚢ ᚠ</div>
          </div>
        </div>
      </article>
    </>
  );
}
