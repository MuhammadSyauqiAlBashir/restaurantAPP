import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import Swal from "sweetalert2";
import { redirect, useNavigate } from "react-router-dom";
import ModalFormAdd from "./ModalFormAdd";

function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    const newInput = {
      ...input,
    };
    newInput[name] = value;
    setInput(newInput);
  }
  const [add, setAdd] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "https://bismillah.watersnj.com/cuisine",
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
        data: input,
      });
      setAdd("done");
    } catch (error) {
      Swal.fire({
        title: error,
        icon: "error",
      });
    }
  };
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  async function FetchDataCategory() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}category`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
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
        url: `${BASE_URL}cuisine`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      setData(data);
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
      navigate("/login");
    }
  }
  useEffect(() => {
    FetchData();
  }, [add]);
  return (
    <>
      <div className="container">
        <button
          type="button"
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add Cuisine
        </button>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <ModalFormAdd
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            category={category}
          />
        </div>

        <table className="table align-middle table-striped container">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col" width="250px">
                Image
              </th>
              <th scope="col" width="250px">
                Description
              </th>
              <th scope="col">Price</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <img src={item.imgUrl} style={{ width: 200 }} alt="" />
                  </td>
                  <td>{item.description}</td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.price)}
                  </td>
                  <td>{item.User.email}</td>
                  <td>{item.Category.name}</td>
                  <td>
                    <button className="btn btn-warning">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
