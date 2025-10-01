import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Banner from './components/BannerComponents/Banner';
import Navbar from './components/NavbarComponents/Navbar';
import Grid from './components/GridComponents/Grid';
import Footer from './components/FooterComponents/Footer';

function App() {
  return (
    <div className="app-container">
      <div className="app-content">
        <Banner />
        <Navbar />
        <Grid />
      </div>
      <Footer />
    </div>
  );
}

export default App;
