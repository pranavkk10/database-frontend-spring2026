import Card from "../components/Card";
import Footer from "../components/Footer";
import "../css/CardDatabase.css";
import { Link } from "react-router-dom";
import michaelImg from "../images/Michael.jpeg";
import wayneImg from "../images/Wayne.jpeg";
import tomImg from "../images/Tom.jpeg";
import kobeImg from "../images/Kobe.jpeg";
import messiImg from "../images/Messi.jpeg";
import derekImg from "../images/derek.jpeg";
import lebronImg from "../images/Lebron.jpeg";
import judgeImg from "../images/Judge.jpeg";

const cards = [
  {
    name: "Michael Jordan",
    img: michaelImg,
    brand: "Fleer",
    year: 1986,
    cardNumber: "#57",
    sport: "Basketball",
    grade: "PSA 10",
    price: 250000,
    description: "Iconic rookie-era card highly prized by collectors."
  },
  {
    name: "Wayne Gretzky",
    img: wayneImg,
    brand: "O-Pee-Chee",
    year: 1979,
    cardNumber: "#18",
    sport: "Hockey",
    grade: "PSA 10",
    price: 150000,
    description: "Classic Gretzky early-career issue from O-Pee-Chee."
  },
  {
    name: "Tom Brady",
    img: tomImg,
    brand: "Playoff Contenders",
    year: 2000,
    cardNumber: "#144",
    sport: "Football",
    grade: "PSA 8",
    price: 125000,
    description: "Popular collector's card with limited print run."
  },
  {
    name: "Kobe Bryant",
    img: kobeImg,
    brand: "Topps Chrome",
    year: 1996,
    cardNumber: "#138",
    sport: "Basketball",
    grade: "PSA 10",
    price: 95000,
    description: "Early Kobe card in chrome finish; highly desirable."
  },
  {
    name: "Lionel Messi",
    img: messiImg,
    brand: "Topps",
    year: 2011,
    cardNumber: "#2011",
    sport: "Soccer",
    grade: "PSA 10",
    price: 85000,
    description: "Topps release during Messi's prime years."
  },
  {
    name: "Derek Jeter",
    img: derekImg,
    brand: "SP",
    year: 1993,
    cardNumber: "#279",
    sport: "Baseball",
    grade: "PSA 10",
    price: 75000,
    description: "Early Jeter card from the SP set."
  },
  {
    name: "LeBron James",
    img: lebronImg,
    brand: "Upper Deck",
    year: 2003,
    cardNumber: "#23",
    sport: "Basketball",
    grade: "PSA 9",
    price: 65000,
    description: "A standout LeBron rookie-era card."
  },
  {
    name: "Aaron Judge",
    img: judgeImg,
    brand: "Topps",
    year: 2013,
    cardNumber: "#AAR13",
    sport: "Baseball",
    grade: "PSA 9",
    price: 45000,
    description: "Prospect card from early in Judge's career."
  }
];

function CardDatabase() {
  return (
    <div id="content" className="card-database-page">
      <main className="container main-content">
        <h1>Card Database</h1>

        <section className="toolbar" aria-label="filters">
          <div className="control search-control">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 18a8 8 0 1 1 5.292-14.006A8 8 0 0 1 10 18Zm0-14a6 6 0 1 0 .001 12.001A8 8 0 0 0 10 4Zm11 17-5.1-5.1 1.4-1.4 5.1 5.1-1.4 1.4Z" />
            </svg>
            <input type="text" placeholder="Search by player, brand, or year..." />
          </div>

          <div className="control filter-control">
            <select aria-label="Filter by sport">
              <option value="">All sports</option>
              <option>Basketball</option>
              <option>Baseball</option>
              <option>Football</option>
              <option>Hockey</option>
              <option>Soccer</option>
            </select>
          </div>

          <div className="control filter-control">
            <select aria-label="Filter by grade">
              <option value="">All grades</option>
              <option>PSA 10</option>
              <option>PSA 9</option>
              <option>PSA 8</option>
            </select>
          </div>
        </section>

        <p className="count">Showing {cards.length} of {cards.length} cards</p>

        <section className="card-grid">
          {cards.map((card) =>
            card.name === "Michael Jordan" ? (
              <Link
                key={card.name}
                to="/card-details"
                state={{ card }}
                className="card-link"
              >
                <Card
                  name={card.name}
                  img={card.img}
                  brand={card.brand}
                  year={card.year}
                  cardNumber={card.cardNumber}
                  sport={card.sport}
                  grade={card.grade}
                  price={card.price}
                  description={card.description}
                />
              </Link>
            ) : (
              <Card
                key={card.name}
                name={card.name}
                img={card.img}
                brand={card.brand}
                year={card.year}
                cardNumber={card.cardNumber}
                sport={card.sport}
                grade={card.grade}
                price={card.price}
                description={card.description}
              />
            )
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CardDatabase;