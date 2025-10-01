export default function Breadcrumbs({items=[]}) {
  return (
    <div className="bg-light border-top border-bottom">
      <div className="container py-2">
        {items.map((it,i)=>(
          <span key={i} className="small">
            {i>0 && <span className="text-muted"> / </span>}
            {it.href ? <a href={it.href} className="text-decoration-none">{it.label}</a> : it.label}
          </span>
        ))}
      </div>
    </div>
  );
}
