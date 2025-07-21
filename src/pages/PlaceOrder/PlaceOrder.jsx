import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const PlaceOrder = () => {
  const { CartGetTotalAmount, token, food_list, cartItems, setCartItem, url } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangehandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (!token || CartGetTotalAmount() === 0) {
      navigate("/cart");
    }
  }, [token, CartGetTotalAmount, navigate]);

  const placeOrder = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const orderItems = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
          ...item,
          quantity: cartItems[item._id],
        }));

      const orderData = {
        items: orderItems,
        amount: CartGetTotalAmount(),
        paymentMethod: "online",
        address: {
          firstname: data.firstname,
          lastname: data.lastname,
          street: data.street,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
          country: data.country,
          phone: data.phone,
        },
      };

      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const { order: razorpayOrder, orderId } = response.data;

        const options = {
          key: razorpayKey,
          amount: CartGetTotalAmount() * 100,
          currency: "INR",
          name: "Order Payment",
          description: "Payment for your order",
          order_id: razorpayOrder.id,
          prefill: {
            name: `${data.firstname} ${data.lastname}`,
            email: data.email,
            contact: data.phone,
          },
          theme: { color: "#ff4b2b" },
          handler: async (paymentResult) => {
            try {
              const verifyResponse = await axios.post(
                `${url}/api/order/verify`,
                {
                  orderId,
                  razorpay_payment_id: paymentResult.razorpay_payment_id,
                  razorpay_order_id: paymentResult.razorpay_order_id,
                  razorpay_signature: paymentResult.razorpay_signature,
                },
                { headers: { token } }
              );

              if (verifyResponse.data.success) {
                setCartItem({});
                navigate("/myorders");
              } else {
                alert("Payment verification failed. Please try again.");
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
              alert("Payment verification failed. Please try again.");
            }
          },
          modal: {
            ondismiss: () => {
              setIsSubmitting(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Order placement failed. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <h1 className="title">Delivery Information</h1>

        <div className="multiple-fields">
          <div className="input-group">
            <label className="input-label" htmlFor="firstname">
              First Name
            </label>
            <input
              required
              id="firstname"
              name="firstname"
              onChange={onchangehandler}
              value={data.firstname}
              type="text"
              placeholder="Enter your first name"
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="lastname">
              Last Name
            </label>
            <input
              required
              id="lastname"
              name="lastname"
              onChange={onchangehandler}
              value={data.lastname}
              type="text"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email Address
          </label>
          <input
            required
            id="email"
            name="email"
            onChange={onchangehandler}
            value={data.email}
            type="email"
            placeholder="Enter your email address"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="street">
            Street Address
          </label>
          <input
            required
            id="street"
            name="street"
            onChange={onchangehandler}
            value={data.street}
            type="text"
            placeholder="Enter your street address"
          />
        </div>

        <div className="multiple-fields">
          <div className="input-group">
            <label className="input-label" htmlFor="city">
              City
            </label>
            <input
              required
              id="city"
              name="city"
              onChange={onchangehandler}
              value={data.city}
              type="text"
              placeholder="Enter your city"
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="state">
              State
            </label>
            <input
              required
              id="state"
              name="state"
              onChange={onchangehandler}
              value={data.state}
              type="text"
              placeholder="Enter your state"
            />
          </div>
        </div>

        <div className="multiple-fields">
          <div className="input-group">
            <label className="input-label" htmlFor="zipcode">
              ZIP Code
            </label>
            <input
              required
              id="zipcode"
              name="zipcode"
              onChange={onchangehandler}
              value={data.zipcode}
              type="text"
              placeholder="Enter ZIP code"
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="country">
              Country
            </label>
            <input
              required
              id="country"
              name="country"
              onChange={onchangehandler}
              value={data.country}
              type="text"
              placeholder="Enter your country"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="phone">
            Phone Number
          </label>
          <input
            required
            id="phone"
            name="phone"
            onChange={onchangehandler}
            value={data.phone}
            type="tel"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Order Summary</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{CartGetTotalAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{CartGetTotalAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total Amount</b>
            <b>₹{CartGetTotalAmount() === 0 ? 0 : CartGetTotalAmount() + 2}</b>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
