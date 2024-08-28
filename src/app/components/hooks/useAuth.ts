// hooks/useAuth.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserInterface {
  id: number;
  username: string;
  email?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/todo/me/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setUser(response.data);
      } catch (e) {
        console.log("You Are Unauthorized");
        setError(e);
      }
    };

    getUser();
  }, []);

  const redirectIfAuthenticated = (redirectPath: string) => {
    if (user) {
      router.push(redirectPath);
    }
  };

  return { user, redirectIfAuthenticated, error };
};
