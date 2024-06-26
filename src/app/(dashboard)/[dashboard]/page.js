"use client";

import revalidateDataPath from "@/app/actions";
import action from "@/app/actions";
import "@/app/dashboard.min.css";
import Loading from "@/components/dashboard/Loading";
import SuperAdminPanel from "@/components/dashboard/superAdmin/SuperAdminPanel";
import axios from "axios";
import Script from "next/script";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import UserPanel from "@/components/dashboard/userPanel/UserPanel";
import checkRemainingDbs from "@/helpers/checkRemainingDbs";
import ToDo from "@/components/dashboard/ToDo";

const INITIAL_DB_NAME = {
  name: "",
  userId: "",
  totalHeaders: "",
  media: false,
  emails: false,
  notifications: false,
};

const MAX_NUMBER = 10;

const MIN_NUMBER = 3;

export default function Dashboard() {
  const searchParams = useSearchParams();
  const successParam = searchParams.get("success") || "";

  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [fieldsNum, setFieldsNum] = useState(0);

  // getting user data
  const [user, setUser] = useState();
  const getUser = async () => {
    try {
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
        if (user) {
          setUser(user);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(user);
  // creating database
  const [db, setDb] = useState(INITIAL_DB_NAME);
  useEffect(() => {
    getUser();
  }, []);
  // finish getting user data
  INITIAL_DB_NAME.userId = user?._id;

  const userUpdate = async () => {
    try {
      const token = Cookies.get("token");
      const url = `https://tired-blue-worm.cyclic.app/api/subscription/updateUserSubscription`;
      const response = await axios.patch(
        url,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        action("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user && successParam === "true") {
      userUpdate();
      console.log("user updated");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function handleFieldsNum(e) {
    const { name, value } = e.target;
    setFieldsNum(value);
    setDb((prev) => ({ ...prev, [name]: value }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDb((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccessMessage(null);
      setError(null);
      if (fieldsNum < MIN_NUMBER || fieldsNum > MAX_NUMBER) {
        setError(
          `Number of fields should be between ${MIN_NUMBER} and ${MAX_NUMBER}`
        );
        setTimeout(() => {
          setError(null);
        }, 5000);
        setLoading(false);
        return;
      }

      const remainingDbsCheck = checkRemainingDbs(
        user.currentPlan,
        user.databases.length
      );

      if (!remainingDbsCheck) {
        setError(
          "You have reached the limit of databases for your current plan."
        );
        setTimeout(() => {
          setError(null);
        }, 5000);
        setLoading(false);
        return;
      }

      const token = Cookies.get("token");
      const url = `https://tired-blue-worm.cyclic.app/api/db/createDatabase`;
      const payload = { ...db };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getUser();
      setDb(INITIAL_DB_NAME);
      setSuccessMessage(response.data.message);
      setFieldsNum("");
    } catch (err) {
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

  return (
    <>
      {(user && (
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
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                  <h6 className="text-primary fw-bold m-0">Create Database</h6>
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
                    <div className="row g-3 ">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="name">
                            <strong>Database Name:</strong>
                          </label>
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="text"
                            id="name"
                            placeholder="Database Name"
                            value={db.name}
                            name="name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row g-3 ">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="media">
                            <strong>
                              Do you want to add images to your database?
                            </strong>
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="media"
                            name="media"
                            onChange={handleChange}
                            defaultValue={"1"}
                          >
                            <option value="1">Select Option Here</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {user && user.currentPlan === "pro" && (
                      <>
                        <div className="row g-3 ">
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label">
                                <strong>
                                  Do you want to send notifications to the
                                  users?
                                </strong>
                              </label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                id="notifications"
                                name="notifications"
                                onChange={handleChange}
                                defaultValue={"1"}
                              >
                                <option value="1">Select Option Here</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row g-3 ">
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label">
                                <strong>
                                  Do you want to send emails after every post
                                  addition/update to the users?
                                </strong>
                              </label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                id="emails"
                                name="emails"
                                onChange={handleChange}
                                defaultValue={"1"}
                              >
                                <option value="1">Select Option Here</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row g-3 ">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="totalFields">
                            <strong>Total Fields:</strong>
                          </label>
                          <input
                            onChange={handleFieldsNum}
                            className="form-control"
                            type="text"
                            id="totalFields"
                            placeholder="Total Fields"
                            value={db.totalHeaders}
                            name="totalHeaders"
                          />
                        </div>
                      </div>
                    </div>

                    {(fieldsNum <= MAX_NUMBER &&
                      Array.from({ length: fieldsNum }).map((_, index) => (
                        <div className="row g-3 mb-3" key={index}>
                          <div className="col">
                            <label
                              className="form-label"
                              htmlFor={`tH${index + 1}`}
                            >
                              <strong>Data Header {index + 1}</strong>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={`Data Header ${index + 1}`}
                              aria-label={`Data Header ${index + 1}`}
                              name={`tH${index + 1}`}
                              id={`tH${index + 1}`}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      ))) || (
                      <div className="mb-3">
                        Number of fields should be between {MIN_NUMBER} and{" "}
                        {MAX_NUMBER}
                      </div>
                    )}

                    <div className="mb-3">
                      <button className="btn btn-primary btn-sm" type="submit">
                        Create Database
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              {user && (
                <>
                  <ToDo user={user} />
                  {user.extraRole === "superAdmin" ? (
                    <SuperAdminPanel user={user} />
                  ) : (
                    <>
                      <UserPanel user={user} />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )) || <Loading />}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js" />
      <Script defer src="/dashboard/assets/js/bs-init.js" />
      <Script defer src="/dashboard/assets/js/theme.js" /> */}
    </>
  );
}
