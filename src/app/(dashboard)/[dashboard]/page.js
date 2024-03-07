"use client";

import revalidateDataPath from "@/app/actions";
import action from "@/app/actions";
import "@/app/dashboard.min.css";
import Footer from "@/components/dashboard/Footer";
import Loading from "@/components/dashboard/Loading";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import SuperAdminPanel from "@/components/dashboard/superAdmin/SuperAdminPanel";
import axios from "axios";
import Script from "next/script";
import { useEffect, useState } from "react";

const INITIAL_DB_NAME = {
  name: "",
  userId: "",
  tH1: "",
  tH2: "",
  tH3: "",
  tH4: "",
  tH5: "",
};

export default function Dashboard() {
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [dbNew, setNewDb] = useState(INITIAL_DB_NAME);
  // getting user data
  const [user, setUser] = useState();
  const getUser = async () => {
    try {
      // console.log("getUser called");
      const response = await fetch("/api/users/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const userData = await response.json();
        action("/dashboard");
        const { user } = userData;
        // console.log(user);
        // const user = { ...userData };
        if (user) {
          setUser(user);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // creating database
  const [db, setDb] = useState(INITIAL_DB_NAME);
  useEffect(() => {
    getUser();
  }, [dbNew]);
  // finish getting user data
  INITIAL_DB_NAME.userId = user?._id;

  function handleChange(e) {
    const { name, value } = e.target;
    setDb((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(db);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccessMessage(null);
      setError(null);
      const url = `https://good-puce-elephant-tie.cyclic.app/api/db/createDatabase`;
      const payload = { ...db };
      setNewDb(payload);
      const response = await axios.post(url, payload);
      setSuccessMessage(response.data.message);
      // console.log(response.data);
    } catch (err) {
      // console.log(err.response.data.message);
      // console.log(err);
      setError(err.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      revalidateDataPath("/dashboard");
      setLoading(false);
    }
  }
  // finish creating database
  // console.log(user);

  return (
    <>
      {(user && (
        <div id="wrapper">
          <Sidebar user={user} />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Navbar user={user} id="pageTop" />
              <div className="container-fluid">
                <div className="d-sm-flex justify-content-between align-items-center mb-4">
                  <h3 className="text-dark mb-0">Dashboard</h3>
                  <a
                    className="btn btn-primary btn-sm d-none d-sm-inline-block"
                    role="button"
                    href="#"
                  >
                    <i className="fas fa-download fa-sm text-white-50" />
                    &nbsp;Generate Report
                  </a>
                </div>
                <div className="row">
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-primary py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                              <span>Total Databases</span>
                            </div>
                            <div className="text-dark fw-bold h5 mb-0">
                              <span>{user.databases.length}</span>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-database fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-primary py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                              <span>Total Posts</span>
                            </div>
                            <div className="text-dark fw-bold h5 mb-0">
                              <span>{user.entries.length}</span>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-file fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-info py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-info fw-bold text-xs mb-1">
                              <span>Tasks</span>
                            </div>
                            <div className="row g-0 align-items-center">
                              <div className="col-auto">
                                <div className="text-dark fw-bold h5 mb-0 me-3">
                                  <span>50%</span>
                                </div>
                              </div>
                              <div className="col">
                                <div className="progress progress-sm">
                                  <div
                                    className="progress-bar bg-info"
                                    aria-valuenow={50}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "50%" }}
                                  >
                                    <span className="visually-hidden">50%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card shadow border-start-warning py-2">
                      <div className="card-body">
                        <div className="row align-items-center no-gutters">
                          <div className="col me-2">
                            <div className="text-uppercase text-warning fw-bold text-xs mb-1">
                              <span>Pending Requests</span>
                            </div>
                            <div className="text-dark fw-bold h5 mb-0">
                              <span>18</span>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-comments fa-2x text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-7 col-xl-8">
                    <div className="card shadow mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="text-primary fw-bold m-0">
                          Create Database
                        </h6>
                      </div>
                      <div className="card-body">
                        {loading && <Loading />}
                        <form
                          onSubmit={handleSubmit}
                          className="needs-validation"
                          noValidate
                        >
                          {error && (
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          )}
                          {successMessage && (
                            <div className="alert alert-success" role="alert">
                              {successMessage}
                            </div>
                          )}
                          <div className="row">
                            <div className="col">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="username"
                                >
                                  <strong>Database Name:</strong>
                                </label>
                                <input
                                  onChange={handleChange}
                                  className="form-control"
                                  type="text"
                                  id="name"
                                  placeholder="Database Name"
                                  name="name"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row g-3 mb-3">
                            <div className="col">
                              <label className="form-label" htmlFor="tH1">
                                <strong>Data Header 1</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Data Header 1"
                                aria-label="Data Header 1"
                                name="tH1"
                                id="tH1"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col">
                              <label className="form-label" htmlFor="tH1">
                                <strong>Data Header 2</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Data Header 2"
                                aria-label="Data Header 2"
                                name="tH2"
                                id="tH2"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col">
                              <label className="form-label" htmlFor="tH1">
                                <strong>Data Header 3</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Data Header 3"
                                aria-label="Data Header 3"
                                name="tH3"
                                id="tH3"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col">
                              <label className="form-label" htmlFor="tH1">
                                <strong>Data Header 4</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Data Header 4"
                                aria-label="Data Header 4"
                                name="tH4"
                                id="tH4"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col">
                              <label className="form-label" htmlFor="tH1">
                                <strong>Data Header 5</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Data Header 5"
                                aria-label="Data Header 5"
                                name="tH5"
                                id="tH5"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col">
                              <label className="form-label" htmlFor="tH1">
                                <strong>Data Header 6</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Data Header 6"
                                aria-label="Data Header 6"
                                name="tH6"
                                id="tH6"
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                            >
                              Create Database
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {user.extraRole === "superAdmin" ? (
                    <SuperAdminPanel user={user} />
                  ) : (
                    <>
                      <div className="col-lg-5 col-xl-4">
                        <div className="card shadow mb-4">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="text-primary fw-bold m-0">
                              User Panel
                            </h6>
                          </div>
                          <div
                            className="card-body"
                            style={{ minHeight: "165px" }}
                          >
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <strong>User Panel</strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="text-primary fw-bold m-0">Projects</h6>
                      </div>
                      <div className="card-body">
                        <h4 className="small fw-bold">
                          Server migration<span className="float-end">20%</span>
                        </h4>
                        <div className="progress mb-4">
                          <div
                            className="progress-bar bg-danger"
                            aria-valuenow={20}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "20%" }}
                          >
                            <span className="visually-hidden">20%</span>
                          </div>
                        </div>
                        <h4 className="small fw-bold">
                          Sales tracking<span className="float-end">40%</span>
                        </h4>
                        <div className="progress mb-4">
                          <div
                            className="progress-bar bg-warning"
                            aria-valuenow={40}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "40%" }}
                          >
                            <span className="visually-hidden">40%</span>
                          </div>
                        </div>
                        <h4 className="small fw-bold">
                          Customer Database
                          <span className="float-end">60%</span>
                        </h4>
                        <div className="progress mb-4">
                          <div
                            className="progress-bar bg-primary"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "60%" }}
                          >
                            <span className="visually-hidden">60%</span>
                          </div>
                        </div>
                        <h4 className="small fw-bold">
                          Payout Details<span className="float-end">80%</span>
                        </h4>
                        <div className="progress mb-4">
                          <div
                            className="progress-bar bg-info"
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "80%" }}
                          >
                            <span className="visually-hidden">80%</span>
                          </div>
                        </div>
                        <h4 className="small fw-bold">
                          Account setup
                          <span className="float-end">Complete!</span>
                        </h4>
                        <div className="progress mb-4">
                          <div
                            className="progress-bar bg-primary"
                            aria-valuenow={100}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "100%" }}
                          >
                            <span className="visually-hidden">100%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="text-primary fw-bold m-0">Todo List</h6>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                              <h6 className="mb-0">
                                <strong>Lunch meeting</strong>
                              </h6>
                              <span className="text-xs">10:30 AM</span>
                            </div>
                            <div className="col-auto">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="formCheck-1"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="formCheck-1"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                              <h6 className="mb-0">
                                <strong>Lunch meeting</strong>
                              </h6>
                              <span className="text-xs">11:30 AM</span>
                            </div>
                            <div className="col-auto">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="formCheck-2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="formCheck-2"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="row align-items-center no-gutters">
                            <div className="col me-2">
                              <h6 className="mb-0">
                                <strong>Lunch meeting</strong>
                              </h6>
                              <span className="text-xs">12:30 AM</span>
                            </div>
                            <div className="col-auto">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="formCheck-3"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="formCheck-3"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-lg-6 mb-4">
                        <div className="card text-white bg-primary shadow">
                          <div className="card-body">
                            <p className="m-0">Primary</p>
                            <p className="text-white-50 small m-0">#4e73df</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-4">
                        <div className="card text-white bg-success shadow">
                          <div className="card-body">
                            <p className="m-0">Success</p>
                            <p className="text-white-50 small m-0">#1cc88a</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-4">
                        <div className="card text-white bg-info shadow">
                          <div className="card-body">
                            <p className="m-0">Info</p>
                            <p className="text-white-50 small m-0">#36b9cc</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-4">
                        <div className="card text-white bg-warning shadow">
                          <div className="card-body">
                            <p className="m-0">Warning</p>
                            <p className="text-white-50 small m-0">#f6c23e</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-4">
                        <div className="card text-white bg-danger shadow">
                          <div className="card-body">
                            <p className="m-0">Danger</p>
                            <p className="text-white-50 small m-0">#e74a3b</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-4">
                        <div className="card text-white bg-secondary shadow">
                          <div className="card-body">
                            <p className="m-0">Secondary</p>
                            <p className="text-white-50 small m-0">#858796</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          <a className="border rounded d-inline scroll-to-top" href="#pageTop">
            <i className="fas fa-angle-up"></i>
          </a>
        </div>
      )) || <Loading />}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js" />
      <Script defer src="/dashboard/assets/js/bs-init.js" />
      <Script defer src="/dashboard/assets/js/theme.js" /> */}
    </>
  );
}
