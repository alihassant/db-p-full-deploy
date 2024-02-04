"use client";

import Loading from "@/components/dashboard/Loading";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import Footer from "@/components/dashboard/Footer";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Post() {
  const path = usePathname();
  const postId = path.split("/")[6];

  const [post, setPost] = useState();

  const getPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/db/getPost/${postId}`
      );
      //   console.log(response.data);
      if (response) {
        const { post } = response.data;
        if (post) {
          setPost(post);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);
  //   console.log(post);

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
                    <h5 className="card-header">Car Data</h5>
                    <div className="card-body">
                      <h5 className="card-title">Car Model: {post.carName}</h5>
                      <p className="card-text">Remarks: {post.remarks}</p>
                      <p className="card-text">
                        Purchase Price: {post.carPurchasePrice}
                      </p>
                      <p className="card-text">
                        Selling Price: {post.carSellPrice}
                      </p>
                      <p className="card-text">Total Profit: {post.profit}</p>
                      <p className="card-text">Remarks: {post.remarks}</p>
                      <Link
                        href={
                          "/dashboard/tables/table/65bc2868b766f8c493df8822/posts"
                        }
                        className="btn btn-primary"
                      >
                        Go Back
                      </Link>
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
    </>
  );
}
