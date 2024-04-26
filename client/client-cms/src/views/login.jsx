import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../constant";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email : "",
        password : ""
    })
    function handleChange(event) {
        const {name, value} = event.target
        const newInput = {
            ...input
        }
        newInput[name] = value
        setInput(newInput)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const {data} = await axios({
                method : "post",
                url : BASE_URL + "login",
                data : input
            })
            localStorage.accessToken= data.newToken
            Swal.fire({
                title : "Success",
                icon : "success",
                timer : 2000,
                showConfirmButton: false
            })
            navigate('/')
        } catch (error) {
            Swal.fire({
                title : error.response.data.message,
                icon: "error"
            })
        }
    }
  return (
    <section style={{height : "100vh", backgroundColor : "white", alignItems :"space-between", display: "flex", flexDirection: "column"}}>
      <div className="container-fluid h-custom" style={{flexGrow:1}}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5 p-5">
            <img
              src="https://logowik.com/content/uploads/images/restaurant9491.logowik.com.webp"
              className="img-fluid"
              style={{marginLeft:80}}
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <h1 className="text-center fw-bold mx-0 mb-0">Login</h1>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="form3Example3"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                />
              </div>
              {/* Password input */}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
                <input
                  type="password"
                  id="form3Example4"
                  name="password"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    defaultValue=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a href="#!" className="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        {/* Copyright */}
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2024. All rights reserved.
        </div>
        {/* Copyright */}
        {/* Right */}
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter" />
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google" />
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        {/* Right */}
      </div>
    </section>
  );
}
export default Login;
