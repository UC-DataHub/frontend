import Hero from '@/components/Hero';
import Feature from '@/components/Features';
import About from '@/components/About';
import FeaturesTab from '@/components/FeaturesTab';
import FAQ from '@/components/FAQ';
// import { Provider } from "react-redux";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Feature />
      <FeaturesTab />
      <FAQ />
    </main>
  );
}
