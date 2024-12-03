import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    CartGetTotalAmount,
    token,
    food_list,
    cartItems,
    setCartItem,
    url,
    key,
  } = useContext(StoreContext);

  const navigate = useNavigate();

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

    try {
      const orderItems = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
          ...item,
          quantity: cartItems[item._id],
        }));

      const orderData = {
        userId: token,
        items: orderItems,
        amount: CartGetTotalAmount(),
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
        paymentMethod: "online",
      };

      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { order: razorpayOrder, orderId } = response.data;

        const options = {
          key: key,
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
          theme: { color: "#3399cc" },
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
                setCartItem({}); // Clear cart after successful payment
                navigate("/myorders");
              } else {
                console.error(
                  "Payment verification failed:",
                  verifyResponse.data.message
                );
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
            }
          },
          modal: {
            ondismiss: () => {
              console.log("Payment popup closed.");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Order placement failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multiple-fields">
          <input
            required
            name="firstname"
            onChange={onchangehandler}
            value={data.firstname}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            type="text"
            name="lastname"
            onChange={onchangehandler}
            value={data.lastname}
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onchangehandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={onchangehandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multiple-fields">
          <input
            required
            name="city"
            onChange={onchangehandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onchangehandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multiple-fields">
          <input
            required
            name="zipcode"
            onChange={onchangehandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onchangehandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onchangehandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${CartGetTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${CartGetTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${CartGetTotalAmount() === 0 ? 0 : CartGetTotalAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">Proceed To Checkout</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
