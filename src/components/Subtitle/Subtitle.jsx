export default function Subtitle({ tag = 'p', children, className = '' }) {
  const Tag = tag;
  return <Tag className={className ? className : null}>{children}</Tag>;
}
