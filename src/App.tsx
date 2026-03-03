import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Solutions from '@/pages/Solutions';
import Settlement from '@/pages/services/Settlement';
import Insurance from '@/pages/services/Insurance';
import Recruitment from '@/pages/services/Recruitment';
import Company from '@/pages/about/Company';
import History from '@/pages/about/History';
import Contact from '@/pages/about/Contact';
import Delivery from '@/pages/solutions/Delivery';
import Ride from '@/pages/solutions/Ride';
import Housekeeping from '@/pages/solutions/Housekeeping';
import Logistics from '@/pages/solutions/Logistics';
import Cases from '@/pages/Cases';
import ROICalculator from '@/pages/ROICalculator';
import ComplianceCenter from '@/pages/ComplianceCenter';
import Insights from '@/pages/Insights';
import Downloads from '@/pages/Downloads';
import { captureAttribution, trackEvent } from '@/lib/analytics';

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    captureAttribution();
    trackEvent('page_view', { path: location.pathname });
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/settlement" element={<Settlement />} />
        <Route path="/services/insurance" element={<Insurance />} />
        <Route path="/services/recruitment" element={<Recruitment />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/delivery" element={<Delivery />} />
        <Route path="/solutions/ride" element={<Ride />} />
        <Route path="/solutions/housekeeping" element={<Housekeeping />} />
        <Route path="/solutions/logistics" element={<Logistics />} />
        <Route path="/about/company" element={<Company />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/contact" element={<Contact />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/roi-calculator" element={<ROICalculator />} />
        <Route path="/compliance-center" element={<ComplianceCenter />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/downloads" element={<Downloads />} />
      </Routes>
    </Router>
  );
}

export default App;
