import React, { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/storeContext";
import PropTypes from "prop-types";

const ITEMS_PER_PAGE = 8; // Number of items to show per page

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filter food items based on category
  const filteredFoodList = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredFoodList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredFoodList.slice(startIndex, endIndex);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300);
    // Scroll to top of food display
    document
      .getElementById("food-display")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {!isLoading && currentItems.length > 0
          ? currentItems.map((item, index) => (
              <div className="food-item" key={item._id || index}>
                <span className="category-badge">{item.category}</span>
                <div className="food-item-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="food-item-content">
                  <h3 className="food-item-title">{item.name}</h3>
                  <p className="food-item-description">{item.description}</p>
                  <div className="food-item-bottom">
                    <span className="food-item-price">
                      ${item.price.toFixed(2)}
                    </span>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          : // Show multiple skeleton cards while loading
            Array.from({ length: 4 }).map((_, index) => (
              <div className="food-item skeleton" key={index}>
                <div className="food-item-image skeleton"></div>
                <div className="food-item-content">
                  <div className="food-item-title skeleton"></div>
                  <div className="food-item-description skeleton"></div>
                  <div className="food-item-bottom skeleton"></div>
                </div>
              </div>
            ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((num) => {
                // Show first page, last page, current page, and pages around current
                return (
                  num === 1 ||
                  num === totalPages ||
                  Math.abs(currentPage - num) <= 1
                );
              })
              .map((number, index, array) => (
                <React.Fragment key={number}>
                  {index > 0 && array[index - 1] !== number - 1 && (
                    <span className="pagination-dots">...</span>
                  )}
                  <button
                    className={`pagination-number ${
                      currentPage === number ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </button>
                </React.Fragment>
              ))}
          </div>

          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Results Counter */}
      <div className="results-counter">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredFoodList.length)}{" "}
        of {filteredFoodList.length} items
      </div>
    </div>
  );
};

// Add prop types validation
FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default FoodDisplay;
