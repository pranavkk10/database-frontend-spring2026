import CardDetailMain from "../components/CardDetailMain";
import MiniCard from "../components/MiniCard";
import Footer from "../components/Footer";
import "../css/CardDetails.css";
import { Link } from "react-router-dom";
import michaelImg from "../images/Michael.jpeg";
import lebronImg from "../images/Lebron.jpeg";
import kobeImg from "../images/Kobe.jpeg";


const mainCard = {
  name: "Michael Jordan",
  img: michaelImg,
  brand: "Fleer",
  year: 1986,
  cardNumber: "#57",
  sport: "Basketball",
  grade: "PSA 10",
  price: 250000
};

const moreCards = [
  {
    name: "LeBron James",
    img: lebronImg,
    brand: "Topps",
    year: 2003,
    price: 35000
  },
  {
    name: "Kobe Bryant",
    img: kobeImg,
    brand: "Topps Chrome",
    year: 1996,
    price: 95000
  }
];

function CardDetails() {
  return (
    <div className="card-details-page">
      <main className="container page-content">

      <Link to="/card-database" className="back-link">← Back</Link>

        <CardDetailMain card={mainCard} />

        <section className="more-cards">
          <h2>More Basketball Cards</h2>

          <div className="cards-row">
            {moreCards.map((card) => (
              <MiniCard key={card.name} card={card} />
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default CardDetails;