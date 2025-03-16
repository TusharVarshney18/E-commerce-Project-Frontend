import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="header">
      <video
        className="background-video"
        src={assets.foodvideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="header-contents">
        <div className="header-text">
          <h2>Experience the Art of Fine Dining</h2>
          <p>
            Embark on a culinary journey with our expertly crafted dishes. From
            farm-fresh ingredients to innovative recipes, we bring you an
            unforgettable dining experience that delights all your senses.
          </p>
          <div className="cta-buttons">
            <button className="primary-button">View Menu</button>
            <button className="secondary-button">Book Table</button>
          </div>
        </div>
        <div className="header-image">
          <div className="floating-cards">
            <div className="food-card">
              <h3>Special Offers</h3>
              <p>Get 20% off on your first order</p>
            </div>
            <div className="food-card">
              <h3>Chef&apos;s Special</h3>
              <p>Try our signature dishes</p>
            </div>
            <div className="food-card">
              <h3>Fast Delivery</h3>
              <p>30 minutes or free</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
