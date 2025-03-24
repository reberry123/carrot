"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useState } from "react";
import { uploadTweet } from "./actions";
import { useFormState } from "react-dom";

export default function AddTweet() {
    const [state, action] = useFormState(uploadTweet, null);
    const [preview, setPreview] = useState("");
    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target:{files},
        } = event;

        if (!files) return;
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    return (
        <div>
            <div className="flex flex-row gap-5 mt-5">
                <div className="size-12 rounded-full bg-neutral-300"/>
                <form action={action} className="flex flex-col gap-5">
                    <FormInput name="tweet" type="text" placeholder="Add tweet..." errors={state?.fieldErrors.tweet} required></FormInput>
                    <label
                        htmlFor="photo"
                        className="size-96
                        flex items-center justify-center 
                        rounded-lg border-2 border-dashed border-neutral-300 
                        hover:cursor-pointer text-neutral-400
                        bg-center bg-cover"
                        style={{
                            backgroundImage: `url(${preview})`,
                        }}>
                        {preview === "" ? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg> : null}
                    </label>
                    <input 
                        onChange={onImageChange}
                        type="file"
                        id="photo"
                        name="photo"
                        className="hidden"/>
                    <FormButton text="Post"/>
                </form>
            </div>
        </div>
    );
}