import { useEffect, useState } from "react";
import Card from "../components/card";
import Carousel from "../components/carousel";
import Navbar from "../components/navbar";

function PubCuisine({ state }) {
  // useEffect(() => {FetchData()}, [])
  console.log(state, "<<<<");
  return (
    <>
    <div className="container my-5">
    <Navbar/>
    <Carousel/>
    <div className="container my-5">
    <img style={{width: "100%"}} src="https://res-console.cloudinary.com/dep5hbgsn/media_explorer_thumbnails/a99580c19d2a5942df8b8330ddb5359c/detailed" alt="" />
      <h2 className="text-center my-5">Available Food</h2>
      <div className="row row-cols-4 g-3">
        {state.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      </div>
    </div>
    </>
  );
}

export default PubCuisine;
