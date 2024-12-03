import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="Logo-image" src={assets.logoIcon} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            nesciunt, incidunt aperiam iste ratione hic ea quos modi veniam ut,
            architecto non rerum eius accusantium dignissimos excepturi dolorum
            aut. Corporis!
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li> Home</li>
            <li>About us</li>
            <li>Delievery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+1-11-323213-1</li>
            <li>contact@#Tomoto.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ - All right Reserved</p>
    </div>
  );
};

export default Footer;
