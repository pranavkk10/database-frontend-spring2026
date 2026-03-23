import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/Navigation.css";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/card-database", label: "Card Database" },
    { to: "/card-details", label: "Card Details" },
    { to: "/add-edit-cards", label: "Add/Edit Cards" },
    { to: "/about-contact", label: "About and Contact" },
  ];

  return (
    <nav className={`nav ${open ? "active" : ""}`} aria-label="Main navigation">
      <button
        className="nav-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}