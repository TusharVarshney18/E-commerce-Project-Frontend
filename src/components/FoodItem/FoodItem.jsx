"use client";

import React, { useContext } from "react";
import "./Fooditem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/storeContext";
import { motion } from "framer-motion";

const FoodItem = ({ id, name, price, description = "", image = "" }) => {
  const { cartItems, addtocart, Removefromcart, url } =
    useContext(StoreContext);

  const maxDescriptionLength = 100;
  const truncatedDescription =
    description.length > maxDescriptionLength
      ? `${description.slice(0, maxDescriptionLength)}...`
      : description;

  const isInCart = cartItems[id] > 0;
  const imageUrl = image.startsWith("http") ? image : `${url}/images/${image}`;

  return (
    <motion.div
      className="food-item"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={imageUrl}
          alt={`${name || "Food"} image`}
          loading="lazy"
        />

        {!isInCart ? (
          <img
            className="add"
            onClick={() => addtocart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => Removefromcart(id)}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addtocart(id)}
              src={assets.add_icon_green}
              alt="Add more to cart"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="food-item-title">{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{truncatedDescription}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </motion.div>
  );
};

export default FoodItem;
