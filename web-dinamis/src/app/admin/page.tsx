import { query } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const beritaCount = await query<any>("SELECT COUNT(*) as total FROM berita");
  const layananCount = await query<any>("SELECT COUNT(*) as total FROM layanan");
  const unreadKontak = await query<any>("SELECT COUNT(*) as total FROM kontak WHERE is_read = 0");
  const totalKontak = await query<any>("SELECT COUNT(*) as total FROM kontak");

  const stats = [
    { name: "Koleksi Senjata", value: layananCount[0]?.total ?? 0, href: "/admin/layanan", color: "#c9a84c", bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.3)" },
    { name: "Total Perkamen", value: beritaCount[0]?.total ?? 0, href: "/admin/berita", color: "#c9a84c", bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.3)" },
    { name: "Surat Belum Dibaca", value: unreadKontak[0]?.total ?? 0, href: "/admin/kontak", color: "#b91c1c", bg: "rgba(122,0,0,0.15)", border: "rgba(185,28,28,0.4)" },
    { name: "Total Surat Masuk", value: totalKontak[0]?.total ?? 0, href: "/admin/kontak", color: "#c9a84c", bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.3)" },
  ];

  const recentBerita = await query<any>(
    "SELECT id, judul, is_published, created_at FROM berita ORDER BY created_at DESC LIMIT 5"
  );
  const recentKontak = await query<any>(
    "SELECT id, nama, email, subjek, is_read, created_at FROM kontak ORDER BY created_at DESC LIMIT 5"
  );

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontFamily: "var(--font-title), serif", fontSize: "22px", fontWeight: 700, color: "#c9a84c", marginBottom: "6px" }}>
          ⚔ Selamat Datang, Master ⚔
        </h2>
        <p style={{ color: "#6b7a8d", fontSize: "14px", fontStyle: "italic" }}>
          Berikut adalah ringkasan kondisi The Forge — Iron & Blade.
        </p>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        {stats.map((s) => (
          <Link key={s.name} href={s.href} className="admin-stat-card" style={{ textDecoration: "none" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500, marginBottom: "8px" }}>{s.name}</div>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
            </div>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: s.bg, border: `1px solid ${s.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: s.color, fontSize: "22px", fontWeight: 800,
            }}>
              {String(s.value).padStart(1, "0")}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Recent Berita */}
        <div className="admin-card">
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--font-head), serif", fontSize: "14px", fontWeight: 700, color: "#c9a84c", letterSpacing: "1px", textTransform: "uppercase" }}>Perkamen Terbaru</div>
            <Link href="/admin/berita/create" className="admin-btn admin-btn-primary" style={{ padding: "6px 14px", fontSize: "12px" }}>+ Tulis</Link>
          </div>
          <div>
            {recentBerita.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "#6b7a8d", fontSize: "14px", fontStyle: "italic" }}>Belum ada perkamen yang ditulis.</div>
            ) : recentBerita.map((b: any) => (
              <div key={b.id} style={{ padding: "14px 24px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.judul}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                    {new Date(b.created_at).toLocaleDateString("id-ID")}
                  </div>
                </div>
                <span className={`admin-badge ${b.is_published ? "admin-badge-green" : "admin-badge-gray"}`} style={{ marginLeft: "12px", flexShrink: 0 }}>
                  {b.is_published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Kontak */}
        <div className="admin-card">
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "var(--font-head), serif", fontSize: "14px", fontWeight: 700, color: "#c9a84c", letterSpacing: "1px", textTransform: "uppercase" }}>Surat Gagak Terbaru</div>
            <Link href="/admin/kontak" className="admin-btn admin-btn-secondary" style={{ padding: "6px 14px", fontSize: "12px" }}>Lihat Semua</Link>
          </div>
          <div>
            {recentKontak.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "#6b7a8d", fontSize: "14px", fontStyle: "italic" }}>Belum ada surat yang masuk.</div>
            ) : recentKontak.map((k: any) => (
              <div key={k.id} style={{ padding: "14px 24px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {!k.is_read && <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3b82f6", display: "inline-block", flexShrink: 0 }} />}
                    <div style={{ fontSize: "13px", fontWeight: k.is_read ? 500 : 700, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k.nama}</div>
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k.email}</div>
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginLeft: "12px", flexShrink: 0 }}>
                  {new Date(k.created_at).toLocaleDateString("id-ID")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
