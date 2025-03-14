"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { handleForm } from "./actions";
import { useFormState } from "react-dom";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  return <main className="bg-sky-50 h-screen flex items-center justify-center p-10">
    <div className="flex flex-col items-center justify-center
    w-full h-full bg-white rounded-2xl shadow-lg
    gap-3 p-5">
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="Email" required={false} errors={state?.fieldErrors.email}></FormInput>
        <FormInput name="username" type="text" placeholder="Username" required={false} errors={state?.fieldErrors.username}></FormInput>
        <FormInput name="password" type="password" placeholder="Password" required errors={state?.fieldErrors.password}></FormInput>
        <FormButton text="Log in"></FormButton>
        <div className={`flex items-center px-6 w-96 h-16 bg-emerald-400 rounded-3xl ${state===undefined ? "block" : "hidden"}`}>Welcome back!</div>
      </form>
    </div>
  </main>;
}
