import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/storeContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, Removefromcart, CartGetTotalAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItemsList.map((item) => (
          <div key={item._id}>
            <div className="cart-items-item">
              <img src={url + "/images/" + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>₹{item.price * cartItems[item._id]}</p>
              <div
                onClick={() => Removefromcart(item._id)}
                className="cross"
                role="button"
                aria-label="Remove item"
              >
                ×
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{CartGetTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₹{CartGetTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{CartGetTotalAmount() === 0 ? 0 : CartGetTotalAmount() + 2}
              </b>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            disabled={CartGetTotalAmount() === 0}
          >
            Proceed To Checkout
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If You have Promo Code , Enter it here</p>
            <div className="cart-promo-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
