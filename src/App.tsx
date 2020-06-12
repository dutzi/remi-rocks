import React from 'react';
import Home from './pages/Home';
import Reminders from './pages/Reminders';

function App() {
  const hasQuery = !!new URLSearchParams(window.location.search).get('q');

  if (!hasQuery) {
    return <Home />;
  }

  return <Reminders />;
}

export default App;
