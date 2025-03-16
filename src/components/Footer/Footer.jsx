import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo-section">
          <div className="footer-logo">
            <img src={assets.logo} alt="FoodieHub Logo" />
            <h3>FoodieHub</h3>
          </div>
          <p className="footer-about">
            Discover the best food and drinks in your area. We make it easy to
            find the perfect dish for any occasion.
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="#" className="social-icon">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="#" className="social-icon">
              <img src={assets.instagram_icon} alt="Instagram" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <a href="#" className="footer-link">
              <i className="fas fa-chevron-right"></i>
              Home
            </a>
            <a href="#" className="footer-link">
              <i className="fas fa-chevron-right"></i>
              About Us
            </a>
            <a href="#" className="footer-link">
              <i className="fas fa-chevron-right"></i>
              Menu
            </a>
            <a href="#" className="footer-link">
              <i className="fas fa-chevron-right"></i>
              Contact
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Food Street, Cuisine City, FC 12345</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone-alt"></i>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>info@foodiehub.com</span>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p className="footer-about">
            Subscribe to our newsletter for the latest updates and exclusive
            offers.
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} FoodieHub. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">
            Privacy Policy
          </a>
          <a href="#" className="footer-bottom-link">
            Terms of Service
          </a>
          <a href="#" className="footer-bottom-link">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
