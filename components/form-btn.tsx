"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
    text: string;
}

export default function FormButton({ text }: FormButtonProps) {
    const {pending} = useFormStatus();
    return (
        <button disabled={pending}
        className="primary-btn w-96 h-12 rounded-full bg-gray-300
        disabled:bg-neutral-400
        disabled:text-neutral-300
        disabled:cursor-not-allowed">
            <span className="text-sm text-gray-700 font-bold">{pending ? "Loading..." : text}</span>
        </button>
    )
}