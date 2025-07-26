// Offer.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import "./Offer.css";

const allOffers = [
  {
    title: "Flat 20% Off",
    description: "On your first online order! Use code: FIRST20",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    category: "veg",
  },
  {
    title: "Spicy Chicken Deal",
    description: "Buy 2 Get 1 Free on Chicken Wings",
    image:
      "https://cdn.pixabay.com/photo/2016/07/31/17/51/chicken-1559548_1280.jpg",
    category: "nonveg",
  },
  {
    title: "Veggie Lovers Combo",
    description: "Flat ₹50 off on orders above ₹300",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
    category: "veg",
  },
  {
    title: "Chinese Feast",
    description: "Free Spring Rolls on Chinese orders above ₹399",
    image:
      "https://cdn.pixabay.com/photo/2017/10/16/08/59/nem-2856543_1280.jpg",
    category: "chinese",
  },
  {
    title: "Tandoori Night",
    description: "Buy 1 Tandoori Platter, Get 1 Beer Free",
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696",
    category: "nonveg",
  },
  {
    title: "Paneer Makhani Combo",
    description: "Meal for 2 only ₹299",
    image:
      "https://cdn.pixabay.com/photo/2022/03/02/12/42/paneer-7043099_1280.jpg",
    category: "veg",
  },
  {
    title: "Momos Madness",
    description: "Get 10 Momos at ₹99",
    image:
      "https://cdn.pixabay.com/photo/2021/01/25/16/36/momo-5948840_1280.jpg",
    category: "chinese",
  },
  {
    title: "Family Bucket",
    description: "Bucket Meal for 4 at ₹499",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    category: "nonveg",
  },
  {
    title: "Schezwan Surprise",
    description: "Flat 30% Off on Schezwan Rice & Noodles",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    category: "chinese",
  },
  {
    title: "Healthy Green Bowl",
    description: "Order salad bowls with free juice",
    image:
      "https://cdn.pixabay.com/photo/2015/05/31/13/59/salad-791891_1280.jpg",
    category: "veg",
  },
  {
    title: "Butter Chicken Blast",
    description: "Buy 1, Get 1 Half Price",
    image:
      "https://cdn.pixabay.com/photo/2022/11/24/18/09/butter-chicken-7614835_1280.jpg",
    category: "nonveg",
  },
  {
    title: "Dim Sum Day",
    description: "Buy 2, Get 1 Dim Sum Free",
    image:
      "https://cdn.pixabay.com/photo/2017/08/28/11/19/food-2689205_1280.jpg",
    category: "chinese",
  },
  {
    title: "Midnight Munchies",
    description: "Order after 11 PM & get 15% Off",
    image:
      "https://cdn.pixabay.com/photo/2022/11/18/05/40/biriyani-7599454_1280.jpg",
    category: "nonveg",
  },
  {
    title: "Lunch Specials",
    description: "Combo Meals starting at ₹149",
    image:
      "https://cdn.pixabay.com/photo/2016/04/25/06/40/food-1351290_1280.jpg",
    category: "veg",
  },
  {
    title: "Desi Delights",
    description: "Traditional Thalis at ₹199",
    image:
      "https://cdn.pixabay.com/photo/2017/09/09/12/09/india-2731817_1280.jpg",
    category: "veg",
  },
  {
    title: "Chicken Zing Combo",
    description: "Zinger + Coke + Fries at ₹199",
    image:
      "https://cdn.pixabay.com/photo/2022/05/17/04/57/broasted-chicken-7201660_1280.jpg",
    category: "nonveg",
  },
  {
    title: "Asian Fusion",
    description: "Noodles + Manchurian Combo ₹249",
    image:
      "https://cdn.pixabay.com/photo/2015/04/06/16/21/korean-food-709606_1280.jpg",
    category: "chinese",
  },
  {
    title: "Quick Bites",
    description: "₹99 Snacks - Sandwich, Fries, Juice",
    image:
      "https://cdn.pixabay.com/photo/2017/05/31/02/56/food-photography-2358904_1280.jpg",
    category: "veg",
  },
];

const Offer = () => {
  const [filter, setFilter] = useState("all");
  const offers =
    filter === "all"
      ? allOffers
      : allOffers.filter((o) => o.category === filter);

  return (
    <>
      <div className="offer-section">
        <div className="marquee-coupon">
          <span>
            🎉 Use Code <strong>FOODIE50</strong> to Get{" "}
            <strong>50% OFF</strong> on Your First Order! 🍔🍕 Limited Time
            Only! 🎉
          </span>
        </div>

        <h2 className="offer-heading">🔥 Today's Special Offers</h2>

        <div className="offer-filter">
          {["all", "veg", "nonveg", "chinese"].map((cat) => (
            <button
              key={cat}
              className={filter === cat ? "active" : ""}
              onClick={() => setFilter(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="offer-grid">
          {offers.map((offer, index) => (
            <motion.div
              className="offer-card"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={offer.image} alt={offer.title} />
              <div className="offer-info">
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Offer;
