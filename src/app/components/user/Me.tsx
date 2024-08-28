"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import Tasktable from "../tasktable/Tasktable";
import { motion } from "framer-motion";
import Tableskeleton from "../skeleton/Tableskeleton";
import Bg from "../bg/Bg";
import Link from "next/link";

const Me = () => {
  const { user, redirectIfAuthenticated, error } = useAuth();
  const route = useRouter();
  const [bg, setBg] = useState("");

  useEffect(() => {
    redirectIfAuthenticated(`/user/${user?.username}`);
  }, [user, redirectIfAuthenticated]);

  const LogOut = async () => {
    route.push("/login");
    localStorage.removeItem("access");
  };

  if (error.response?.status === 401) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[600px] h-screen bg-neutral-50 rounded-lg shadow">
        <h1 className="font-title text-[150px] mb-8 uppercase">
          error <span className="text-[#6A64F1]">401</span>
        </h1>
        <p className="text-[#07074D]">Unauthorized</p>
        <Link
          href={"/login"}
          className="text-[25px] mt-3 text-[#6A64F1] underline"
        >
          🠔 Back
        </Link>
      </div>
    );
  }
  return (
    <motion.div
      className="w-full h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: bg,
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Bg />
      {user ? (
        <div className="border flex max-md:flex-col w-full max-w-[1000px] p-3 rounded-md min-h-[600px] max-h-[650px] bg-white">
          <div className="w-2/6 min-w-[200px] border-r p-4 border-[#b7c1ff] max-md:border-none flex flex-col justify-between items-start bg-white font-[Sf] max-md:w-full max-md:flex-row max-md:justify-between">
            <h1 className="flex flex-col gap-1">
              Do It{" "}
              <span className="text-[#6A64F1] text-[30px] pb-2 font-[SfBold] first-letter:uppercase">
                {user.username}
              </span>
            </h1>
            <button
              onMouseEnter={() => setBg("#ff6057")}
              onMouseLeave={() => setBg("")}
              onClick={LogOut}
              className="bg-[#FF3B30] p-3 rounded-full transition-all duration-300 hover:scale-125"
            ></button>
          </div>
          <div className="scroll-style p-4 w-full overflow-y-scroll">
            <Tasktable />
          </div>
        </div>
      ) : (
        <div className="max-w-[1000px] w-full">
          <Tableskeleton />
        </div>
      )}
    </motion.div>
  );
};

export default Me;
