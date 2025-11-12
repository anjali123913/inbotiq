import { useState } from "react";
import { api } from "../api";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const navigate = useNavigate();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await api.post("/auth/signup", form);
      if (((res && res !== undefined) || res !== null)&&res.status==201) {
        localStorage.setItem("token", res.data.token);
        // alert("hiu")
        navigate("/dashboard");
      }

      alert(res.data.message);
      // console.log(res);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.error);
    }
    // navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl mb-4">Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2"
        />
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
        <select name="role" onChange={handleChange} className="border p-2">
          <option>User</option>
          <option>Admin</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded">Signup</button>
      </form>
      <p className="text-center ">
        I have already account{" "}
        <Link to={"/login"} className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}
