"use client";

import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { motion } from "framer-motion";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="explore-menu-section" id="explore-menu">
      <motion.div
        className="explore-menu-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>🍽️ Explore Our Gourmet Menu</h1>
        <p>
          Indulge in a curated selection of chef-crafted dishes designed to
          satisfy every craving.
        </p>
      </motion.div>

      <motion.div
        className="explore-menu-list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {menu_list.map((item, index) => (
          <motion.div
            className={`explore-menu-card ${
              category === item.menu_name ? "active" : ""
            }`}
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <div className="card-img-wrapper">
              <img src={item.menu_image} alt={item.menu_name} />
              <div className="card-glow" />
            </div>
            <h3>{item.menu_name}</h3>
          </motion.div>
        ))}
      </motion.div>

      <hr className="explore-divider" />
    </section>
  );
};

export default ExploreMenu;
