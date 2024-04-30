"use client";

import Footer from "@/components/main/Footer";
import Navigation from "@/components/main/Navigation";
import Script from "next/script";
import "@/app/bootstrap.min.css";
import Faq from "@/components/main/Faq";
import { useState } from "react";
import axios from "axios";

const INITIAL_CONTACT_MESSAGE = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [contactMessage, setContactMessage] = useState(INITIAL_CONTACT_MESSAGE);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log(contactMessage);

  function handleChange(e) {
    const { name, value } = e.target;
    setContactMessage((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);

      if (
        !contactMessage.name ||
        !contactMessage.email ||
        !contactMessage.message
      ) {
        setError("All fields are required!!!");
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }

      const url = "http://localhost:8080/api/public/postContactMessage";
      const payload = contactMessage;
      const response = await axios.post(url, payload);
      console.log(response.data);

      setSuccess(true);
      setContactMessage(INITIAL_CONTACT_MESSAGE);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      if (err.data.message) setError(err.data.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navigation />

      {/* Start: Contact Details */}
      <section className="py-5 mt-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2 className="display-6 fw-bold mb-4">
                Got any <span className="underline">questions</span>?
              </h2>
              <p className="text-muted">
                Our team is always here to help. Send us a message and we will
                get back to you shortly.
              </p>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="p-3 p-xl-4"
                  method="post"
                  data-bs-theme="light"
                >
                  {/* Start: Success Example */}
                  <div className="mb-3">
                    <input
                      className="shadow form-control"
                      type="text"
                      id="name-1"
                      name="name"
                      value={contactMessage.name}
                      placeholder="Name"
                      onChange={handleChange}
                    />
                  </div>
                  {/* End: Success Example */}
                  {/* Start: Error Example */}
                  <div className="mb-3">
                    <input
                      className="shadow form-control"
                      type="email"
                      id="email-1"
                      name="email"
                      value={contactMessage.email}
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </div>
                  {/* End: Error Example */}
                  <div className="mb-3">
                    <textarea
                      className="shadow form-control"
                      id="message-1"
                      name="message"
                      rows={6}
                      value={contactMessage.message}
                      placeholder="Message"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button
                      className={`btn ${
                        error
                          ? "btn-danger"
                          : success
                          ? "btn-success"
                          : "btn-primary"
                      }
                       shadow d-block w-100`}
                      type="submit"
                    >
                      {loading ? (
                        <div class="d-flex justify-content-center">
                          <div
                            class="spinner-border "
                            role="status"
                            style={{ width: "25px", height: "25px" }}
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : success ? (
                        "Sent!"
                      ) : error ? (
                        `${error}`
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End: Contact Details */}

      <Faq />
      <Footer />

      <Script defer src="/main/assets/bootstrap/js/bootstrap.min.js" />
      <Script defer src="/main/assets/js/startup-modern.js" />
    </>
  );
}
