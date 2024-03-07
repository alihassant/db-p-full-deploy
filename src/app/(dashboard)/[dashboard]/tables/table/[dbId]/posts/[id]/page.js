"use client";

import "@/app/dashboard.min.css";
import Loading from "@/components/dashboard/Loading";
import Footer from "@/components/dashboard/Footer";
import axios from "axios";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

const INITIAL_UPDATE_ENTRY = {
  tD1: "",
  tD2: "",
  tD3: "",
  tD4: "",
  tD5: "",
  tD6: "",
  dbId: "",
  userId: "",
};

const INITIAL_REMOVE_ENTRY = {
  dbId: "",
  userId: "",
  postId: "",
};

export default function Post() {
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const path = usePathname();
  const dbId = path.split("/")[4];
  const postId = path.split("/")[6];
  INITIAL_UPDATE_ENTRY.dbId = dbId;
  INITIAL_REMOVE_ENTRY.dbId = dbId;
  INITIAL_REMOVE_ENTRY.postId = postId;

  const [post, setPost] = useState();
  const [tHeaders, setTHeaders] = useState();

  const getPost = async () => {
    try {
      const response = await axios.get(
        `https://good-puce-elephant-tie.cyclic.app/api/db/getPost/${postId}`
      );
      // console.log(response.data);
      if (response) {
        const { post } = response.data;
        INITIAL_UPDATE_ENTRY.tD1 = post.tD1;
        INITIAL_UPDATE_ENTRY.tD2 = post.tD2;
        INITIAL_UPDATE_ENTRY.tD3 = post.tD3;
        INITIAL_UPDATE_ENTRY.tD4 = post.tD4;
        INITIAL_UPDATE_ENTRY.tD5 = post.tD5;
        INITIAL_UPDATE_ENTRY.tD6 = post.tD6;
        // const { tHeaders } = response.data;
        // console.log(post);
        if (post) {
          setPost(post);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(INITIAL_UPDATE_ENTRY);

  const getTHeaders = async () => {
    try {
      const response = await axios.get(
        `https://good-puce-elephant-tie.cyclic.app/api/db/getPostHeaders/${dbId}`
      );
      if (response) {
        const { tHeaders } = response.data;
        // console.log("tHeaders", tHeaders);
        if (tHeaders) {
          setTHeaders(tHeaders);
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
  INITIAL_UPDATE_ENTRY.userId = user?._id;
  INITIAL_REMOVE_ENTRY.userId = user?._id;

  const [updatedEntry, setUpdatedEntry] = useState(INITIAL_UPDATE_ENTRY);
  // console.log(newUser);
  function handleChange(e) {
    const { name, value } = e.target;
    setUpdatedEntry((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(updatedEntry);
  // console.log(db);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccessMessage(null);
      setError(null);

      const url = `https://good-puce-elephant-tie.cyclic.app/api/post/updateData/${postId}`;
      const payload = { ...updatedEntry };
      const response = await axios.post(url, payload);

      setSuccessMessage(response.data.message);
      console.log("Entry Updated Successfully!!!");
      // console.log(response.data);
    } catch (err) {
      setSuccessMessage(null);
      setError(err.response.data.message);
      // console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const [removeEntry, setRemoveEntry] = useState(INITIAL_REMOVE_ENTRY);
  // console.log("removeUser: ", removeUser);

  async function handleRemoveSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const url = `https://good-puce-elephant-tie.cyclic.app/api/post/deletePost`;
      const payload = { ...removeEntry };
      const response = await axios.post(url, payload);
      setError(null);
      setSuccessMessage(response.data.message);
      window.location.pathname = `/dashboard/tables/table/${dbId}/posts`;
    } catch (err) {
      setSuccessMessage(null);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!!!");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handlePDF(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const url = `https://good-puce-elephant-tie.cyclic.app/api/db/getPostPDF/${dbId}/${postId}`;
      const response = await axios.get(url, { responseType: "blob" });
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Assuming you want to display the PDF in the browser
      const url1 = window.URL.createObjectURL(pdfBlob);
      window.open(url1, "_blank");

      setSuccessMessage(response.data.message);
    } catch (err) {
      setSuccessMessage(null);
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
    getPost();
    getUser();
    getTHeaders();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {(user && (
        <div id="wrapper">
          <Sidebar user={user} />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Navbar user={user} />

              <div className="container-fluid">
                <h3 className="text-dark mb-4">Database Entries</h3>
                {(post && (
                  <div className="card">
                    <div className="card-header">
                      <h5
                        className="text-primary d-md-flex justify-content-md-end m-0 fw-bold"
                        style={{ float: "left" }}
                      >
                        Data
                      </h5>

                      <div className="d-grid gap-2 d-md-flex justify-content-md-end d-sm-flex justify-content-sm-end ">
                        <button
                          className="btn btn-primary me-md-2 "
                          style={{ color: "white" }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          data-bs-whatever="@getbootstrap"
                        >
                          Update Entry
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

                      {/* update modal */}
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
                                onClick={() => {
                                  setError(null);
                                  setSuccessMessage(null);
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
                                    value={updatedEntry.tD1}
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
                                    value={updatedEntry.tD2}
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
                                    value={updatedEntry.tD3}
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
                                    value={updatedEntry.tD4}
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
                                    value={updatedEntry.tD5}
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
                                    value={updatedEntry.tD6}
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
                                  setError(null);
                                  setSuccessMessage(null);
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
                                    "Update Entry"}
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* update modal close */}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {tHeaders[0].tH1}: {post.tD1}
                      </h5>
                      <p className="card-title">
                        {tHeaders[0].tH2}: {post.tD2}
                      </p>
                      <p className="card-text">
                        {tHeaders[0].tH3}: {post.tD3}
                      </p>
                      <p className="card-text">
                        {tHeaders[0].tH4}: {post.tD4}
                      </p>
                      <p className="card-text">
                        {tHeaders[0].tH5}: {post.tD5}
                      </p>
                      <p className="card-text">
                        {tHeaders[0].tH6}: {post.tD6}
                      </p>
                      <p className="card-text">
                        Created At: {new Date(post.createdAt).toString()}
                      </p>
                      <p className="card-text">
                        Updated At: {new Date(post.updatedAt).toString()}
                      </p>
                      <button
                        // href={`/dashboard/tables/table/${dbId}/posts`}
                        className="btn btn-primary"
                        onClick={() => window.history.back()}
                      >
                        Go Back
                      </button>
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
                                  setSuccessMessage(null);
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
                                    Are you sure you want remove this entry?
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
                                  setSuccessMessage(null);
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
                                    "Remove Entry"}
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* remove modal end  */}
                      {/* remove functionality end */}
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
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
        </div>
      )) || <Loading />}
    </>
  );
}
