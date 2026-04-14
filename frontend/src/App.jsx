import { useState, useEffect } from 'react';
import BookSearch from './pages/BookSearch';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (loading) return <div>Loading...</div>;

  const path = window.location.pathname;

  if (path === '/register') {
    return <Register />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#3b82f6', color: 'white' }}>
        <h2>Library System</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <BookSearch />
    </div>
  );
}

export default App;