import cookie from "js-cookie";
// import Router from "next/router";

export function handleLogin(token) {
  cookie.set("token", token);
  //   Router.push("/dashboard");
}

export function handleLogout() {
  //destroying the cookie
  cookie.remove("token");
  window.localStorage.setItem("logout", Date.now());
  // Router.push("/login");
}
