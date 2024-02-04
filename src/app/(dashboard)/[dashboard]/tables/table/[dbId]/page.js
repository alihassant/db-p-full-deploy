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

export default function Table() {
  const router = useRouter();

  // getting and setting the databases
  const [posts, setPosts] = useState();
  const path = usePathname();
  const dbId = path.split("/")[4];
  INITIAL_NEW_USER.dbId = dbId;

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
  INITIAL_NEW_USER.userId = user?._id;
  // console.log(posts);
  // console.log(user);

  const [newUser, setNewUser] = useState(INITIAL_NEW_USER);
  // console.log(newUser);
  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(db);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/db/addNewMember`;
      const payload = { ...newUser };
      const response = await axios.post(url, payload);
      console.log("New User Added Successfully!!!");
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const redirect = () => {
    router.push(`/dashboard/tables`);
  };

  return (
    <>
      {(user && posts && (
        <div id="wrapper">
          <Sidebar user={user} />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Navbar user={user} />

              <div className="container-fluid">
                <h3 className="text-dark display-3 mb-4">Database Entries</h3>
                <Link
                  style={{ textDecoration: "none" }}
                  href={`/dashboard/tables/table/${dbId}/users`}
                >
                  <h1 className="display-6">Users</h1>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  href={`/dashboard/tables/table/${dbId}/posts`}
                >
                  <h1 className="display-6">Posts</h1>
                </Link>
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
