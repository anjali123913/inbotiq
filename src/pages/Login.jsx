import { useState } from "react";
import React from "react";
import { api } from "../api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;
    try {
      res = await axios.post("http://localhost:5000/auth/login", form);
      console.log(res)
      if ((res && res !== undefined) || res !== null) {
    localStorage.setItem("token", res.data.token);

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.error);
      // console.log("hello");

      // console.log("hello");
    }
    // // console.log(res)
    // if (!res || res == undefined || res == null) {
    //   alert("user not exist with this credencials");
    //   return null;
    // }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2"
        />
        <button className="bg-green-500 text-white p-2 rounded">Login</button>
      </form>
      <p className="text-center ">
        I have'nt account{" "}
        <Link to={"/signup"} className={"text-blue-500"}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
