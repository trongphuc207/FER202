import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Menu from "./components/Menu/Menu";
import Booking from "./components/Booking/Booking";



import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import card1 from "./assets/card1.png";
import card2 from "./assets/card2.png";
import card3 from "./assets/card3.png";
import card4 from "./assets/card4.png";

export default function App() {
  const [query, setQuery] = useState("");

  const pizzas = [
    { id: 1, title: "Margherita Pizza", price: 21, oldPrice: 40, tag: "SALE", img: card1 },
    { id: 2, title: "Mushroom Pizza",  price: 25, img: card2 },
    { id: 3, title: "Hawaiian Pizza",  price: 30, tag: "NEW", img: card3 },
    { id: 4, title: "Pesto Pizza",     price: 23, oldPrice: 49, tag: "SALE", img: card4 },
  ];

  const filtered = pizzas.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <Banner />
      <main className="bg-dark text-light py-5">
        <section className="container py-4">
          <h2 className="fw-bold mb-4 text-center">Our Menu</h2>
          <Menu items={filtered} />
        </section>

        <section className="container py-5">
          <h2 className="fw-bold mb-4 text-center">Book Your Table</h2>
          <Booking />
        </section>
      </main>

    </>
  );
}
