import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Loginpopup from "./components/Loginpopup/Loginpopup";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Verify from "./pages/verify/verify";
import MyOrders from "./pages/myorders/myOrders";

const App = () => {
  const [showlogin, setShowLogin] = useState(false);

  return (
    <>
      {showlogin ? <Loginpopup setShowLogin={setShowLogin} /> : <></>}
      <div className="App">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/order" element={<PlaceOrder />}></Route>
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
