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
import { revalidatePath } from "next/cache";
import revalidateDataPath from "@/app/actions";

const INITIAL_NEW_ENTRY = {
  tD1: "",
  tD2: "",
  tD3: "",
  tD4: "",
  tD5: "",
  tD6: "",
  dbId: "",
  userId: "",
};

export default function Table() {
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // getting and setting the databases

  const [posts, setPosts] = useState();
  const [tHeaders, setTHeaders] = useState();
  const [db, setDb] = useState();
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
        const { tHeaders } = response.db;
        // console.log(databases);
        // const user = { ...userData };
        if (posts) {
          setDb(response.db);
          setPosts(posts);
          setTHeaders(tHeaders);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(posts);
  // console.log(tHeaders);

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
      setLoading(true);
      setSuccessMessage(null);
      setError(null);

      const url = `http://localhost:8080/api/post/postData`;
      const payload = { ...newEntry };
      const response = await axios.post(url, payload);

      getDb();

      setSuccessMessage(response.data.message);
      console.log("New Entry Added Successfully!!!");
      // console.log(response.data);
    } catch (err) {
      setSuccessMessage(null);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  // console.log(newEntry);

  async function handlePDF(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `http://localhost:8080/api/db/getPostsPDF/${dbId}`;
      const response = await axios.get(url, { responseType: "blob" });
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Assuming you want to display the PDF in the browser
      const url1 = window.URL.createObjectURL(pdfBlob);
      window.open(url1, "_blank");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function redirectToDB() {
    window.location.pathname = `/dashboard/tables/table/${dbId}`;
  }

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
                          <button
                            className="text-primary m-0 fw-bold"
                            style={{
                              float: "left",
                              border: "none",
                              background: "none",
                            }}
                            onClick={redirectToDB}
                          >
                            {db?.name}
                          </button>
                          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                              className="btn btn-primary me-md-2 "
                              style={{ color: "white" }}
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              data-bs-whatever="@getbootstrap"
                            >
                              Add Entry
                            </button>

                            <button
                              className="btn btn-primary me-md-2 "
                              style={{ color: "white" }}
                              type="button"
                              onClick={handlePDF}
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
                                "Download PDF"}
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
                                    type="submit"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                      setSuccessMessage(null);
                                      setError(null);
                                    }}
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <form onSubmit={handleSubmit}>
                                    {error && (
                                      <div
                                        className="alert alert-danger"
                                        role="alert"
                                      >
                                        {error}
                                      </div>
                                    )}
                                    {successMessage && (
                                      <div
                                        className="alert alert-success"
                                        role="alert"
                                      >
                                        {successMessage}
                                      </div>
                                    )}
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        {tHeaders[0].tH1}
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="tD1"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        {tHeaders[0].tH2}
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="tD2"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        {tHeaders[0].tH3}
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="tD3"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        {tHeaders[0].tH4}
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="tD4"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        {tHeaders[0].tH5}
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="tD5"
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="message-text"
                                        className="col-form-label"
                                      >
                                        {tHeaders[0].tH6}
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        name="tD6"
                                      />
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                      setSuccessMessage(null);
                                      setError(null);
                                    }}
                                  >
                                    Close
                                  </button>
                                  <form onSubmit={handleSubmit}>
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
                                        "Add Entry"}
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* new modal close */}
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
                                  <th>{tHeaders[0].tH1}</th>
                                  <th>{tHeaders[0].tH2}</th>
                                  <th>Created At</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {posts.map((post) => {
                                  return (
                                    <tr key={post._id}>
                                      <td>{post.tD1}</td>
                                      <td>{post.tD2}</td>
                                      <td>
                                        {new Date(post.createdAt).toString()}
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => {
                                            window.location.pathname = `/dashboard/tables/table/${dbId}/posts/${post._id}`;
                                          }}
                                        >
                                          See More
                                        </button>
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
