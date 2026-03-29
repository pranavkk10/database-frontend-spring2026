import Footer from "../components/Footer";
import "../css/AboutAndContact.css";

export default function AboutContact() {
  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const sendBtn = form.querySelector("#sendBtn");
    const statusEl = form.querySelector("#formStatus");

    function setStatus(message, type = "info") {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.classList.remove("success", "error", "info");
      statusEl.classList.add(type);
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("Please correct the highlighted fields and try again.", "error");
      return;
    }

    const originalBtnText = sendBtn ? sendBtn.textContent : "Send Message";

    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.setAttribute("aria-busy", "true");
      sendBtn.textContent = "Sending…";
    }

    setStatus("", "info");

    try {
      const url = form.getAttribute("action") || "https://api.web3forms.com/submit";
      const formData = new FormData(form);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let detail = "";
        try {
          const data = await response.json();
          if (data?.message) detail = ` — ${data.message}`;
        } catch (_) {}
        throw new Error(`Server returned ${response.status}${detail}`);
      }

      const result = await response.json();

      if (result?.success === true || result?.message === "Email sent") {
        setStatus("Thank you! Your message was sent successfully. We'll be in touch soon.", "success");
      } else {
        setStatus("Message sent (server returned success).", "success");
      }

      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("Sorry — we couldn't send your message. Please try again later.", "error");
    } finally {
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.removeAttribute("aria-busy");
        sendBtn.textContent = originalBtnText;
      }
    }
  }

  return (
    <div className="about-contact-page">

      <main className="content">
        <section className="about-section">
          <h2>About Sports Card Vault</h2>

          <article className="mission-card">
            <h3>Our Mission</h3>
            <p>
              Sports Card Vault is dedicated to helping collectors organize, track, and value their sports card
              collections. Whether you're a seasoned collector or just starting out, our platform provides the tools
              you need to manage your valuable cards with ease.
            </p>
            <p>
              Founded in 2026, we understand the passion that drives collectors. Our goal is to make card collecting
              more accessible, organized, and enjoyable for everyone.
            </p>
          </article>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">🏀</div>
              <h3>Multi-Sport Support</h3>
              <p>Track cards from basketball, football, baseball, hockey, and more</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">📊</div>
              <h3>Value Tracking</h3>
              <p>Monitor the estimated value of your collection over time</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true">🔍</div>
              <h3>Easy Organization</h3>
              <p>Search and filter your cards by player, year, sport, and value</p>
            </article>
          </div>
        </section>

        <section className="contact-section">
          <h2>Get in Touch</h2>

          <div className="contact-grid">
            <div className="contact-info">
              <p>
                Have questions, feedback, or need support? We'd love to hear from you! Reach out using the contact
                information below or fill out the form.
              </p>

              <ul>
                <li>
                  <span className="contact-icon" aria-hidden="true">✉️</span>
                  <div>
                    <h3>Email</h3>
                    <p>support@sportscardvault.com</p>
                  </div>
                </li>

                <li>
                  <span className="contact-icon" aria-hidden="true">📞</span>
                  <div>
                    <h3>Phone</h3>
                    <p>1-800-CARDS-99</p>
                  </div>
                </li>

                <li>
                  <span className="contact-icon" aria-hidden="true">📍</span>
                  <div>
                    <h3>Address</h3>
                    <p>
                      123 Collector&apos;s Lane<br />
                      Card City, CC 12345<br />
                      United States
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <form
              id="contactForm"
              className="contact-form"
              action="https://api.web3forms.com/submit"
              method="POST"
              noValidate
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="access_key"
                value="c34af362-2786-4558-9424-b9e5647a68c0"
              />
              <input
                type="hidden"
                name="subject"
                value="Website Contact: Sports Card Vault"
              />

              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                autoComplete="name"
              />

              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
              />

              <label htmlFor="subject">Subject *</label>
              <input
                id="subject"
                name="user_subject"
                type="text"
                placeholder="What's this about?"
                required
              />

              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Your message..."
                required
              />

              <button id="sendBtn" type="submit" aria-live="polite">
                ✈ Send Message
              </button>

              <div id="formStatus" className="form-status" aria-live="polite" role="status" />
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}