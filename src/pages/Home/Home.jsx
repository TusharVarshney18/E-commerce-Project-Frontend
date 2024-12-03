import React, { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import ExploreMenu from "../../components/Explore Menu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/App Download/AppDownload";

function Home() {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
}

export default Home;
