import { useState, useEffect } from "react";
import { supabase, CeremonyMember, GalleryPhoto, RsvpResponse } from "../../lib/supabase";
import {
  Users, Flower2, Flame, Gift, Image, Music, LogOut, Save, Trash2,
  CheckCircle, XCircle, Plus, RefreshCw, Settings, Eye, EyeOff, Upload, Link, Sparkles
} from "lucide-react";

const ADMIN_PASSWORD = "admin123";

// ─── Shared styles ────────────────────────────────────────────────
const gold = "#FFD700";
const dark = "#0B0818";
const card = "rgba(255,255,255,0.05)";
const border = "rgba(212,175,55,0.25)";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.5rem",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(212,175,55,0.3)",
  color: "#fff",
  fontFamily: "'Raleway', sans-serif",
  fontSize: "0.9rem",
  outline: "none",
};

const btnPrimary: React.CSSProperties = {
  background: `linear-gradient(135deg, ${gold}, #B8960C)`,
  color: dark,
  border: "none",
  borderRadius: "0.5rem",
  padding: "0.5rem 1.2rem",
  fontFamily: "'Raleway', sans-serif",
  fontWeight: 600,
  fontSize: "0.8rem",
  letterSpacing: "0.08em",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
};

const btnDanger: React.CSSProperties = {
  background: "rgba(220,38,38,0.15)",
  color: "#f87171",
  border: "1px solid rgba(220,38,38,0.3)",
  borderRadius: "0.5rem",
  padding: "0.4rem 0.8rem",
  fontFamily: "'Raleway', sans-serif",
  fontWeight: 600,
  fontSize: "0.75rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "0.3rem",
};

// ─── Login Screen ─────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setError(true); setTimeout(() => setError(false), 2000); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0B0818 0%, #241846 100%)" }}>
      <div className="p-10 rounded-3xl w-full max-w-sm" style={{ background: card, border: `1px solid ${border}`, backdropFilter: "blur(20px)" }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${gold}, #B8960C)` }}>
            <Settings size={28} color={dark} />
          </div>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.5rem", color: "#fff" }}>Admin Panel</h1>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em" }}>GLIZLEN'S 18TH BIRTHDAY</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Enter admin password"
              style={{ ...inputStyle, paddingRight: "2.5rem" }}
            />
            <button type="button" onClick={() => setShow(s => !s)}
              style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p style={{ color: "#f87171", fontSize: "0.8rem", textAlign: "center", fontFamily: "'Raleway', sans-serif" }}>Incorrect password</p>}
          <button type="submit" style={btnPrimary} className="justify-center py-3">
            <Settings size={16} /> Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── RSVP Tab ─────────────────────────────────────────────────────
