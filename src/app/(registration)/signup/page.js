"use client";

import "@/app/dashboard.min.css";
import { handleLogin } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
};

export default function Signup() {
  const Router = useRouter();
  const [user, setUser] = useState(INITIAL_USER);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(user);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/auth/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data.token);
      Router.push("/dashboard");
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="container">
        <div className="card shadow-lg o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-flex">
                <div
                  className="flex-grow-1 bg-register-image"
                  style={{
                    backgroundImage:
                      'url("/dashboard/assets/img/dogs/image2.jpeg")',
                  }}
                />
              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Create an Account!</h4>
                  </div>
                  <form className="user" onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      {/* <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="exampleFirstName"
                          placeholder="First Name"
                          name="first_name"
                        />
                      </div> */}
                      <div>
                        <input
                          className="form-control form-control-user"
                          type="trst"
                          id="name"
                          placeholder="Name"
                          name="name"
                          onChange={handleChange}
                        />
                      </div>
                      {/* <div className="col-sm-6">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          id="exampleLastName"
                          placeholder="Last Name"
                          name="last_name"
                        />
                      </div> */}
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control form-control-user"
                        type="email"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email Address"
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="password"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          id="exampleRepeatPasswordInput"
                          placeholder="Repeat Password"
                          name="password_repeat"
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-primary d-block btn-user w-100"
                      type="submit"
                    >
                      Register Account
                    </button>
                    <hr />
                    <a
                      className="btn btn-primary d-block btn-google btn-user w-100 mb-2"
                      role="button"
                    >
                      <i className="fab fa-google" />
                      &nbsp; Register with Google
                    </a>
                    <a
                      className="btn btn-primary d-block btn-facebook btn-user w-100"
                      role="button"
                    >
                      <i className="fab fa-facebook-f" />
                      &nbsp; Register with Facebook
                    </a>
                    <hr />
                  </form>
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="/login">
                      Already have an account? Login!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script defer src="/dashboard/assets/bootstrap/js/bootstrap.min.js" />
      <Script defer src="/dashboard/assets/js/bs-init.js" />
      <Script defer src="/dashboard/assets/js/theme.js" />
    </>
  );
}
