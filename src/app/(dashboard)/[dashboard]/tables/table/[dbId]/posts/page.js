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

const INITIAL_NEW_ENTRY = {
  carName: "",
  carModel: "",
  carPurchasePrice: "",
  carSellPrice: "",
  remarks: "",
  dbId: "",
  userId: "",
};

export default function Table() {
  const router = useRouter();

  // getting and setting the databases
  const [posts, setPosts] = useState();
  const path = usePathname();
  const dbId = path.split("/")[4];
  INITIAL_NEW_ENTRY.dbId = dbId;

  const getDb = async () => {
    try {
      // const response = await axios.get(
      //   `http://localhost:8080/api/user/getDatabase/${dbId}`
      // );
      const response = await getData(dbId);
      // console.log(response);
      // console.log(response.data.db.posts);
      if (response) {
        const posts = response.db.posts;
        // console.log(databases);
        // const user = { ...userData };
        if (posts) {
          setPosts(posts);
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

  useEffect(() => {
    getUser();
    getDb();
    // eslint-disable-next-line
  }, []);
  INITIAL_NEW_ENTRY.userId = user?._id;
  // console.log(posts);
  // console.log(user);

  const [newEntry, setNewEntry] = useState(INITIAL_NEW_ENTRY);
  // console.log(newUser);
  function handleChange(e) {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(db);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/post/postData`;
      const payload = { ...newEntry };
      const response = await axios.post(url, payload);
      console.log("New User Added Successfully!!!");
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(newEntry);

  return (
    <>
      {(user && posts && (
        <div id="wrapper">
          <Sidebar user={user} />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Navbar user={user} />

              <div className="container-fluid">
                <h3 className="text-dark mb-4">Database Entries</h3>
                {(!posts
                  ? "No data found!!!"
                  : posts && (
                      <div className="card shadow">
                        <div className="card-header py-3">
                          <p
                            className="text-primary m-0 fw-bold"
                            style={{ float: "left" }}
                          >
                            Database Info
                          </p>
                          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                              className="btn btn-success me-md-2 "
                              style={{ color: "white" }}
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              data-bs-whatever="@getbootstrap"
                            >
                              Add Entry
                            </button>
                          </div>

                          {/* new modal */}
                          <div
                            className="modal fade"
                            id="exampleModal"
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
                                    New Entry
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
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        Name:
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="carName"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        Model:
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="carModel"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        Purchase Price:
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="carPurchasePrice"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        Sell Price:
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="carSellPrice"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        Remarks:
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="remarks"
                                      />
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
                                      className="btn btn-primary"
                                    >
                                      Add Entry
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* new modal close */}

                          {/* <!-- Modal --> */}
                          {/* <div
                            className="modal fade"
                            id="exampleModal"
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
                                    Modal title
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">...</div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          {/* <!-- Modal --> */}
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6 text-nowrap">
                              <div
                                id="dataTable_length"
                                className="dataTables_length"
                                aria-controls="dataTable"
                              >
                                <label className="form-label">
                                  Show&nbsp;
                                  <select
                                    defaultValue={10}
                                    className="d-inline-block form-select form-select-sm"
                                  >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                  </select>
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div
                                className="text-md-end dataTables_filter"
                                id="dataTable_filter"
                              >
                                <label className="form-label">
                                  <input
                                    type="search"
                                    className="form-control form-control-sm"
                                    aria-controls="dataTable"
                                    placeholder="Search"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
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
                                  <th>Car Name</th>
                                  <th>Model</th>
                                  <th>Created At</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {posts.map((post) => {
                                  return (
                                    <tr key={post._id}>
                                      <td>{post.carName}</td>
                                      <td>{post.carModel}</td>
                                      <td>
                                        {new Date(post.createdAt).toString()}
                                      </td>
                                      <td>
                                        <Link
                                          href={`/dashboard/tables/table/${dbId}/posts/${post._id}`}
                                          className="btn btn-primary"
                                        >
                                          See More
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
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
