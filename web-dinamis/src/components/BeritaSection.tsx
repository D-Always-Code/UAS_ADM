import Link from "next/link";
import { query } from "@/lib/db";

export default async function BeritaSection() {
  // Menarik data perkamen dari database, diurutkan dari terbaru, maksimal 6
  let perkamenList: any[] = [];
  try {
    perkamenList = await query<any>(
      "SELECT * FROM berita WHERE is_published = 1 ORDER BY created_at DESC LIMIT 6"
    );
  } catch (error) {
    console.error("Database connection error in BeritaSection:", error);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ══════════════════════════════════
           LORE — Torn Parchment Cards
        ══════════════════════════════════ */
        #lore {
          background: var(--coal);
          clip-path: polygon(0 0, 100% 3%, 100% 100%, 0 97%);
          padding: 11rem 0;
          margin: -3rem 0;
          position: relative;
          z-index: 2;
        }

        .lore-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
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
        .lore-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-4px); }

        .lore-card-banner {
          height: 160px;
          background: linear-gradient(135deg, #1a0a00, #2d1202);
          display: flex; align-items: center; justify-content: center;
          font-size: 5rem;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          position: relative;
          overflow: hidden;
        }
        
        .lore-card-banner-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.6;
          transition: 0.5s;
          filter: sepia(0.8) hue-rotate(-20deg) contrast(1.2);
        }
        .lore-card:hover .lore-card-banner-img {
          opacity: 0.8; transform: scale(1.05);
        }

        .lore-card-banner::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at center, rgba(255,94,0,0.1), transparent 70%);
        }
        .lore-card-body { padding: 1.8rem; }
        .lore-date {
          font-family: var(--font-head), serif;
          font-size: 0.68rem;
          letter-spacing: 3px;
          color: var(--crimson);
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.6rem;
        }
        .lore-card h3 {
          font-family: var(--font-head), serif;
          font-size: 1.05rem;
          color: var(--gold-bright);
          margin-bottom: 0.8rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .lore-card p {
          font-style: italic;
          color: var(--steel-light);
          font-size: 0.88rem;
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .lore-read-more {
          font-family: var(--font-head), serif;
          font-size: 0.7rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 1.2rem;
          display: inline-block;
          opacity: 0;
          transform: translateX(-8px);
          transition: 0.3s;
        }
        .lore-card:hover .lore-read-more { opacity: 1; transform: translateX(0); }
      `}} />

      <section id="lore">
        <div className="container">
          <div className="rune-divider">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ</div>
          <span className="section-eyebrow reveal" style={{display: 'block', marginBottom: '0.8rem', fontFamily: 'var(--font-head), serif', fontSize: '0.72rem', letterSpacing: '7px', textTransform: 'uppercase', color: 'var(--ember)'}}>⸻ &nbsp; Kisah dari The Forge &nbsp; ⸻</span>
          <h2 className="section-title reveal" style={{fontFamily: 'var(--font-title), serif', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: '1.1', marginBottom: '1.2rem'}}>Lore & <span className="gold-text">Perkamen Waktu</span></h2>
          <p className="section-desc reveal" style={{fontStyle: 'italic', color: 'var(--steel-light)', maxWidth: '480px', fontSize: '1rem'}}>
            Rumor, penemuan, dan kisah yang beredar di antara para pandai besi dan ksatria di seluruh kerajaan.
          </p>

          <div className="lore-grid">
            {perkamenList.length === 0 ? (
               <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", border: "1px dashed rgba(201,168,76,0.3)" }}>
                 <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>📜</span>
                 <h3 style={{ fontFamily: "var(--font-head), serif", color: "var(--gold)", fontSize: "1.2rem" }}>
                   Perkamen Belum Ditulis
                 </h3>
               </div>
            ) : perkamenList.map((item: any) => {
              // Cek apakah image berisi URL gambar atau sekadar karakter Emoji
              const isEmoji = item.image && item.image.length <= 4 && !item.image.includes('http');
              
              return (
                <Link key={item.id} href={`/berita/${item.slug}`} className="lore-card reveal">
                  <div className="lore-card-banner">
                    {item.image && !isEmoji ? (
                      <img src={item.image} alt={item.judul} className="lore-card-banner-img" />
                    ) : (
                      <span>{item.image || "📜"}</span>
                    )}
                  </div>
                  <div className="lore-card-body">
                    <span className="lore-date">⸻ {new Date(item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <h3>{item.judul}</h3>
                    <p>{item.excerpt}</p>
                    <span className="lore-read-more">Baca Kisah →</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }} className="reveal">
            <Link href="/berita" className="btn-ghost">Buka Semua Perkamen</Link>
          </div>
        </div>
      </section>
    </>
  );
}
