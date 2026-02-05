import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/settlement" element={<Settlement />} />
        <Route path="/services/insurance" element={<Insurance />} />
        <Route path="/services/recruitment" element={<Recruitment />} />
        <Route path="/about/company" element={<Company />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/contact" element={<Contact />} />
        <Route path="/solutions/delivery" element={<Delivery />} />
        <Route path="/solutions/ride" element={<Ride />} />
        <Route path="/solutions/housekeeping" element={<Housekeeping />} />
        <Route path="/solutions/logistics" element={<Logistics />} />
      </Routes>
    </Router>
  );
}

export default App;
