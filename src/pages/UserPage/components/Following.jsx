export default function Following() {
  const items = Array.from({ length: 5 }).map((_, i) => ({
    id: `u${i+1}`, name: `Following ${i+1}`, avatar: '/images/test-cat.png'
  }));
  return (
    <div style={{ display:'grid', gap:12 }}>
      {items.map((u) => (
        <div key={u.id} style={{ display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #eee', padding:'10px 0' }}>
          <img src={u.avatar} alt="" style={{ width:36, height:36, borderRadius:'50%' }} />
          <div style={{ fontWeight:600 }}>{u.name}</div>
        </div>
      ))}
    </div>
  );
}
