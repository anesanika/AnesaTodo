// src/app/[username]/page.tsx
import { Metadata } from "next";
import Me from "@/app/components/user/Me";

type UserPageProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  return {
    title: `${params.username}'s Profile`,
    description: "Create Profile And Make Your Todos",
  };
}

const User = async ({ params }: UserPageProps) => {
  return (
    <div>
      <Me />
    </div>
  );
};

export default User;
