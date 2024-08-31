"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import Bg from "../bg/Bg";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, redirectIfAuthenticated } = useAuth();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    redirectIfAuthenticated(`/user/${user?.username}`);
  }, [user, redirectIfAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://anesa06.pythonanywhere.com/todo/login/",
        {
          username,
          password,
        }
      );
      const data = response.data;
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      router.push(`/user/${username}`);
    } catch (e: any) {
      console.error(e);
      setError(e.response.data);
    }
    setPassword("");
    setUsername("");
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <Bg />
      <div className="flex items-center justify-center p-12 max-md:p-1 w-full">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="py-6 px-9" onSubmit={handleSubmit}>
            <h2 className="text-center text-5xl font-semibold text-[#07074D] mb-8">
              Login
            </h2>
            {error ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
                role="alert"
              >
                <span className="block sm:inline">
                  {error?.username}
                  {error?.password}
                  {error?.detail}
                </span>
              </div>
            ) : null}
            <div className="mb-5">
              <label
                htmlFor="username"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Your Name Here"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-dashed border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none transition duration-300 focus:border-solid focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-dashed border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none transition duration-300 focus:border-solid focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Login
              </button>
            </div>
            <Link
              className="text-[#6A64F1] underline inline-block mt-6"
              href="/register"
            >
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
