import React, { useEffect, useMemo, useState, useRef } from "react";

export default function SearchImages({ apiKey, perPage = 24, style }) {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const debounced = useDebounce(query, 400);

  useEffect(() => {
    setPage(1);
  }, [debounced]);

  useEffect(() => {
    async function run() {
      const q = debounced.trim();
      if (!apiKey || !q) {
        setImages([]);
        setError(null);
        setLoading(false);
        setTotalPages(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=${perPage}&page=${page}`;
        const res = await fetch(url, { headers: { Authorization: `Client-ID ${apiKey}` } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const mapped = (data.results || []).map((d) => ({ id: d.id, url: d.urls && (d.urls.small || d.urls.thumb), author: d.user && d.user.name }));
        setImages(mapped);
        setTotalPages(typeof data.total_pages === 'number' ? data.total_pages : null);
      } catch (e) {
        setError(e && e.message ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [debounced, apiKey, perPage, page]);

  const s = useMemo(() => ({
    wrap: Object.assign({ maxWidth: 1100, margin: '0 auto', padding: 16, fontFamily: 'system-ui' }, style),
    row: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 },
    flex: { display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
    card: { position: 'relative', overflow: 'hidden', borderRadius: 12, border: '1px solid #eee', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', width: 160, height: 160 },
    img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
    caption: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: '6px 10px', fontSize: 12, color: '#fff', background: 'linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0))' },
    input: { flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc', fontSize: 14 },
    btn: { padding: '6px 10px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' },
    pageInfo: { fontSize: 14, color: '#333' }
  }), [style]);

  const canPrev = page > 1 && !loading;
  const canNext = !loading && (totalPages ? page < totalPages : true);

  return (
    <div style={s.wrap}>
      <h2>Image Search</h2>
      <div style={s.row}>
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={s.input}
        />
      </div>

      <div style={s.row}>
        <button style={s.btn} onClick={() => canPrev && setPage(p => Math.max(1, p - 1))} disabled={!canPrev}>Prev</button>
        <span style={s.pageInfo}>Page {page}{totalPages ? ` / ${totalPages}` : ''}</span>
        <button style={s.btn} onClick={() => canNext && setPage(p => (totalPages ? Math.min(totalPages, p + 1) : p + 1))} disabled={!canNext}>Next</button>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <div style={s.flex}>
        {images.map((img) => (
          <figure key={img.id} style={s.card}>
            <img src={img.url} alt={img.author || 'image'} loading="lazy" style={s.img} />
            {img.author && <figcaption style={s.caption}>{img.author}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}

function useDebounce(value, delay) {
  const [v, setV] = useState(value);
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setV(value), delay);
    return () => clearTimeout(timeoutRef.current);
  }, [value, delay]);
  return v;
}
