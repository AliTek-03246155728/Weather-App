import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      background: '#f0f2f5' 
    }}>
      <WeatherDashboard />
    </div>
  );
}

export default App;