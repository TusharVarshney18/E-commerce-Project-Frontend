import { useContext, useEffect, useState } from "react";
import "./myOrders.css";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token, url]);

  if (loading) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="no-orders">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="no-orders">{error}</div>
      </div>
    );
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <div className="no-orders">No orders found.</div>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <div className="order-header">
                <img src={assets.parcel_icon} alt="Order" />
                <h3>Order #{order._id.slice(-6)}</h3>
              </div>

              <div className="order-details">
                <p>
                  <b>Items:</b>
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} × {item.quantity}
                      {i < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p>
                  <b>Total Amount:</b>
                  <span>₹{order.amount.toFixed(2)}</span>
                </p>
                <p>
                  <b>Status:</b>
                  <span>{order.status}</span>
                </p>
                <p>
                  <b>Payment Method:</b>
                  {order.paymentMethod}
                </p>
                <p>
                  <b>Payment Status:</b>
                  <span>{order.paymentStatus ? "Paid" : "Pending"}</span>
                </p>
                <p>
                  <b>Delivery Address:</b>
                  {order.address &&
                    `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zipcode}, ${order.address.country}`}
                </p>
              </div>

              <div className="order-footer">
                <p>
                  <b>Order Date:</b>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <button
                  className="track-order-btn"
                  onClick={() => fetchOrder()}
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
