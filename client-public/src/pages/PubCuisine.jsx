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
  const [category, setCategory] = useState([])
  function handleInputChange(event) {
    const { value } = event.target;
    find(value);
  }
  function handleInputSort(event) {
    const { value } = event.target;
    sort(value);
  }
  function handleInputFilter(event){
    const { value } = event.target;
    filter(value);
  }
  function filter(value){
    // if (value !== "") 
    setParams({...params, "filter" : value})
  }
  function sort(value){
    if (value === 1) {
      setParams({...params, "sort" : "id,asc"})
    }else{
      setParams({...params, "sort" : "id,desc"})
    }
  }
  function find(keyword) {
    setParams({ ...params, search: keyword });
  }
  function handlingPage(number) {
    setParams({ ...params, "page[number]": number });
  }
  async function FetchDataCategory(){
    try {
      const {data} = await axios({
        method : "get",
        url : `${BASE_URL}/category`
      })
      setCategory(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    FetchDataCategory()
  }, [])
  async function FetchData() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}/cuisine`,
        params: params,
      });
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
      <div className="container my-5">
        <Carousel />
        <div className="container my-5">
          <img
            style={{ width: "100%" }}
            src="https://res-console.cloudinary.com/dep5hbgsn/media_explorer_thumbnails/a99580c19d2a5942df8b8330ddb5359c/detailed"
            alt=""
          />
          <h2 className="text-center my-5">Available Food</h2>
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
                return <option value={item.id} key={index}>{item.name}</option>
              })}
            </select>
            <label htmlFor="floatingSelect">Filter By Category :</label>
          </div>
          <div className="row row-cols-4 g-3">
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
              <li className="page-item" key= {index}>
                <button
                  className="page-link"
                  onClick={() => handlingPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default PubCuisine;
