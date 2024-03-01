import { handleLogout } from "@/utils/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function Navbar({ user }) {
  const router = useRouter();
  const logout = () => {
    handleLogout();
    router.push("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
        <div className="container-fluid">
          <button
            className="btn btn-link d-md-none rounded-circle me-3"
            id="sidebarToggleTop"
            type="button"
          >
            <i className="fa fa-bars " style={{ color: "#1cc588" }} />
          </button>
          <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input
                className="bg-light form-control border-0 small"
                type="text"
                placeholder="Search for ..."
              />
              <button className="btn btn-success py-0" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </div>
          </form>
          <ul className="navbar-nav flex-nowrap ms-auto">
            <li className="nav-item dropdown d-sm-none no-arrow">
              <a
                className="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className="bi bi-search"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end p-3 animated--grow-in"
                aria-labelledby="searchDropdown"
              >
                <form className="me-auto navbar-search w-100">
                  <div className="input-group">
                    <input
                      className="bg-light form-control border-0 small"
                      type="text"
                      placeholder="Search for ..."
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary py-0" type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  href="#"
                >
                  <span className="badge bg-danger badge-counter">3+</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-bell"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                  </svg>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">alerts center</h6>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="me-3">
                      <div className="bg-primary icon-circle">
                        <i className="fas fa-file-alt text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="small text-gray-500">
                        December 12, 2019
                      </span>
                      <p>A new monthly report is ready to download!</p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="me-3">
                      <div className="bg-success icon-circle">
                        <i className="fas fa-donate text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="small text-gray-500">
                        December 7, 2019
                      </span>
                      <p>$290.29 has been deposited into your account!</p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="me-3">
                      <div className="bg-warning icon-circle">
                        <i className="fas fa-exclamation-triangle text-white" />
                      </div>
                    </div>
                    <div>
                      <span className="small text-gray-500">
                        December 2, 2019
                      </span>
                      <p>
                        Spending Alert: We have noticed unusually high spending
                        for your account.
                      </p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#"
                  >
                    Show All Alerts
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  href="#"
                >
                  <span className="badge bg-danger badge-counter">7</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-list animated--grow-in">
                  <h6 className="dropdown-header">alerts center</h6>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="dropdown-list-image me-3">
                      <Image
                        alt="dog"
                        className="rounded-circle"
                        src="/dashboard/assets/img/avatars/avatar4.jpeg"
                        width={60}
                        height={60}
                      />
                      <div className="bg-success status-indicator" />
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate">
                        <span>
                          Hi there! I am wondering if you can help me with a
                          problem I have been having.
                        </span>
                      </div>
                      <p className="small text-gray-500 mb-0">
                        Emily Fowler - 58m
                      </p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="dropdown-list-image me-3">
                      <Image
                        alt="dog"
                        className="rounded-circle"
                        src="/dashboard/assets/img/avatars/avatar2.jpeg"
                        width={60}
                        height={60}
                      />
                      <div className="status-indicator" />
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate">
                        <span>
                          I have the photos that you ordered last month!
                        </span>
                      </div>
                      <p className="small text-gray-500 mb-0">Jae Chun - 1d</p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="dropdown-list-image me-3">
                      <Image
                        alt="dog"
                        width={60}
                        height={60}
                        className="rounded-circle"
                        src="/dashboard/assets/img/avatars/avatar3.jpeg"
                      />
                      <div className="bg-warning status-indicator" />
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate">
                        <span>
                          Last month&apos;s report looks great, I am very happy
                          with the progress so far, keep up the good work!
                        </span>
                      </div>
                      <p className="small text-gray-500 mb-0">
                        Morgan Alvarez - 2d
                      </p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <div className="dropdown-list-image me-3">
                      <Image
                        alt="dog"
                        width={60}
                        height={60}
                        className="rounded-circle"
                        src="/dashboard/assets/img/avatars/avatar5.jpeg"
                      />
                      <div className="bg-success status-indicator" />
                    </div>
                    <div className="fw-bold">
                      <div className="text-truncate">
                        <span>
                          Am I a good boy? The reason I ask is because someone
                          told me that people say this to all dogs, even if they
                          aren&apos;t good...
                        </span>
                      </div>
                      <p className="small text-gray-500 mb-0">
                        Chicken the Dog · 2w
                      </p>
                    </div>
                  </a>
                  <a
                    className="dropdown-item text-center small text-gray-500"
                    href="#"
                  >
                    Show All Alerts
                  </a>
                </div>
              </div>
              <div
                className="shadow dropdown-list dropdown-menu dropdown-menu-end"
                aria-labelledby="alertsDropdown"
              />
            </li>
            <div className="d-none d-sm-block topbar-divider" />
            <li className="nav-item dropdown no-arrow">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  href="#"
                >
                  <span className="d-none d-lg-inline me-2 text-gray-600 small">
                    {user.name}
                  </span>
                  <Image
                    alt="dog"
                    width={60}
                    height={60}
                    className="border rounded-circle img-profile"
                    src="/dashboard/assets/img/avatars/avatar1.jpg"
                  />
                </a>
                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Profile
                  </a>
                  <a className="dropdown-item" href="/dashboard/settings">
                    <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Activity log
                  </a>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item" onClick={logout}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />
                    &nbsp;Logout
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <Script defer src="/dashboard/assets/js/bs-init.js" />
      <Script defer src="/dashboard/assets/js/theme.js" />
    </>
  );
}
