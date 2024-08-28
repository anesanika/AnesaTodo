import React from "react";
import { Metadata } from "next";
import Register from "../components/register/Register";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create Profile And Make Your Todos",
};

const RegsiterServer: React.FC = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default RegsiterServer;
