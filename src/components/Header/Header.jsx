"use client";

import { motion } from "framer-motion";
import "./Header.css";

const Header = () => {
  return (
    <section className="header-section">
      {/* Blurred Background Video */}
      <div className="header-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="header-video"
          src="https://cdn.pixabay.com/video/2020/03/05/33256-396487978_large.mp4" // Replace with your video
        />
      </div>

      {/* Overlay content */}
      <div className="header-overlay">
        <div className="header-content">
          <motion.h1
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Premium Food, Delivered Fast
          </motion.h1>

          <motion.p
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Craving something delicious? Get chef-crafted meals delivered hot &
            fresh at your doorstep.
          </motion.p>

          <motion.div
            className="header-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <button className="primary-btn">Order Now</button>
            <button className="secondary-btn">View Menu</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header;
