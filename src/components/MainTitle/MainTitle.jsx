export default function MainTitle({ tag = 'h2', children, className = '' }) {
  const Tag = tag;
  return <Tag className={className ? className : null}>{children}</Tag>;
}
