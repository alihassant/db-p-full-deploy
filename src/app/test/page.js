"use client";

import axios from "axios";
import { useState } from "react";

const INITIAL_DATA = {
  name: "",
  email: "",
  password: "",
  username: "",
};

export default function Test() {
  const [data, setData] = useState(INITIAL_DATA);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  // console.log(db);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = `https://good-puce-elephant-tie.cyclic.app/api/db/test`;
      const payload = { ...data };
      const response = await axios.post(url, payload);
      // console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <label>
          Enter your email:
          <input type="text" name="email" onChange={handleChange} />
        </label>
        <label>
          Enter your password:
          <input type="text" name="password" onChange={handleChange} />
        </label>
        <label>
          Enter your password:
          <input type="text" name="username" onChange={handleChange} />
        </label>
        <button className="btn btn-primary btn-sm" type="submit">
          Create Database
        </button>
      </form>
    </>
  );
}
