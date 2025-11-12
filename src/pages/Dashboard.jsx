import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Loader2, User, LogOut } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/login");

    api
      .get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data))
      .catch(() => (window.location.href = "/login"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500 mb-4" />
        <p className="text-lg font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg p-5 flex justify-between items-center text-white">
        <h1 className="text-2xl font-semibold">
          Welcome, {user.name}{" "}
          <span className="text-sm bg-white/20 px-2 py-1 rounded-md ml-2 capitalize">
            ({user.role})
          </span>
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 p-4 rounded-full">
              <User className="text-indigo-600 w-10 h-10" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {user.role === "admin"
              ? "Admin Dashboard"
              : "User Dashboard"}
          </h2>
          <p className="text-gray-600 mb-4">
            {user.role === "admin"
              ? "Manage users, view reports, and control system settings."
              : "View your activity, manage your profile, and explore features."}
          </p>

          {/* <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition-all">
              <h3 className="font-medium text-indigo-700">Profile</h3>
              <p className="text-sm text-gray-500">Update your details</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition-all">
              <h3 className="font-medium text-indigo-700">Settings</h3>
              <p className="text-sm text-gray-500">Manage preferences</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition-all">
              <h3 className="font-medium text-indigo-700">Activity</h3>
              <p className="text-sm text-gray-500">Track your actions</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg shadow hover:shadow-lg transition-all">
              <h3 className="font-medium text-indigo-700">Support</h3>
              <p className="text-sm text-gray-500">Get help anytime</p>
            </div>
          </div> */}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}
