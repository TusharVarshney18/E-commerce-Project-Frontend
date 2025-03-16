import { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/storeContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { CartGetTotalAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setIsProfileOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isMobileMenuOpen ? "mobile-open" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={assets.logoIcon} alt="Logo" />
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? "show" : ""}`}>
          <Link
            to="/"
            onClick={() => handleMenuClick("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => handleMenuClick("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#App-download"
            onClick={() => handleMenuClick("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile App
          </a>
          <a
            href="#footer"
            onClick={() => handleMenuClick("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </div>

        <div className="navbar-right">
          <button className="search-btn">
            <img src={assets.search_icon} alt="Search" />
          </button>

          <Link to="/Cart" className="cart-btn">
            <img src={assets.basket_icon} alt="Cart" />
            {CartGetTotalAmount() > 0 && <span className="cart-badge"></span>}
          </Link>

          {!token ? (
            <button className="login-btn" onClick={() => setShowLogin(true)}>
              Login
            </button>
          ) : (
            <div className="profile-menu">
              <button
                className="profile-btn"
                onClick={toggleProfileMenu}
                aria-label="Toggle profile menu"
                aria-expanded={isProfileOpen}
              >
                <img src={assets.profile_icon} alt="Profile" />
              </button>
              <div
                className={`profile-dropdown ${isProfileOpen ? "show" : ""}`}
              >
                <button
                  onClick={() => {
                    navigate("/myorders");
                    setIsProfileOpen(false);
                  }}
                  className="dropdown-item"
                >
                  <img src={assets.bag_icon} alt="" />
                  <span>My Orders</span>
                </button>
                <button onClick={logout} className="dropdown-item">
                  <img src={assets.logout_icon} alt="" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
