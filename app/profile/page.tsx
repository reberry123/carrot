import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    })
    return user;
  }
}

export default async function Profile() {

  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  }

  return (
    <div>
      <span className="text-3xl font-bold py-5">{user?.username}'s Profile Page</span>
      <form action={logOut}>
        <button className="w-96 h-12 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors">
          <span className="text-lg text-gray-700 font-bold">Log out</span>
        </button>
      </form>
    </div>);
}
