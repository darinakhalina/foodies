export default function MyFavorites() {
  const items = Array.from({ length: 6 }).map((_, i) => ({
    id: `f${i+1}`,
    title: `Favorite ${i+1}`,
    thumb: '/test-cake.png',
  }));
  return (
    <div style={{ display:'grid', gap:16 }}>
      {items.map((it) => (
        <article key={it.id} style={{ display:'grid', gridTemplateColumns:'64px 1fr', gap:12, alignItems:'center', borderBottom:'1px solid #eee', padding:'12px 0' }}>
          <img src={it.thumb} alt="" style={{ width:64, height:64, borderRadius:12, objectFit:'cover' }} />
          <div style={{ fontWeight:700 }}>{it.title}</div>
        </article>
      ))}
    </div>
  );
}
