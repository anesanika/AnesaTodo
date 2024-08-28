import Login from "../components/login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log-In Account",
  description: "Create Profile And Make Your Todos",
};

const LoginSide: React.FC = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginSide;
