"use client";

import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import "@/app/dashboard.min.css";
import Image from "next/image";
import Footer from "@/components/dashboard/Footer";
import Script from "next/script";
import { useEffect, useState } from "react";
import Loading from "@/components/dashboard/Loading";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import getData from "@/app/api/table/tableData/[id]/route";
import Link from "next/link";
import getUserData from "@/app/api/users/[user]/route";

const INITIAL_NEW_USER = {
  email: "",
  userId: "",
  dbId: "",
  role: "viewOnly",
};

const INITIAL_REMOVE_USER = {
  userId: "",
  dbId: "",
  removeUserId: "",
};

const INITIAL_USER_POSTS = {
  userId: "",
  dbId: "",
};

const INITIAL_USER_ROLE = {
  userId: "",
  dbId: "",
  changeUserId: "",
  role: "viewOnly",
};

export default function Table() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // getting and setting the databases
  const [users, setUsers] = useState();
  const path = usePathname();
  const dbId = path.split("/")[4];
  const userId = path.split("/")[6];

  // console.log("dbId: ", dbId, "userId: ", userId);

  INITIAL_REMOVE_USER.dbId = dbId;
  INITIAL_REMOVE_USER.removeUserId = userId;
  INITIAL_USER_ROLE.dbId = dbId;
  INITIAL_USER_ROLE.changeUserId = userId;

  // console.log(INITIAL_REMOVE_USER);

  const getDb = async () => {
    try {
      const response = await getData(dbId);
      if (response) {
        const users = response.db.users;
        if (users) {
          setUsers(users);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // // // setting and getting the user
  const [userData, setUserData] = useState();
  const getUserDataClient = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/user/${userId}`
      );
      // const user = res.data;
      // console.log("clientside: ", response);
      if (response) {
        // const userData = await response.json();
        const { user } = response.data;
        const userDb = user;
        // const user = { ...userData };
        const db = user.databases.filter((db) => db.dbId === dbId);
        // console.log("db: ", db[0]);
        user.dbRole = db[0].dbRole;
        // console.log("userDb: ", user);
        INITIAL_USER_ROLE.role = db[0].dbRole;
        if (user) {
          setUserData(userDb);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(userData);
  // // console.log(user);

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

  INITIAL_REMOVE_USER.userId = user?._id;
  INITIAL_USER_ROLE.userId = user?._id;

  const [posts, setPosts] = useState(INITIAL_USER_POSTS);
  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/db/getUserData/${dbId}/${userId}`
      );
      if (response) {
        const posts = response.data.posts;
        // console.log(posts);
        setPosts(posts.length);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(posts);

  // change role functionality
  const [changeRole, setChangeRole] = useState(INITIAL_USER_ROLE);
  function handleChangeRole(e) {
    const { name, value } = e.target;
    setChangeRole((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(changeRole);

  async function handleRoleChange(e) {
    e.preventDefault();
    try {
      if (changeRole.role === INITIAL_USER_ROLE.role) {
        setError("Role is already set to this value!!!");
        return;
      }
      if (changeRole.userId === changeRole.changeUserId) {
        setError("You can't change your own role!!!");
        return;
      }
      setLoading(true);
      const url = `http://localhost:8080/api/db/changeUserRole`;
      const payload = { ...changeRole };
      const response = await axios.post(url, payload);
      getUserDataClient();
      setError(null);
      setMessage(response.data.message);
    } catch (err) {
      console.log(err.response);
      setMessage(null);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!!!");
      }
    } finally {
      setLoading(false);
    }
  }

  const [removeUser, setRemoveUser] = useState(INITIAL_REMOVE_USER);
  // console.log("removeUser: ", removeUser);

  async function handleRemoveSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const url = `http://localhost:8080/api/db/removeUser`;
      const payload = { ...removeUser };
      const response = await axios.post(url, payload);
      setError(null);
      setMessage(response.data.message);
      window.location.pathname = `/dashboard/tables/table/${dbId}/users`;
    } catch (err) {
      setMessage(null);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!!!");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
    getDb();
    getUserDataClient();
    getPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {(user && users && (
        <div id="wrapper">
          <Sidebar user={user} />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Navbar user={user} />

              <div className="container-fluid">
                <h3 className="text-dark mb-4">Database Users</h3>
                {(!userData
                  ? "No data found!!!"
                  : userData && (
                      <div className="card shadow">
                        <div className="card-header py-3">
                          <p
                            className="text-primary m-0 fw-bold"
                            style={{ float: "left" }}
                          >
                            User Info
                          </p>
                          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                              className="btn btn-primary"
                              style={{ color: "white" }}
                              onClick={() => {
                                window.location.pathname = `/dashboard/tables/table/${dbId}/users`;
                              }}
                            >
                              {" "}
                              Go Back
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <div
                            className="table-responsive table mt-2"
                            id="dataTable"
                            role="grid"
                            aria-describedby="dataTable_info"
                          >
                            <table
                              className="table table-striped my-0"
                              id="dataTable"
                            >
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Role</th>
                                  <th>Email</th>
                                  <th>Total Posts</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr key={userData._id}>
                                  <td>{userData.name}</td>
                                  <td>{userData.dbRole}</td>
                                  <td>{userData.email}</td>
                                  <td>{posts}</td>
                                  <td>
                                    {/* change role functionality start */}
                                    <button
                                      className="btn btn-primary px-3 mx-2"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editRole"
                                    >
                                      Role
                                    </button>
                                    {/* new modal */}
                                    <div
                                      className="modal fade"
                                      id="editRole"
                                      tabIndex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Change Role
                                            </h5>
                                            <button
                                              type="button"
                                              className="btn-close"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                              onClick={() => {
                                                setError(null);
                                                setMessage(null);
                                              }}
                                            ></button>
                                          </div>
                                          <div className="modal-body">
                                            {error && (
                                              <div
                                                className="alert alert-danger"
                                                role="alert"
                                              >
                                                {error}
                                              </div>
                                            )}
                                            {message && (
                                              <div
                                                className="alert alert-success"
                                                role="alert"
                                              >
                                                {message}
                                              </div>
                                            )}
                                            <form onSubmit={handleRoleChange}>
                                              <div className="mb-3">
                                                <p>
                                                  Change the role of the user
                                                  from{" "}
                                                  <b>
                                                    {INITIAL_USER_ROLE.role}
                                                  </b>{" "}
                                                  to:
                                                </p>
                                              </div>
                                              <div className="mb-3">
                                                <label
                                                  htmlFor="message-text"
                                                  className="col-form-label"
                                                >
                                                  Role:
                                                </label>
                                                <select
                                                  className="form-select"
                                                  aria-label="Default select example"
                                                  onChange={handleChangeRole}
                                                  name="role"
                                                  value={changeRole.role}
                                                >
                                                  <option value="viewOnly">
                                                    View Only
                                                  </option>
                                                  <option value="teamLeader">
                                                    Team Leader
                                                  </option>
                                                  <option value="admin">
                                                    Admin
                                                  </option>
                                                </select>
                                              </div>
                                            </form>
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              data-bs-dismiss="modal"
                                              onClick={() => {
                                                setError(null);
                                                setMessage(null);
                                              }}
                                            >
                                              Close
                                            </button>
                                            <form onSubmit={handleRoleChange}>
                                              <button
                                                type="submit"
                                                className="btn btn-primary"
                                              >
                                                {(loading && (
                                                  <div
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                  >
                                                    <span className="visually-hidden">
                                                      Loading...
                                                    </span>
                                                  </div>
                                                )) ||
                                                  "Change Role"}
                                              </button>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* role modal close */}
                                    {/* change role functionality end */}

                                    {/* remove functionality start */}
                                    <button
                                      className="btn btn-danger px-3 mx-2"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#remove"
                                    >
                                      Remove
                                    </button>
                                    {/* remove modal  */}
                                    <div
                                      className="modal fade"
                                      id="remove"
                                      tabIndex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Remove
                                            </h5>
                                            <button
                                              type="button"
                                              className="btn-close"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                              onClick={() => {
                                                setError(null);
                                                setMessage(null);
                                              }}
                                            ></button>
                                          </div>
                                          <div className="modal-body">
                                            <form onSubmit={handleRemoveSubmit}>
                                              {error && (
                                                <div
                                                  className="alert alert-danger"
                                                  role="alert"
                                                >
                                                  {error}
                                                </div>
                                              )}
                                              <div className="mb-3">
                                                <p>
                                                  Are you sure you want remove
                                                  this user?
                                                </p>
                                              </div>
                                            </form>
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              data-bs-dismiss="modal"
                                              onClick={() => {
                                                setError(null);
                                                setMessage(null);
                                              }}
                                            >
                                              Close
                                            </button>
                                            <form onSubmit={handleRemoveSubmit}>
                                              <button
                                                type="submit"
                                                className="btn btn-danger"
                                              >
                                                {(loading && (
                                                  <div
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                  >
                                                    <span className="visually-hidden">
                                                      Loading...
                                                    </span>
                                                  </div>
                                                )) ||
                                                  "Remove User"}
                                              </button>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* remove modal end  */}
                                    {/* remove functionality end */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )) || <Loading />}
              </div>
            </div>
            <Footer />
          </div>
          <a className="border rounded d-inline scroll-to-top" href="#page-top">
            <i className="fas fa-angle-up" />
          </a>
        </div>
      )) || <Loading />}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
      {/* <Script src="/dashboard/assets/js/bs-init.js"></Script>
      <Script src="/dashboard/assets/js/theme.js"></Script> */}
    </>
  );
}
