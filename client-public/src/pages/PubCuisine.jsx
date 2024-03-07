import Card from "../components/card";
import Carousel from "../components/carousel";
import Navbar from "../components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";

function PubCuisine() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState("")
  function handlingPage(number){
    setPage(`?page[number]=${number}`)
    console.log(`${BASE_URL}${page}`)
  }
  async function FetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}${page}`,
      });
      setState(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchData();
  }, [page]);
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <Carousel />
        <div className="container my-5">
          <img
            style={{ width: "100%" }}
            src="https://res-console.cloudinary.com/dep5hbgsn/media_explorer_thumbnails/a99580c19d2a5942df8b8330ddb5359c/detailed"
            alt=""
          />
          <h2 className="text-center my-5">Available Food</h2>
          <div className="row row-cols-4 g-3">
            {state.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item"><button class="page-link" onClick={() => handlingPage(1)}>1</button></li>
        <li class="page-item"><button class="page-link" onClick={() => handlingPage(2)}>2</button></li>
        <li class="page-item"><button class="page-link" onClick={() => handlingPage(3)}>3</button></li>
      </ul>
    </nav>
    </>
  );
}

export default PubCuisine;
