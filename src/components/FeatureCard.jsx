import "../css/FeatureCard.css";

export default function FeatureCard({ title, icon, text }) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <div className="icon" aria-hidden="true">
        {icon}
      </div>
      <p>{text}</p>
    </article>
  );
}