import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Restaurant from './components/Restaurant';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileBookingFab from './components/MobileBookingFab';

export default function App() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Restaurant />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
      <MobileBookingFab />
    </div>
  );
}
