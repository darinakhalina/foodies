import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import { Link } from 'react-router-dom';
import PathInfo from '../../components/PathInfo/PathInfo.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { register, login, logout } from '../../redux/auth/operations';
import { selectIsLoggedIn, selectUser, selectToken } from '../../redux/auth/selectors';

const DemoPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [reg, setReg] = useState({ name: '', email: '', password: '' });
  const [log, setLog] = useState({ email: '', password: '' });

  const onRegister = e => {
    e.preventDefault();
    dispatch(register(reg));
  };

  const onLogin = e => {
    e.preventDefault();
    dispatch(login(log));
  };

  const onLogout = () => dispatch(logout());

  return (
    <section className="f-container">
      <Subtitle tag={'h1'}>Demo Page</Subtitle>
      <PathInfo
        pages={[
          { name: 'Home', path: '/' },
          { name: 'Demo', path: '/demo' },
        ]}
      />
      <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <b>Auth state</b>
          <div>isLoggedIn: {String(isLoggedIn)}</div>
          <div>User: {user ? JSON.stringify(user) : '—'}</div>
          <div>Token: {token ? token.slice(0, 10) + '…' : '—'}</div>
          {isLoggedIn && (
            <button onClick={onLogout} style={{ marginTop: 8 }}>
              Logout
            </button>
          )}
        </div>

        {!isLoggedIn && (
          <>
            <form
              onSubmit={onRegister}
              style={{
                display: 'grid',
                gap: 8,
                padding: 12,
                border: '1px solid #ddd',
                borderRadius: 8,
              }}
            >
              <b>Register</b>
              <input
                placeholder="Name"
                value={reg.name}
                onChange={e => setReg({ ...reg, name: e.target.value })}
                required
              />
              <input
                placeholder="Email"
                type="email"
                value={reg.email}
                onChange={e => setReg({ ...reg, email: e.target.value })}
                required
              />
              <input
                placeholder="Password"
                type="password"
                value={reg.password}
                onChange={e => setReg({ ...reg, password: e.target.value })}
                required
              />
              <button type="submit">Sign up</button>
            </form>

            <form
              onSubmit={onLogin}
              style={{
                display: 'grid',
                gap: 8,
                padding: 12,
                border: '1px solid #ddd',
                borderRadius: 8,
              }}
            >
              <b>Login</b>
              <input
                placeholder="Email"
                type="email"
                value={log.email}
                onChange={e => setLog({ ...log, email: e.target.value })}
                required
              />
              <input
                placeholder="Password"
                type="password"
                value={log.password}
                onChange={e => setLog({ ...log, password: e.target.value })}
                required
              />
              <button type="submit">Login</button>
            </form>
          </>
        )}
      </div>
      <p>
        <Link to="/" viewTransition>
          Back to HP
        </Link>
      </p>
    </section>
  );
};

export default DemoPage;
