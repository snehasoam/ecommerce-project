import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function Login() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch(`${BASE}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        saveTokens(data);
        setMsg("Login successful ✨");

        setTimeout(() => nav("/"), 800);
      } else {
        setMsg(data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMsg("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-white flex items-center justify-center px-6">

      <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-5xl">

        {/* LEFT SIDE - INFO */}
        <div className="hidden md:block space-y-6">

          <h1 className="text-4xl font-bold leading-tight">
            Welcome Back to <span className="text-yellow-400">SnehaCart</span>
          </h1>

          <p className="text-gray-400">
            Login to continue shopping premium luxury products with best deals
            and exclusive offers.
          </p>

          <div className="glass p-4 rounded-xl">
            <p className="text-yellow-400 font-semibold">🔥 Premium Experience</p>
            <p className="text-gray-400 text-sm">
              Fast checkout • Secure payments • Luxury UI
            </p>
          </div>

        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="glass p-8 rounded-2xl w-full">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login <span className="text-yellow-400">Account</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full p-3 rounded bg-black/40 border border-yellow-500/20 outline-none focus:border-yellow-400"
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 rounded bg-black/40 border border-yellow-500/20 outline-none focus:border-yellow-400"
            />

            <button className="btn-gold w-full py-3 rounded-xl font-semibold">
              Login
            </button>

          </form>

          {/* MESSAGE */}
          {msg && (
            <p className="mt-4 text-center text-sm text-gray-300">
              {msg}
            </p>
          )}

          {/* SIGNUP LINK */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-yellow-400 hover:underline"
            >
              Sign up
            </a>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;