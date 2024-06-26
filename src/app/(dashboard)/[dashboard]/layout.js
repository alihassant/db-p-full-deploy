"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import openSocket from "socket.io-client";
import "@/app/dashboard.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/dashboard/Footer";
import Loading from "@/components/dashboard/Loading";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import Script from "next/script";
import axios from "axios";
import { revalidateDataTag } from "@/app/actions";
import Cookies from "js-cookie";

export default function DashboardLayout({ children }) {
  const [notification, setNotification] = useState(null);
  const token = Cookies.get("token");

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
        if (user) {
          setUser(user);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [userNotifications, setUserNotifications] = useState([]);
  const getUserNotifications = async () => {
    // if (user) {
    try {
      const response = await axios.get(
        `https://tired-blue-worm.cyclic.app/api/user/getNotifications/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const { notifications } = response.data;
        if (notifications) {
          setUserNotifications(notifications);
        }
      }
    } catch (err) {
      console.log(err);
    }
    // }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      getUserNotifications();
      // Assuming user is your user data
      // Establish WebSocket connection
      // const socket = openSocket("https://tired-blue-worm.cyclic.app");
      // // console.log("socket", socket);

      // // Emit the user ID to the server after connecting
      // socket.on("connect", () => {
      //   const userId = user._id; // Replace this with the actual user ID
      //   socket.emit("userId", userId);
      // });

      // // Listen for 'notification' events from the server
      // socket.on("notification", (data) => {
      //   setNotification(data.message);
      //   if (
      //     data.action === "create" ||
      //     data.action === "update" ||
      //     data.action === "delete" ||
      //     data.action === "add" ||
      //     data.action === "remove" ||
      //     data.action === "changeRole" ||
      //     data.action === "cancelSubscription" ||
      //     data.action === "changeSubscription"
      //   ) {
      //     setUserNotifications((prevNotifications) => [
      //       ...prevNotifications,
      //       data,
      //     ]);
      //   }
      //   setTimeout(() => {
      //     setNotification(null);
      //   }, 5000);
      // });

      // // Cleanup function
      // return () => {
      //   // Close the WebSocket connection when component unmounts
      //   socket.disconnect();
      // };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Run effect when user data changes

  useEffect(() => {
    if (notification) {
      toast(notification);
      revalidateDataTag(userNotifications);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
      />
      <div>
        {/* <h1>Dashboard</h1> */}

        {/* {notification && <div>{notification}</div>} */}

        {(user && (
          <div id="wrapper">
            <Sidebar user={user} />
            <div className="d-flex flex-column" id="content-wrapper">
              <div id="content">
                <Navbar
                  user={user}
                  id="pageTop"
                  notifications={userNotifications}
                />
                <div>{children}</div>
                {notification && (
                  <div className="mt-6">
                    <Toaster
                      position="bottom-right"
                      toastOptions={{
                        style: {
                          background: "#7AA2E3",
                          color: "#F8F6E3",
                        },
                        classNames: {
                          marginTop: "500px",
                        },
                      }}
                    />
                  </div>
                )}
              </div>
              <Footer />
            </div>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
          </div>
        )) || <Loading />}
      </div>
    </>
  );
}
