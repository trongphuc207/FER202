import Topbar from "./components/Topbar";
import Hero from "./components/Hero";
import Breadcrumbs from "./components/Breadcrumbs";
import StudentsGrid from "./components/StudentsGrid";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Topbar />
      <Hero />
      <main className="flex-grow-1">
        <Breadcrumbs items={[{label:"Home", href:"/"}, {label:"Students"}]} />
        <div className="container my-4">
          <h3 className="fw-bold text-center mb-4">Students Detail</h3>
          <StudentsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
