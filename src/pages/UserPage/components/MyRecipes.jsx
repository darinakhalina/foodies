export default function MyRecipes() {
  const items = Array.from({ length: 8 }).map((_, i) => ({
    id: `r${i+1}`,
    title: `Recipe ${i+1}`,
    desc: 'Short description of the dish goes here.',
    thumb: '/test-cake.png',
  }));

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {items.map((it) => (
        <article key={it.id} style={{ display:'grid', gridTemplateColumns:'64px 1fr auto', gap:12, alignItems:'center', borderBottom:'1px solid #eee', padding:'12px 0' }}>
          <img src={it.thumb} alt="" style={{ width:64, height:64, borderRadius:12, objectFit:'cover' }} />
          <div>
            <div style={{ fontWeight:700 }}>{it.title}</div>
            <div style={{ color:'#7a7a7a', fontSize:14 }}>{it.desc}</div>
          </div>
          <button style={{ border:'1px solid #bfbebe', borderRadius:20, padding:'6px 12px', background:'#fff' }}>View</button>
        </article>
      ))}
    </div>
  );
}
