import Link from "next/link";
import { query } from "@/lib/db";

export default async function ServicesSection() {
  let senjataList: any[] = [];
  try {
    senjataList = await query<any>(
      "SELECT * FROM layanan ORDER BY urutan ASC LIMIT 10"
    );
  } catch (error) {
    console.error("Database connection error in ServicesSection:", error);
  }

  const featured = senjataList.length > 0 ? senjataList[0] : null;
  const list = senjataList.length > 1 ? senjataList.slice(1) : [];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ══════════════════════════════════
           ARMORY — Asymmetric Featured Layout
        ══════════════════════════════════ */
        #armory {
          background: var(--coal);
          clip-path: polygon(0 4%, 100% 0, 100% 96%, 0 100%);
          margin: -3rem 0;
          padding: 10rem 0 10rem;
          position: relative;
          z-index: 2;
        }

        .section-eyebrow {
          font-family: var(--font-head), serif;
          font-size: 0.72rem;
          letter-spacing: 7px;
          text-transform: uppercase;
          color: var(--ember);
          margin-bottom: 0.8rem;
          display: block;
        }
        .section-title {
          font-family: var(--font-title), serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          line-height: 1.1;
          margin-bottom: 1.2rem;
        }
        .section-desc {
          font-style: italic;
          color: var(--steel-light);
          max-width: 480px;
          font-size: 1rem;
        }

        /* Featured weapon — left large, right list */
        .armory-layout {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 5rem;
          align-items: start;
          margin-top: 4rem;
        }
        @media (max-width: 900px) {
          .armory-layout { grid-template-columns: 1fr; gap: 3rem; }
        }

        /* Featured card — parchment look */
        .weapon-featured {
          position: relative;
          background: linear-gradient(145deg, #1e1608, #13100a);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 4px;
          padding: 3rem;
          overflow: hidden;
          min-height: 480px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          cursor: pointer;
          transition: border-color 0.4s;
        }
        .weapon-featured:hover { border-color: rgba(201,168,76,0.5); }

        .weapon-featured-bg {
          position: absolute; inset: 0;
          z-index: 0; opacity: 0.25;
          background-size: cover; background-position: center;
          transition: 0.5s; filter: grayscale(100%) contrast(1.2);
        }
        .weapon-featured:hover .weapon-featured-bg { opacity: 0.4; filter: grayscale(50%) contrast(1.2); transform: scale(1.05); }

        .weapon-featured-emoji {
          position: absolute;
          top: -10px; right: -10px;
          font-size: 10rem;
          opacity: 0.06;
          line-height: 1;
          transform: rotate(-15deg);
          pointer-events: none;
          filter: sepia(1);
          z-index: 1;
        }
        
        .weapon-featured-content { position: relative; z-index: 2; }

        .weapon-featured-tag {
          font-family: var(--font-head), serif;
          font-size: 0.68rem;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--ember);
          margin-bottom: 1rem;
          display: block;
        }
        .weapon-featured h2 {
          font-family: var(--font-title), serif;
          font-size: 2.2rem;
          margin-bottom: 1rem;
          color: var(--gold-bright);
          text-shadow: 0 5px 15px rgba(0,0,0,0.8);
        }
        .weapon-featured p {
          font-style: italic;
          color: var(--steel-light);
          font-size: 0.98rem;
          line-height: 1.8;
          margin-bottom: 2rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        .weapon-stats {
          display: flex; gap: 2rem; flex-wrap: wrap;
          border-top: 1px solid rgba(201,168,76,0.15);
          padding-top: 1.5rem;
          background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);
          margin: 0 -3rem -3rem; padding: 1.5rem 3rem 3rem;
        }
        .weapon-stat-val {
          font-family: var(--font-head), serif;
          font-size: 1.4rem;
          color: var(--gold);
          display: block;
          text-shadow: 0 2px 5px rgba(0,0,0,0.8);
        }
        .weapon-stat-key {
          font-size: 0.72rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--steel);
        }
        /* Corner ornament */
        .weapon-featured::before,
        .weapon-featured::after {
          content: '';
          position: absolute; z-index: 5;
          width: 16px; height: 16px;
          border-color: rgba(201,168,76,0.4);
          border-style: solid;
        }
        .weapon-featured::before { top: 12px; left: 12px; border-width: 1px 0 0 1px; }
        .weapon-featured::after  { bottom: 12px; right: 12px; border-width: 0 1px 1px 0; }

        /* Weapon list — right side */
        .weapon-list {
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .weapon-item {
          display: flex; align-items: center; gap: 1.2rem;
          padding: 1.2rem 1.5rem;
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 3px;
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: 0.3s;
          position: relative;
          overflow: hidden;
        }
        .weapon-item::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--blood);
          transform: scaleY(0);
          transition: transform 0.3s;
        }
        .weapon-item:hover { border-color: rgba(201,168,76,0.3); background: rgba(201,168,76,0.04); }
        .weapon-item:hover::before { transform: scaleY(1); }
        .weapon-item-icon { font-size: 1.8rem; flex-shrink: 0; }
        .weapon-item-name {
          font-family: var(--font-head), serif;
          font-size: 1rem;
          color: var(--parchment);
          display: block;
          margin-bottom: 0.15rem;
        }
        .weapon-item-desc {
          font-size: 0.82rem;
          color: var(--steel);
          font-style: italic;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .weapon-item-price {
          margin-left: auto;
          font-family: var(--font-head), serif;
          font-size: 0.78rem;
          color: var(--gold);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .armory-empty {
          grid-column: 1 / -1;
          padding: 4rem;
          text-align: center;
          border: 1px dashed rgba(201,168,76,0.3);
          border-radius: 4px;
        }
      `}} />

      <section id="armory">
        <div className="container">
          <span className="section-eyebrow reveal">⸻ &nbsp; Armory Kami &nbsp; ⸻</span>
          <h2 className="section-title reveal">Pilih Senjatamu,<br /><span className="gold-text">Tulis Takdirmu</span></h2>
          <p className="section-desc reveal">
            Setiap bilah ditempa dengan tangan, dibaptis dalam api, dan diberkati oleh sang pandai besi sendiri.
          </p>

          <div className="armory-layout">
            {!featured ? (
              <div className="armory-empty reveal">
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>⚒️</span>
                <h3 style={{ fontFamily: "var(--font-head), serif", color: "var(--gold)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Tungku Masih Kosong
                </h3>
                <p style={{ fontStyle: "italic", color: "var(--steel-light)" }}>
                  Sang Pandai Besi sedang menempa mahakarya. Silakan kembali nanti.
                </p>
              </div>
            ) : (
              <>
                {/* Featured Weapon (Urutan 1) */}
                <div className="weapon-featured reveal-left">
                  {featured.image && (
                    <div className="weapon-featured-bg" style={{ backgroundImage: `url('${featured.image}')` }} />
                  )}
                  <div className="weapon-featured-emoji">{featured.icon || "⚔️"}</div>
                  
                  <div className="weapon-featured-content">
                    <span className="weapon-featured-tag">⸻ &nbsp; Unggulan Bulan Ini</span>
                    <h2>{featured.nama}</h2>
                    <p>{featured.deskripsi}</p>
                    
                    <div className="weapon-stats">
                      {featured.kekuatan && (
                        <div>
                          <span className="weapon-stat-val">{featured.kekuatan}</span>
                          <span className="weapon-stat-key">Kekuatan</span>
                        </div>
                      )}
                      {featured.kategori && (
                        <div>
                          <span className="weapon-stat-val" style={{ fontSize: "1rem", marginTop: "0.4rem" }}>{featured.kategori}</span>
                          <span className="weapon-stat-key">Kategori</span>
                        </div>
                      )}
                      {featured.harga && (
                        <div>
                          <span className="weapon-stat-val">{featured.harga}</span>
                          <span className="weapon-stat-key">Harga Jual</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Weapon List (Urutan 2 dst) */}
                <div className="weapon-list reveal-right">
                  {list.map((item: any) => (
                    <div key={item.id} className="weapon-item">
                      <span className="weapon-item-icon">{item.icon || "🗡️"}</span>
                      <div>
                        <span className="weapon-item-name">{item.nama}</span>
                        <span className="weapon-item-desc">{item.deskripsi}</span>
                      </div>
                      {item.harga && (
                        <span className="weapon-item-price">{item.harga}</span>
                      )}
                    </div>
                  ))}

                  {/* Static custom order button at the bottom */}
                  <Link href="#contact" className="weapon-item" style={{ marginTop: "1rem", borderStyle: "dashed" }}>
                    <span className="weapon-item-icon">🔥</span>
                    <div>
                      <span className="weapon-item-name">Custom Orders</span>
                      <span className="weapon-item-desc">Desainmu, tangan kami — senjata unik tak tertandingi.</span>
                    </div>
                    <span className="weapon-item-price">Kirim Surat</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
