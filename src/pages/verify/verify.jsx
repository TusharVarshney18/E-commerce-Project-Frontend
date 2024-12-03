import React, { useContext, useEffect } from "react";
import "./verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifypayment = async () => {
    try {
      // Send the success and orderId as part of the request body
      const response = await axios.post(`${url}api/orders/verify`, {
        orderId,
      });

      if (response.data.success) {
        navigate("/myorders"); // Navigate to orders if successful
      } else {
        navigate("/"); // Redirect to home on failure
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/"); // Handle errors by redirecting to home
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifypayment();
    }
  }, [success, orderId]); // Include dependencies to prevent unnecessary calls

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
