"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // --- EMAIL/PASSWORD REGISTER ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Registration request failed");
    }
  };

  // --- GOOGLE REGISTER / LOGIN ---
  const handleGoogle = async (credential: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        alert(data.error || "Google login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Google login error");
    }
  };

  // --- LOAD GOOGLE IDENTITY SCRIPT ---
  useEffect(() => {
    const loadGoogle = () => {
      if (!(window as any).google) return;
      (window as any).google.accounts.id.initialize({
        client_id: "904361659642-7qhcoqa50n3lnfpb76t3tq1mvrlp5the.apps.googleusercontent.com",
        callback: (res: any) => handleGoogle(res.credential),
      });
      (window as any).google.accounts.id.renderButton(
        document.getElementById("googleSignUpDiv"),
        { theme: "outline", size: "large" }
      );
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = loadGoogle;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-neutral-900 p-10 rounded-2xl shadow-xl shadow-cyan-500/30 w-full max-w-md border border-neutral-700">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">
          Create Account
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 transition text-white p-3 rounded"
          >
            Register
          </button>
        </form>

        <div className="my-4 text-center text-white">Or</div>
        <div id="googleSignUpDiv" className="flex justify-center"></div>

        <p className="text-neutral-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
