import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import HouseCleaning from './components/HouseCleaning';
import HomeImprovements from './components/HomeImprovements';
import DeepCleaning from './components/DeepCleaning';
import ContactUs from './components/ContactUs';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services/house-cleaning" element={<HouseCleaning />} />
        <Route path="/services/home-improvements" element={<HomeImprovements />} />
        <Route path="/services/deep-cleaning" element={<DeepCleaning />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;