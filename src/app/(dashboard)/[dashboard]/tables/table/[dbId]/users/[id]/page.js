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

export default function Table() {
  const router = useRouter();

  // getting and setting the databases
  const [users, setUsers] = useState();
  const path = usePathname();
  const dbId = path.split("/")[4];
  const userId = path.split("/")[6];

  INITIAL_NEW_USER.dbId = dbId;
  INITIAL_REMOVE_USER.dbId = dbId;

  INITIAL_USER_POSTS.dbId = dbId;
  INITIAL_USER_POSTS.userId = userId;

  // console.log(INITIAL_USER_POSTS);

  //   console.log(INITIAL_REMOVE_USER);

  const getDb = async () => {
    try {
      // const response = await axios.get(
      //   `https://good-puce-elephant-tie.cyclic.app/api/user/getDatabase/${dbId}`
      // );
      const response = await getData(dbId);
      // console.log(response);
      // console.log(response.data.db.posts);
      if (response) {
        const users = response.db.users;
        // console.log(databases);
        // const user = { ...userData };
        if (users) {
          setUsers(users);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // // setting and getting the user
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
        const userDb = user;
        // const user = { ...userData };
        const db = user.databases.filter((db) => db.dbId === dbId);
        userDb.dbRole = db[0].dbRole;
        if (user) {
          setUser(userDb);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);

  INITIAL_NEW_USER.userId = user?._id;
  INITIAL_REMOVE_USER.userId = user?._id;

  const [newUser, setNewUser] = useState(INITIAL_NEW_USER);
  // console.log(newUser);
  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(db);

  async function handleSubmit(e) {
    try {
      const url = `https://good-puce-elephant-tie.cyclic.app/api/db/addNewMember`;
      const payload = { ...newUser };
      const response = await axios.post(url, payload);
      console.log("New User Added Successfully!!!");
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const [posts, setPosts] = useState(INITIAL_USER_POSTS);
  const getPosts = async () => {
    try {
      const response = await axios.get(
        `https://good-puce-elephant-tie.cyclic.app/api/db/getUserData/${dbId}/${userId}`
      );
      if (response) {
        const posts = response.data.posts;
        console.log(posts);
        setPosts(posts.length);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(posts);

  const [removeUser, setRemoveUser] = useState(INITIAL_REMOVE_USER);
  function handleRemoveUserData(removeUserId) {
    setRemoveUser((prev) => ({ ...prev, removeUserId }));
    console.log(removeUser);
  }

  useEffect(() => {
    getUser();
    getDb();
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
                {(!users
                  ? "No data found!!!"
                  : users && (
                      <div className="card shadow">
                        <div className="card-header py-3">
                          <p
                            className="text-primary m-0 fw-bold"
                            style={{ float: "left" }}
                          >
                            User Info
                          </p>
                          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <Link
                              href={`/dashboard/tables/table/${dbId}/users`}
                              className="btn btn-success"
                              style={{ color: "white" }}
                            >
                              {" "}
                              Go Back
                            </Link>
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
                                <tr key={user._id}>
                                  <td>{user.name}</td>
                                  <td>{user.dbRole}</td>
                                  <td>{user.email}</td>
                                  <td>{posts}</td>
                                  <td>
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
                                            ></button>
                                          </div>
                                          <div className="modal-body">
                                            <form onSubmit={handleSubmit}>
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
                                            >
                                              Close
                                            </button>
                                            <form onSubmit={handleSubmit}>
                                              <button
                                                type="submit"
                                                className="btn btn-danger"
                                              >
                                                Remove Entry
                                              </button>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* remove modal end  */}
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
