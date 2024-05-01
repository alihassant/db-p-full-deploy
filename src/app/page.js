import Image from "next/image";
import "./bootstrap.min.css";
import Navigation from "@/components/main/Navigation";
import Footer from "@/components/main/Footer";
import Script from "next/script";
import Faq from "@/components/main/Faq";
import ContactUsBanner from "@/components/main/ContactUsBanner";

export default function Home() {
  return (
    <>
      <Navigation />
      {/* End: Navbar Centered Links */}
      <header className="pt-5">
        {/* Start: Hero Clean Reverse */}
        <div className="container pt-4 pt-xl-5">
          <div className="row pt-5">
            <div className="col-md-8 text-center text-md-start mx-auto">
              <div className="text-center">
                <h1 className="display-4 fw-bold mb-5">
                  Tools for teams that work&nbsp;
                  <span className="underline">together</span>.
                </h1>
                <p className="fs-5 text-muted mb-5">
                  Your daily database helper.
                </p>
                <form
                  className="d-flex justify-content-center flex-wrap"
                  method="post"
                  data-bs-theme="light"
                >
                  <div className="shadow-lg mb-3">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Your Email (Newsletter)"
                    />
                  </div>
                  <div className="shadow-lg mb-3">
                    <button className="btn btn-primary" type="button">
                      Subscribe{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-lg-10 mx-auto">
              <div className="text-center position-relative">
                <Image
                  className="img-fluid"
                  src="/main/assets/img/illustrations/meeting.svg"
                  // style={{ width: 800 }}
                  style={{ height: "auto" }}
                  alt="Image"
                  priority={true}
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
        {/* End: Hero Clean Reverse */}
      </header>
      <section>
        {/* Start: Features Centered Icons */}
        <div className="container py-4 py-xl-5">
          <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <div className="card border-light border-1 d-flex justify-content-center p-4">
                <div className="card-body">
                  <div className="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icon-tabler-school"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                      <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="fw-bold">Tailored to Your Needs</h4>
                    <p className="text-muted">
                      Whether you are a small startup or a large enterprise,
                      Vortaps offers subscription plans tailored to your
                      specific requirements. Choose from our range of plans to
                      access advanced features such as real-time notifications,
                      PDF generation, and more, all designed to enhance your
                      data management experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-light border-1 d-flex justify-content-center p-4">
                <div className="card-body">
                  <div className="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-shield-lock"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
                      <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                      <path d="M12 12l0 2.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="fw-bold">Robust Security Measures</h4>
                    <p className="text-muted">
                      At Vortaps, the security of your data is our top priority.
                      We employ state-of-the-art encryption protocols and
                      industry best practices to safeguard your information at
                      every step. Rest assured, your data remains secure and
                      protected with Vortaps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-light border-1 d-flex justify-content-center p-4">
                <div className="card-body">
                  <div className="bs-icon-lg bs-icon-rounded bs-icon-secondary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-4 bs-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width={2}
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-help"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 17l0 .01" />
                      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="fw-bold">Dedicated Support</h4>
                    <p className="text-muted">
                      Have questions or need assistance? Our dedicated support
                      team is here to help. Whether you are a seasoned user or
                      just getting started, we are committed to providing you
                      with the assistance you need to make the most of our
                      platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End: Features Centered Icons */}
      </section>

      <Faq />

      <ContactUsBanner />

      <Footer />
      <Script defer src="/main/assets/bootstrap/js/bootstrap.min.js" />
      <Script defer src="/main/assets/js/startup-modern.js" />
    </>
  );
}
