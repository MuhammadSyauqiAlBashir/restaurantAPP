import { useEffect, useState } from "react";
import Card from "../components/card";
import Carousel from "../components/carousel";

function PubCuisine({ state }) {
  // useEffect(() => {FetchData()}, [])
  console.log(state, "<<<<");
  return (
    <>
    <Carousel/>
    <div className="container my-5">
      <h2 className="text-center my-5">Available Food</h2>
      <div className="row row-cols-4 g-3">
        {state.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
    </>
  );
}

export default PubCuisine;
