import PropTypes from 'prop-types';

export default function Followers({ followers, isLoading, error }) {
  // If no followers prop is provided, fallback to empty array
  const items = followers || [];

  if (isLoading) {
    return <div>Loading followers...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Failed to load followers.</div>;
  }

  if (!items.length) {
    return <div>No followers found.</div>;
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map(u => (
        <div
          key={u.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid #eee',
            padding: '10px 0',
          }}
        >
          <img
            src={u.avatar}
            alt={`Avatar of ${u.name}`}
            style={{ width: 36, height: 36, borderRadius: '50%' }}
          />
          <div style={{ fontWeight: 600 }}>{u.name}</div>
        </div>
      ))}
    </div>
  );
}

Followers.propTypes = {
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.any,
};

Followers.defaultProps = {
  followers: [],
  isLoading: false,
  error: null,
};
