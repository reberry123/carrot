import Link from "next/link";

export default function Home() {
  return <main className="bg-sky-50 h-screen flex items-center justify-center p-10">
    <div className="flex flex-col items-center justify-center
    w-full h-full bg-white rounded-2xl shadow-lg
    gap-3 p-5">
      <span className="text-5xl font-bold my-10">Home Page</span>
      <Link className="text-lg text-gray-600 hover:text-black" href="/create-account">Create Account</Link>
      <Link className="text-lg text-gray-600 hover:text-black" href="/log-in">Log in</Link>
      <Link className="text-lg text-gray-600 hover:text-black" href="/profile">Profile</Link>
    </div>
  </main>;
}
