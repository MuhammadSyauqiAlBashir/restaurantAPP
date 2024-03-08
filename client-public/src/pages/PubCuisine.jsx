import Card from "../components/card";
import Carousel from "../components/carousel";
import Navbar from "../components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import SearchBar from "../components/searchbar";

function PubCuisine() {
  const [state, setState] = useState({ data: [] });
  const [params, setParams] = useState({});
  const [category, setCategory] = useState([]);
  function handleInputChange(event) {
    const { value } = event.target;
    find(value);
  }
  function handleInputSort(event) {
    const { value } = event.target;
    console.log({value})
    sort(value);
  }
  function handleInputFilter(event) {
    const { value } = event.target;
    filter(value);
  }
  function filter(value) {
    setParams({ ...params, filter: value });
  }
  function sort(value) {
    if (value == 1) {
      setParams({ ...params, sort: "id,asc" });
    } else {
      setParams({ ...params, sort: "id,desc" });
    }
  }
  function find(keyword) {
    setParams({ ...params, search: keyword });
  }
  function handlingPage(number) {
    setParams({ ...params, "page[number]": number });
  }
  async function FetchDataCategory() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}/categor`,
      });
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchDataCategory();
  }, []);
  async function FetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}/cuisine`,
        params: params,
      });
      console.log(params);
      setState(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchData();
  }, [params]);
  return (
    <>
      <Navbar FetchData={FetchData} />
      <div className="my-5">
        <Carousel />
        <div className="my-5">
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <img
            src="https://www.trvst.world/wp-content/uploads/2024/02/food-waste-quotes-carlo-petrini-there-is-9795.png"
            className="container p-5"
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          </div>
          <div className="container">
            <div className="bg-black bg-gradient" style={{height:80}}>
              <h2 className="text-center my-5 text-light">Available Food</h2>
            </div>
            <div
              className="input-group p-3 mb-4"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            >
              <SearchBar handleInputChange={handleInputChange} />
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={handleInputSort}
                >
                  <option value="1">Oldest</option>
                  <option value="2">Latest</option>
                </select>
                <label htmlFor="floatingSelect">Sort By :</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={handleInputFilter}
                >
                  <option value={""}>Show All</option>
                  {category.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingSelect">Filter By Category :</label>
              </div>
            </div>
            <div className="row row-cols-2 g-3">
              {state.data.map((item) => (
                <Card item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination d-flex justify-content-center">
            {new Array(state.totalPage).fill(0).map((item, index) => {
              return (
                <li className="page-item" key={index}>
                  <button
                    className="page-link link-light bg-transparent"
                    onClick={() => handlingPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default PubCuisine;
