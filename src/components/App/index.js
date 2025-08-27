import React, { useState, useEffect } from 'react';

import Login from '../Login';
import Dashboard from '../Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safe parse to avoid crashing if localStorage value is invalid
    try {
      const storedAuth = localStorage.getItem('is_authenticated');
      if (storedAuth !== null) {
        setIsAuthenticated(JSON.parse(storedAuth));
      }
    } catch (err) {
      console.error('Error parsing authentication state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  return isAuthenticated ? (
    <Dashboard setIsAuthenticated={setIsAuthenticated} />
  ) : (
    <Login setIsAuthenticated={setIsAuthenticated} />
  );
};

export default App;
