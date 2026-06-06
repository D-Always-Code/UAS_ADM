import { createLayanan } from "@/app/actions/layanan";
import Link from "next/link";

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const SaveIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);

const KATEGORI = ["Longsword / Great Sword", "Dagger / Stiletto", "Battle Axe", "Shield / Buckler", "Bow / Crossbow", "Full Armor Set", "Senjata Kustom"];

export default function CreateLayananPage() {
  return (
    <div style={{ maxWidth: "700px" }}>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/layanan" className="admin-btn admin-btn-icon"><BackIcon /></Link>
          <div>
            <div className="admin-page-title">Tempa Senjata Baru</div>
            <div className="admin-page-subtitle">Tambahkan senjata baru ke dalam Katalog Armory</div>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ padding: "32px" }}>
        <form action={createLayanan}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-form-label">Nama Senjata <span style={{ color: "#b91c1c" }}>*</span></label>
              <input name="nama" required type="text" className="admin-form-input" placeholder="Contoh: Excalibur's Echo" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Kategori</label>
              <select name="kategori" className="admin-form-input" style={{ cursor: "pointer" }}>
                <option value="">— Pilih Kategori —</option>
                {KATEGORI.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Harga (Keping Emas ⚜)</label>
              <input name="harga" type="text" className="admin-form-input" placeholder="Contoh: 88 ⚜" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Kekuatan / Damage</label>
              <input name="kekuatan" type="text" className="admin-form-input" placeholder="Contoh: 1200 MPa" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Ikon Emoji</label>
              <input name="icon" type="text" className="admin-form-input" placeholder="Contoh: ⚔️ atau 🗡️" defaultValue="⚔️" />
              <div style={{ fontSize: "12px", color: "#6b7a8d", marginTop: "4px", fontStyle: "italic" }}>Emoji yang mewakili senjata ini</div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Urutan Tampil</label>
              <input name="urutan" type="number" className="admin-form-input" defaultValue="0" min="0" />
              <div style={{ fontSize: "12px", color: "#6b7a8d", marginTop: "4px", fontStyle: "italic" }}>Angka kecil = tampil lebih awal</div>
            </div>

            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-form-label">URL Gambar Senjata</label>
              <input name="image" type="text" className="admin-form-input" placeholder="https://contoh.com/gambar-pedang.jpg" />
              <div style={{ fontSize: "12px", color: "#6b7a8d", marginTop: "4px", fontStyle: "italic" }}>Masukkan URL gambar senjata (opsional)</div>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Deskripsi Material & Sejarah <span style={{ color: "#b91c1c" }}>*</span></label>
            <textarea name="deskripsi" required className="admin-form-textarea" style={{ minHeight: "140px" }}
              placeholder="Ceritakan kisah di balik senjata ini — materialnya, sejarahnya, keistimewaannya..." />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "12px", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
            <Link href="/admin/layanan" className="admin-btn admin-btn-secondary">Batal</Link>
            <button type="submit" className="admin-btn admin-btn-primary">
              <SaveIcon /> Simpan ke Armory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
