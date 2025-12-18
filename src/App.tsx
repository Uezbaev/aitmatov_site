import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import CropAnalytics from './pages/CropAnalytics';
import RegionComparison from './pages/RegionComparison';
import WeatherInsights from './pages/WeatherInsights';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/crops" element={<CropAnalytics />} />
          <Route path="/regions" element={<RegionComparison />} />
          <Route path="/weather" element={<WeatherInsights />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;