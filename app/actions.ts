"use server";
import {z} from "zod";

const passwordRegex = new RegExp("\\d");
const checkEmail = (email: string) => {
    return email.includes("@zod.com");
}

const formSchema = z.object({
    username: z.string().min(5, "Username should be at least 5 characters long."),
    email: z.string().email().refine(checkEmail, "Only @zod.com emails are allowed."),
    password: z.string().min(10, "Password should be at least 10 characters long.")
    .regex(passwordRegex, "Password should contain at least one number (0123456789)."),
})

export async function handleForm(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    }

    const result = formSchema.safeParse(data);

    if (!result.success) {
        return result.error.flatten();
    }
}