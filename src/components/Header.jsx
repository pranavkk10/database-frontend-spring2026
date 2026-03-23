import Navigation from "./Navigation";
import "../css/Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <h1>Sports Card Vault</h1>
      <Navigation />
    </header>
  );
}