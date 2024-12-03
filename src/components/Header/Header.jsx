import React from "react";
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
      />
      <div className="header-contents">
        <h2>Order your favourite Item here</h2>
        <p>
          choosing your favorite healthy items can lead to a more balanced and
          satisfying diet, while also providing numerous health benefits. By
          incorporating a variety of fruits, vegetables, whole grains, lean
          proteins, and healthy fats, we can nourish our bodies and support our
          overall health and well-being.
        </p>
        <button> view menu</button>
      </div>
    </div>
  );
};

export default Header;
