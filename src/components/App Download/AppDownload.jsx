import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <section className="app-download" id="App-download">
      <div className="app-download-glass">
        <h2>Get the Full Tomato Experience</h2>
        <p>
          Download the Tomato App for exclusive deals, faster checkout,
          real-time order tracking and a smoother experience!
        </p>
        <div className="app-download-platforms">
          <img src={assets.play_store} alt="Get it on Play Store" />
          <img src={assets.app_store} alt="Download on App Store" />
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
