import FeatureCard from "../components/FeatureCard";
import Slideshow from "../components/Slideshow";
import "../css/Homepage.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


export default function Homepage() {
  const features = [
    {
      title: "Organized Database",
      icon: "🔎",
      text: "Easily search cards by sport, year, player, or value",
    },
    {
      title: "Card Adder",
      icon: "🗂️",
      text: "Enter your sports card into the database",
    },
    {
      title: "Detail Checker",
      icon: "👁️",
      text: "View detailed information and check estimated value",
    },
  ];

  return (
    <div className="page-shell">

      <main>
        <section className="hero" aria-label="Sports card safe">
          <img
            src="/images/Vault.png"
            alt="Sports cards organized inside a secure vault"
          />
        </section>

        <section className="tagline">
          <h2>All Your Cards. One Organized Vault.</h2>
        </section>

        <section className="features-section">
          <div className="feature-grid">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                icon={feature.icon}
                text={feature.text}
              />
            ))}
          </div>

          <div className="cta-wrap">
            <p>Ready to organize your collection?</p>
            <Link className="cta-button" to="/card-database">
            Explore the Card Database
            </Link>
          </div>
        </section>

        
        <section className="slideshow-section" aria-label="Card slideshow">
          <header className="slideshow-header">
            <h2>Featured Cards - Spotlight</h2>
            <p className="slideshow-sub">Hand-picked cards from the vault.</p>
          </header>

          <Slideshow />
        </section>
      </main>
      <Footer />

    </div>
  );
}