import React, { useContext } from "react";
import "./Fooditem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/storeContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addtocart, Removefromcart, url } =
    useContext(StoreContext);

  // Set max description length and handle truncation
  const maxDescriptionLength = 100;
  const truncatedDescription =
    description.length > maxDescriptionLength
      ? `${description.slice(0, maxDescriptionLength)}...`
      : description;

  // Check if item is in the cart
  const isInCart = cartItems[id] > 0;

  return (
    <div className="Food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image}`}
          alt={`${name} image`}
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
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-dis">{truncatedDescription}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
