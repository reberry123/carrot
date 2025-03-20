"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { handleForm } from "./actions";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div>
      <span className="text-3xl font-bold py-5">Login</span>
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="Email" required={false} errors={state?.fieldErrors.email}></FormInput>
        <FormInput name="password" type="password" placeholder="Password" required errors={state?.fieldErrors.password}></FormInput>
        <FormButton text="Log in"></FormButton>
        <div className={`flex items-center px-6 w-96 h-16 bg-emerald-400 rounded-3xl ${state===undefined ? "block" : "hidden"}`}>Welcome back!</div>
      </form>
    </div>);
}
