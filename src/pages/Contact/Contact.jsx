import "./Contact.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          We’d love to hear from you — send us a message below or reach out via
          social media.
        </p>

        <form className="contact-form">
          <div className="input-group">
            <input type="text" name="name" required />
            <label>Your Name</label>
          </div>
          <div className="input-group">
            <input type="email" name="email" required />
            <label>Your Email</label>
          </div>
          <div className="input-group">
            <textarea name="message" rows="5" required></textarea>
            <label>Your Message</label>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>

        <div className="social-icons">
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
