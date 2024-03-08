import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import Swal from "sweetalert2";
import { redirect, useNavigate } from "react-router-dom";

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
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  }
  useEffect(() => {}, []);
  return (
    <>
      <form onSubmit={submitData}>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default AddUser;