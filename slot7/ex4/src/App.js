import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import Header from "./components/Header";
import TopNav from "./components/TopNav";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app-container">
      <div className="app-content">
        <Header />
        <TopNav />
        <Main />
      </div>
      <Footer />
    </div>
  );
}
