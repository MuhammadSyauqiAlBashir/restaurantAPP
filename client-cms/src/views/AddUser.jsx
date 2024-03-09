import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import Swal from "sweetalert2";
import { redirect, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function AddUser() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    const newInput = {
      ...input,
    };
    newInput[name] = value;
    setInput(newInput);
  }
  async function submitData(event) {
    event.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: `${BASE_URL}add-user`,
        headers: {
          Authorization: `Bearer ` + localStorage.accessToken,
        },
        data: input,
      });
      Swal.fire({
        title: "Success Add Staff",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      if (error.response.data.message) {
        Swal.fire({
          title: error.response.data.message,
          icon: "error"
        });
      }else{
        Swal.fire({
          title: error.response.data[0],
          icon: "error",
        });
      }
    }
  }
  useEffect(() => {}, []);
  return (
    <>
      <div
        className="text-light position-absolute top-50 start-50 translate-middle"
        style={{
          backgroundColor: "rgba(115, 115, 115, 0.5)",
          height: 500,
          width: 900,
        }}
      >
        <form
          onSubmit={submitData}
          style={{ width: 500 }}
          className="position-absolute top-50 start-50 translate-middle"
        >
          <h1 style={{ marginLeft: 35 }} className="mb-4">
            Add Staff (Admin Only)
          </h1>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">
              Email
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                name="email"
                className="form-control"
                id="inputEmail3"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">
              Passowrd
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="inputPassword3"
                name="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword2" className="col-sm-3 col-form-label">
              Phone Number
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="inputPassword2"
                name="phoneNumber"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword5" className="col-sm-3 col-form-label">
              Adress
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="inputPassword5"
                name="address"
                onChange={handleChange}
              />
            </div>
          </div>
          <Button ButtonType={"Submit"} />
        </form>
      </div>
    </>
  );
}

export default AddUser;