function RsvpTab() {
  const [rsvps, setRsvps] = useState<RsvpResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "accept" | "decline">("all");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("rsvp_responses").select("*").order("created_at", { ascending: false });
    setRsvps(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = rsvps.filter(r => filter === "all" || r.response === filter);
  const accepts = rsvps.filter(r => r.response === "accept").length;
  const declines = rsvps.filter(r => r.response === "decline").length;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: rsvps.length, color: gold },
          { label: "Accepted", value: accepts, color: "#4ade80" },
          { label: "Declined", value: declines, color: "#f87171" },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-2xl text-center" style={{ background: card, border: `1px solid ${border}` }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: s.color, fontWeight: 700 }}>{s.value}</p>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter + Refresh */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {(["all", "accept", "decline"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "0.4rem 1rem", borderRadius: "9999px", fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "capitalize", cursor: "pointer", background: filter === f ? gold : "transparent", color: filter === f ? dark : "rgba(255,255,255,0.6)", border: `1px solid ${filter === f ? gold : border}`, fontWeight: 600 }}>
            {f === "all" ? "All" : f === "accept" ? "Accepted" : "Declined"}
          </button>
        ))}
        <button onClick={load} style={{ ...btnPrimary, marginLeft: "auto" }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontFamily: "'Raleway', sans-serif" }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontFamily: "'Raleway', sans-serif" }}>No responses yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(r => (
            <div key={r.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: card, border: `1px solid ${border}` }}>
              {r.response === "accept"
                ? <CheckCircle size={20} color="#4ade80" className="shrink-0" />
                : <XCircle size={20} color="#f87171" className="shrink-0" />}
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1rem", fontWeight: 600 }}>{r.guest_name}</p>
                {r.message && <p style={{ fontFamily: "'Raleway', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>"{r.message}"</p>}
              </div>
              <div className="text-right shrink-0">
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", color: r.response === "accept" ? "#4ade80" : "#f87171", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {r.response === "accept" ? "Attending" : "Declined"}
                </p>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>
                  {new Date(r.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Ceremony Members Tab ─────────────────────────────────────────
function CeremonyTab({ category }: { category: "roses" | "candles" | "treasures" }) {
  const [members, setMembers] = useState<CeremonyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("ceremony_members")
      .select("*").eq("category", category).order("position");
    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [category]);

  const update = (id: string, field: keyof CeremonyMember, value: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const save = async (member: CeremonyMember) => {
    setSaving(member.id);
    await supabase.from("ceremony_members").update({
      name: member.name, relation: member.relation, message: member.message, gift: member.gift
    }).eq("id", member.id);
    setSaving(null);
    setSaved(member.id);
    setTimeout(() => setSaved(null), 2000);
  };

  if (loading) return <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontFamily: "'Raleway', sans-serif" }}>Loading…</p>;

  return (
    <div className="flex flex-col gap-4">
      {members.map((m) => (
        <div key={m.id} className="p-5 rounded-2xl" style={{ background: card, border: `1px solid ${border}` }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${gold}, #B8960C)`, color: dark, fontFamily: "'Playfair Display', serif", fontSize: "0.75rem", fontWeight: 700 }}>
              {m.position}
            </div>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Position {m.position}</span>
            {saved === m.id && <span style={{ color: "#4ade80", fontSize: "0.75rem", fontFamily: "'Raleway', sans-serif", marginLeft: "auto" }}>✓ Saved!</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Name</label>
              <input style={inputStyle} value={m.name} onChange={e => update(m.id, "name", e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Relation</label>
              <input style={inputStyle} value={m.relation} onChange={e => update(m.id, "relation", e.target.value)} />
            </div>
            {category === "treasures" && (
              <div>
                <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Gift</label>
                <input style={inputStyle} value={m.gift || ""} onChange={e => update(m.id, "gift", e.target.value)} />
              </div>
            )}
            <div className={category === "treasures" ? "md:col-span-2" : "md:col-span-2"}>
              <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                {category === "candles" ? "Wish" : "Message"}
              </label>
              <textarea style={{ ...inputStyle, minHeight: "4rem", resize: "vertical" }} value={m.message}
                onChange={e => update(m.id, "message", e.target.value)} />
            </div>
          </div>
          <button onClick={() => save(m)} style={{ ...btnPrimary, marginTop: "0.75rem" }} disabled={saving === m.id}>
            {saving === m.id ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            {saving === m.id ? "Saving…" : "Save Changes"}
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Gallery Tab ──────────────────────────────────────────────────
function GalleryTab() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [urlInput, setUrlInput] = useState("");
  const [altInput, setAltInput] = useState("");
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("gallery_photos").select("*").order("position");
    setPhotos(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addByUrl = async () => {
    if (!urlInput.trim()) return;
    setAdding(true);
    await supabase.from("gallery_photos").insert({ url: urlInput.trim(), alt: altInput.trim(), position: photos.length });
    setUrlInput(""); setAltInput("");
    await load();
    setAdding(false);
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("gallery").upload(path, file);
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(path);
      await supabase.from("gallery_photos").insert({ url: publicUrl, alt: file.name, storage_path: path, position: photos.length });
      await load();
    }
    setUploading(false);
    e.target.value = "";
  };

  const remove = async (photo: GalleryPhoto) => {
    if (photo.storage_path) {
      await supabase.storage.from("gallery").remove([photo.storage_path]);
    }
    await supabase.from("gallery_photos").delete().eq("id", photo.id);
    setPhotos(prev => prev.filter(p => p.id !== photo.id));
  };

  return (
    <div>
      {/* Add by URL */}
      <div className="p-5 rounded-2xl mb-6" style={{ background: card, border: `1px solid ${border}` }}>
        <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Add Photo by URL</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.3rem" }}>Image URL</label>
            <input style={inputStyle} placeholder="https://..." value={urlInput} onChange={e => setUrlInput(e.target.value)} />
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.3rem" }}>Caption (optional)</label>
            <input style={inputStyle} placeholder="Description..." value={altInput} onChange={e => setAltInput(e.target.value)} />
          </div>
        </div>
        <button onClick={addByUrl} style={btnPrimary} disabled={adding || !urlInput.trim()}>
          <Link size={14} /> {adding ? "Adding…" : "Add Photo"}
        </button>
      </div>

      {/* Upload from device */}
      <div className="p-5 rounded-2xl mb-6" style={{ background: card, border: `1px solid ${border}` }}>
        <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Upload from Device</h3>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>
          Photos are saved to Supabase Storage permanently (requires "gallery" bucket to be created).
        </p>
        <label style={{ ...btnPrimary, display: "inline-flex", cursor: "pointer" }}>
          <Upload size={14} />
          {uploading ? "Uploading…" : "Choose Photo"}
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={uploadFile} disabled={uploading} />
        </label>
      </div>

      {/* Photo grid */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontFamily: "'Raleway', sans-serif" }}>Loading…</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map(p => (
            <div key={p.id} className="relative rounded-xl overflow-hidden group aspect-[3/4]">
              <img src={p.url} alt={p.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => remove(p)} style={btnDanger}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
          {photos.length === 0 && (
            <p className="col-span-full" style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontFamily: "'Raleway', sans-serif" }}>No photos yet. Add some above!</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Music/Settings Tab ───────────────────────────────────────────
function MusicTab() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("music_playlist").select("*").order("position");
    setTracks(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("music").upload(path, file);
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from("music").getPublicUrl(path);
      await supabase.from("music_playlist").insert({ url: publicUrl, title: file.name, storage_path: path, position: tracks.length });
      await load();
    }
    setUploading(false);
    e.target.value = "";
  };

  const remove = async (track: any) => {
    if (track.storage_path) {
      await supabase.storage.from("music").remove([track.storage_path]);
    }
    await supabase.from("music_playlist").delete().eq("id", track.id);
    setTracks(prev => prev.filter(t => t.id !== track.id));
  };

  return (
    <div className="p-6 rounded-2xl" style={{ background: card, border: `1px solid ${border}` }}>
      <div className="flex items-center gap-3 mb-6">
        <Music size={20} color={gold} />
        <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "1rem", color: "#fff", fontWeight: 600 }}>Music Playlist</h3>
      </div>
      
      <div className="mb-6">
        <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Upload MP3</h3>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>
          Upload MP3 files to create your playlist.
        </p>
        <label style={{ ...btnPrimary, display: "inline-flex", cursor: "pointer", width: "fit-content" }}>
          <Upload size={14} />
          {uploading ? "Uploading…" : "Choose MP3 File"}
          <input type="file" accept="audio/mpeg, audio/mp3" style={{ display: "none" }} onChange={uploadFile} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Raleway', sans-serif" }}>Loading…</p>
      ) : (
        <div className="flex flex-col gap-3">
          {tracks.map((t, idx) => (
            <div key={t.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${border}` }}>
              <div className="text-white/50 text-xs w-4">{idx + 1}.</div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: "'Raleway', sans-serif", color: "#fff", fontSize: "0.9rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t.title}
                </p>
              </div>
              <button onClick={() => remove(t)} style={btnDanger} className="shrink-0">
                <Trash2 size={14} /> Remove
              </button>
            </div>
          ))}
          {tracks.length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Raleway', sans-serif", textAlign: "center" }}>No tracks added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Cotillion Tab ────────────────────────────────────────────────
function CotillionTab() {
  const [couples, setCouples] = useState<{ pair_number: number; gentleman: string; lady: string; id?: string }[]>([
    { pair_number: 1, gentleman: "Crez Ninu Jayme Caballes", lady: "Glizlen Casquejo" },
    { pair_number: 2, gentleman: "Aljess Casquejo", lady: "Pretsie Babatuan" },
    { pair_number: 3, gentleman: "Stephen Barbadillo", lady: "Deah Bancale" },
    { pair_number: 4, gentleman: "Jayden Kent Orbiso", lady: "Noren Albios" },
    { pair_number: 5, gentleman: "Fritz Ivan Robles Laroda", lady: "Nicey Caballes Ybanez" },
    { pair_number: 6, gentleman: "Kenneth Inoc", lady: "Lharrajen Larobis" },
    { pair_number: 7, gentleman: "Darios Marquez", lady: "Lyanne Aledon" },
    { pair_number: 8, gentleman: "Albert Ecat", lady: "Precious Nicole" },
    { pair_number: 9, gentleman: "Joshua Ando", lady: "Loreen Jean Nacar" },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("cotillion_couples").select("*").order("pair_number");
    if (data && data.length > 0) {
      setCouples(data);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const update = (pairNum: number, field: "gentleman" | "lady", value: string) => {
    setCouples(prev => prev.map(c => c.pair_number === pairNum ? { ...c, [field]: value } : c));
  };

  const save = async (c: { pair_number: number; gentleman: string; lady: string; id?: string }) => {
    setSaving(c.pair_number);
    await supabase.from("cotillion_couples").upsert({
      pair_number: c.pair_number,
      gentleman: c.gentleman,
      lady: c.lady,
    }, { onConflict: "pair_number" });
    setSaving(null);
    setSaved(c.pair_number);
    setTimeout(() => setSaved(null), 2000);
  };

  if (loading) return <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontFamily: "'Raleway', sans-serif" }}>Loading…</p>;

  return (
    <div className="flex flex-col gap-4">
      {couples.map((c) => (
        <div key={c.pair_number} className="p-5 rounded-2xl" style={{ background: card, border: `1px solid ${border}` }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${gold}, #B8960C)`, color: dark, fontFamily: "'Playfair Display', serif", fontSize: "0.75rem", fontWeight: 700 }}>
              {c.pair_number}
            </div>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
              Pair {c.pair_number} {c.pair_number === 1 ? "(Lead Couple - Debutante & Escort)" : ""}
            </span>
            {saved === c.pair_number && <span style={{ color: "#4ade80", fontSize: "0.75rem", fontFamily: "'Raleway', sans-serif", marginLeft: "auto" }}>✓ Saved!</span>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Gentleman</label>
              <input style={inputStyle} value={c.gentleman} onChange={e => update(c.pair_number, "gentleman", e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Lady</label>
              <input style={inputStyle} value={c.lady} onChange={e => update(c.pair_number, "lady", e.target.value)} />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button onClick={() => save(c)} style={btnPrimary} disabled={saving === c.pair_number}>
              <Save size={14} /> {saving === c.pair_number ? "Saving…" : "Save Pair"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────
type Tab = "rsvp" | "cotillion" | "roses" | "candles" | "treasures" | "gallery" | "settings";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "rsvp",      label: "RSVPs",     icon: <Users size={16} /> },
  { id: "cotillion", label: "Cotillion", icon: <Sparkles size={16} /> },
  { id: "roses",     label: "Roses",     icon: <Flower2 size={16} /> },
  { id: "candles",   label: "Candles",   icon: <Flame size={16} /> },
  { id: "treasures", label: "Treasures", icon: <Gift size={16} /> },
  { id: "gallery",   label: "Gallery",   icon: <Image size={16} /> },
  { id: "settings",  label: "Music",     icon: <Music size={16} /> },
];

export function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("rsvp");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0B0818 0%, #2A1015 100%)", fontFamily: "'Raleway', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(26,10,16,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${border}` }}>
        <div>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.8rem", color: "#fff" }}>Admin Dashboard</h1>
          <p style={{ fontSize: "0.65rem", color: gold, letterSpacing: "0.25em", textTransform: "uppercase" }}>Glizlen's 18th Birthday</p>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${border}`, color: "#fff", borderRadius: "9999px", padding: "0.4rem 1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem" }}>
          <LogOut size={14} /> Exit
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-24">
        {/* Tabs */}
        <div className="flex gap-2 flex-wrap py-5">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{
                padding: "0.4rem 1rem", borderRadius: "9999px", fontFamily: "'Raleway', sans-serif",
                fontSize: "0.75rem", letterSpacing: "0.08em", cursor: "pointer",
                background: activeTab === t.id ? gold : "transparent",
                color: activeTab === t.id ? dark : "rgba(255,255,255,0.6)",
                border: `1px solid ${activeTab === t.id ? gold : border}`,
                fontWeight: 600, display: "flex", alignItems: "center", gap: "0.35rem"
              }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "rsvp" && <RsvpTab />}
          {activeTab === "cotillion" && <CotillionTab />}
          {activeTab === "roses" && <CeremonyTab category="roses" />}
          {activeTab === "candles" && <CeremonyTab category="candles" />}
          {activeTab === "treasures" && <CeremonyTab category="treasures" />}
          {activeTab === "gallery" && <GalleryTab />}
          {activeTab === "settings" && <MusicTab />}
        </div>
      </div>
    </div>
  );
}
