import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="header parallax-container">
      <video
        className="background-video"
        src={assets.foodvideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="overlay-gradient" />
      <div className="header-contents glass-effect">
        <div className="header-text">
          <h2>Savor Culinary Excellence</h2>
          <p>
            Discover an immersive dining experience where innovation meets
            tradition. Our chefs craft each dish with passion, using only the
            finest, locally-sourced ingredients. Taste the difference with every
            bite.
          </p>
          <div className="cta-buttons">
            <button className="primary-button">Explore Our Menu</button>
            <button className="secondary-button">Reserve Your Table</button>
          </div>
        </div>
        <div className="header-image">
          <div className="floating-cards">
            <div className="food-card">
              <h3>Exclusive Launch Offer</h3>
              <p>Enjoy 20% off on your first dine-in or delivery</p>
            </div>
            <div className="food-card">
              <h3>Chef’s Recommendations</h3>
              <p>Indulge in signature creations curated weekly</p>
            </div>
            <div className="food-card">
              <h3>Lightning-Fast Delivery</h3>
              <p>Fresh, hot, and at your doorstep in under 30 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
