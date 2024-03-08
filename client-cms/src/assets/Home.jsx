import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import Swal from "sweetalert2";
import { redirect, useNavigate } from "react-router-dom";
import ModalFormAddEdit from "./ModalFormAddEdit";
import PatchDataImage from "./ModalPatchImage";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(0);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
  });
  function clearEdit() {
    setEdit(0);
  }
  const [deletecuisineparams, setDeletecuisine] = useState(0);
  async function deleteCuisine() {
    try {
      const { data } = await axios({
        method: "delete",
        url: `${BASE_URL}cuisine/${deletecuisineparams}`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      FetchData();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (deletecuisineparams) deleteCuisine();
  }, [deletecuisineparams]);
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
      let config = {
        method: "post",
        url: `${BASE_URL}cuisine`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
        data: input,
      };
      if (edit !== 0) {
        (config.method = "put"),
          (config.url = "https://bismillah.watersnj.com/cuisine/" + edit);
      }
      const { data } = await axios(config);
      setAdd("done");
      setInput({
        name: "",
        description: "",
        price: "",
        imgUrl: "",
        categoryId: "",
      });
    } catch (error) {
      Swal.fire({
        title: error.response.data[0],
        icon: "error",
      });
    }
  };
  const [data1, setData1] = useState([]);
  async function FetchDataEdit() {
    try {
      const { data } = await axios({
        method: "get",
        url: `${BASE_URL}cuisine/${edit}`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
      });
      setInput({
        name: data.name,
        description: data.description,
        price: data.price,
        imgUrl: data.imgUrl,
        categoryId: data.categoryId,
      });
    } catch (error) {
        console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
      navigate("/login");
    }
  }
  useEffect(() => {
    if (edit > 0) {
      FetchDataEdit();
    }
  }, [edit]);
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
  const [currentImage, setCurrentImage] = useState(null);
  const [idPatch, setIdPatch] = useState(0);
  const HandleImageChange = (event) => {
    const image = event.target.files[0];
    setCurrentImage(image);
  };
  const HandlePatchImage = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", currentImage);
      const { data } = await axios({
        method: "patch",
        url: `${BASE_URL}cuisine/${idPatch}`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      FetchData();
    }
  };
  if (loading) {
    return (
      <div
        className="spinner-border text-info container d-flex justify-content-center align-items-center"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <>
      <div className="container d-flex flex-column" style={{marginLeft:210}}>
        <button
          style={{ width: 200}}
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => clearEdit()}
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
          <ModalFormAddEdit
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            category={category}
            edit={edit}
            input={input}
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
                    <button
                      type="button"
                      className="btn btn-warning mt-3"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => {
                        setEdit(item.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mt-3 ms-3"
                      onClick={() => {
                        setDeletecuisine(item.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mt-3 ms-2"
                      data-bs-toggle="modal"
                      data-bs-target="#Patch"
                      onClick={() => {
                        setIdPatch(item.id);
                      }}
                    >
                      Change Image
                    </button>
                    <div
                      className="modal fade"
                      id="Patch"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex={-1}
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <PatchDataImage
                        HandleImageChange={HandleImageChange}
                        HandlePatchImage={HandlePatchImage}
                      />
                    </div>
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
