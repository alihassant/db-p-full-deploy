"use client";

import "@/app/dashboard.min.css";
import { handleLogin } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";

const INITIAL_USER = {
  email: "",
  password: "",
};

export default function Login() {
  const Router = useRouter();
  const [user, setUser] = useState(INITIAL_USER);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(user);
  // console.log(process.env.BASE_URL);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = `${process.env.BASE_URL}/api/auth/login`;
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
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div
                      className="flex-grow-1 bg-login-image"
                      style={{
                        backgroundImage:
                          'url("/dashboard/assets/img/dogs/image3.jpeg")',
                      }}
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome Back!</h4>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="email"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="custom-control custom-checkbox small">
                            <div className="form-check">
                              <input
                                className="form-check-input custom-control-input"
                                type="checkbox"
                                id="formCheck-1"
                              />
                              <label
                                className="form-check-label custom-control-label"
                                htmlFor="formCheck-1"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary d-block btn-user w-100"
                          type="submit"
                        >
                          Login
                        </button>
                        <hr />
                        <a
                          className="btn btn-primary d-block btn-google btn-user w-100 mb-2"
                          role="button"
                        >
                          <i className="fab fa-google" />
                          &nbsp; Login with Google
                        </a>
                        <a
                          className="btn btn-primary d-block btn-facebook btn-user w-100"
                          role="button"
                        >
                          <i className="fab fa-facebook-f" />
                          &nbsp; Login with Facebook
                        </a>
                        <hr />
                      </form>
                      <div className="text-center">
                        <a className="small" href="#">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <a className="small" href="/signup">
                          Create an Account!
                        </a>
                      </div>
                    </div>
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
