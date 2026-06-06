"use client";

export default function VisionSection() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* ══════════════════════════════════
           FORGE OATH — Scroll Unroll Style
        ══════════════════════════════════ */
        #vision {
          padding: 9rem 0;
          position: relative;
          z-index: 2;
        }
        #vision::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 0% 50%, rgba(122,0,0,0.12), transparent 60%);
        }

        .vision-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 6rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .vision-layout { grid-template-columns: 1fr; }
        }

        /* Parchment scroll visual */
        .scroll-visual {
          position: relative;
        }
        .scroll-body {
          background: linear-gradient(160deg, #2a1f0e, #1c1608, #2a1f0e);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 4px;
          padding: 3rem 3rem 3rem 3.5rem;
          position: relative;
          overflow: hidden;
        }
        .scroll-body::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 2.5rem;
          background: linear-gradient(180deg, #3d2a0a, #221605, #3d2a0a);
          border-right: 1px solid rgba(201,168,76,0.15);
        }
        /* Scroll end caps */
        .scroll-cap {
          background: linear-gradient(90deg, #3d2a0a, #5c3e10, #3d2a0a);
          height: 22px;
          border-radius: 2px;
          border: 1px solid rgba(201,168,76,0.2);
          position: relative;
        }
        .scroll-cap::before, .scroll-cap::after {
          content: '';
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 30px; height: 30px;
          border-radius: 50%;
          background: radial-gradient(circle, #6b4e15, #3d2a0a);
          border: 1px solid rgba(201,168,76,0.3);
        }
        .scroll-cap::before { left: -8px; }
        .scroll-cap::after  { right: -8px; }

        .scroll-text {
          font-family: var(--font-body), serif;
          font-style: italic;
          font-size: 1.05rem;
          color: var(--parch-dark);
          line-height: 2;
        }
        .scroll-initial {
          float: left;
          font-family: var(--font-title), serif;
          font-size: 4rem;
          line-height: 0.8;
          color: var(--blood);
          margin-right: 0.3rem;
          margin-top: 0.3rem;
          text-shadow: 2px 2px 0 rgba(0,0,0,0.5);
        }
        .scroll-seal {
          text-align: right;
          margin-top: 1.5rem;
          font-family: var(--font-head), serif;
          font-size: 0.72rem;
          letter-spacing: 3px;
          color: rgba(201,168,76,0.4);
        }

        /* Stats side */
        .vision-stats {
          display: flex; flex-direction: column; gap: 2.5rem;
        }
        .vision-stat-block {
          border-left: 2px solid var(--blood);
          padding-left: 1.8rem;
          position: relative;
        }
        .vision-stat-block::before {
          content: '';
          position: absolute; left: -5px; top: 0;
          width: 8px; height: 8px;
          background: var(--gold);
          border-radius: 50%;
        }
        .v-stat-num {
          font-family: var(--font-title), serif;
          font-size: 3.2rem;
          color: var(--gold);
          display: block;
          line-height: 1;
        }
        .v-stat-label {
          font-family: var(--font-head), serif;
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--steel);
          margin-top: 0.3rem;
          display: block;
        }
        .v-stat-desc {
          font-style: italic;
          color: var(--steel-light);
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
      `}} />

      <section id="vision">
        <div className="container">
          <div className="vision-layout">
            {/* Scroll Visual */}
            <div className="scroll-visual reveal-left">
              <div className="scroll-cap"></div>
              <div className="scroll-body">
                <p className="scroll-text">
                  <span className="scroll-initial">B</span>aja tidak pernah berbohong. Setiap lekukan, setiap lipatan, setiap tetes keringat yang jatuh ke tungku — semuanya adalah sumpah yang tak bisa diingkari. Kami tidak menempa senjata untuk perang yang sia-sia. Kami menempa <em>warisan</em> — benda yang akan bertahan ribuan tahun setelah si pemegangnya telah menjadi debu dan legenda.
                </p>
                <p className="scroll-text" style={{ marginTop: "1rem" }}>
                  Master Aldric memulai Iron & Blade bukan di sebuah kedai, melainkan di bawah pohon ek tua di tepi hutan gelap, dengan satu palu, satu tungku, dan satu keyakinan: <em>bahwa setiap jiwa berhak memiliki senjata yang layak.</em>
                </p>
                <div className="scroll-seal">— Master Aldric, Pendiri Iron & Blade ✦</div>
              </div>
              <div className="scroll-cap"></div>
            </div>

            {/* Stats */}
            <div className="vision-stats">
              <div className="vision-stat-block reveal">
                <span className="v-stat-num" data-target="5000" data-suffix="+">0+</span>
                <span className="v-stat-label">Senjata Ditempa</span>
                <p className="v-stat-desc">Setiap bilah memiliki cerita yang berbeda — tidak ada dua yang sama persis.</p>
              </div>
              <div className="vision-stat-block reveal">
                <span className="v-stat-num" data-target="150" data-suffix="+">0+</span>
                <span className="v-stat-label">Pahlawan Dilayani</span>
                <p className="v-stat-desc">Dari ksatria biasa hingga jenderal kerajaan — semua diperlakukan sama.</p>
              </div>
              <div className="vision-stat-block reveal">
                <span className="v-stat-num" data-target="77" data-suffix=" hari">0 hari</span>
                <span className="v-stat-label">Rekor Penempaan</span>
                <p className="v-stat-desc">Excalibur&apos;s Echo — bilah paling lama dan paling berharga yang pernah kami ciptakan.</p>
              </div>
              <div className="vision-stat-block reveal">
                <span className="v-stat-num" data-target="3" data-suffix=" Generasi">0 Generasi</span>
                <span className="v-stat-label">Ilmu Turun-Temurun</span>
                <p className="v-stat-desc">Rahasia tempa baja kami tidak tertulis di buku — ia diwariskan melalui tangan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
