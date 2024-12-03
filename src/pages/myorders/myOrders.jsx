import React, { useContext, useEffect, useState } from "react";
import "./myOrders.css";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      console.log(response.data.data); // Debugging
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div className="order-details">
                <p>
                  <b>Items:</b>{" "}
                  {order.items
                    .map((item, index) => `${item.name} x${item.quantity}`)
                    .join(", ")}
                </p>
                <p>
                  <b>Total Amount:</b> ₹{order.amount}.00
                </p>
                <p>
                  <b>Status:</b> {order.status}
                </p>
                <p>
                  <b>Payment Method:</b> {order.paymentMethod}
                </p>
                <p>
                  <b>Payment Status:</b>{" "}
                  {order.paymentStatus ? "Paid" : "Pending"}
                </p>
                <p>
                  <b>Delivery Address:</b>{" "}
                  {`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}, ${order.address.country}`}
                </p>
              </div>
              <button onClick={fetchOrder}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
