import { useEffect } from 'react';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Pricing from '@/sections/Pricing';
import CTA from '@/sections/CTA';
import Ecosystem from '@/sections/Ecosystem';
import Clients from '@/sections/Clients';
import DemoSettlement from '@/sections/DemoSettlement';
import DemoContract from '@/sections/DemoContract';
import DemoRiskControl from '@/sections/DemoRiskControl';
import Footer from '@/sections/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <CTA />
        <Ecosystem />
        <Clients />
        <DemoSettlement />
        <DemoContract />
        <DemoRiskControl />
      </main>
      <Footer />
    </div>
  );
}
