"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { handleForm } from "./actions";
import { useFormState } from "react-dom";

export default function CreateAccount() {
  const [state, action] = useFormState(handleForm, null);

  return <main className="bg-sky-50 h-screen flex items-center justify-center p-10">
    <div className="flex flex-col items-center justify-center
    w-full h-full bg-white rounded-2xl shadow-lg
    gap-3 p-5">
      <span className="text-3xl font-bold py-5">Create Account</span>
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="Email" required={false} errors={state?.fieldErrors.email}></FormInput>
        <FormInput name="username" type="text" placeholder="Username" required={false} errors={state?.fieldErrors.username}></FormInput>
        <FormInput name="password" type="password" placeholder="Password" required errors={state?.fieldErrors.password}></FormInput>
        <FormInput name="confirm_password" type="password" placeholder="Confirm Password" required errors={state?.fieldErrors.confirm_password}></FormInput>
        <FormButton text="Create Account"></FormButton>
      </form>
    </div>
  </main>;
}
