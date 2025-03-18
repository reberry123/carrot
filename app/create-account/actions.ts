"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import {z} from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const passwordRegex = PASSWORD_REGEX;
const checkPasswords = ({password, confirm_password}: 
    {password: string, confirm_password: string}) => 
        password === confirm_password
const checkUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        },
    });
    return !Boolean(user);
}
const checkEmail = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });
    return !Boolean(user);
}

const formSchema = z.object({
    username: z.string().min(5, "Username should be at least 5 characters long."),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH, "Password should be at least 10 characters long.")
    .regex(passwordRegex, "Password should contain at least one number (0123456789)."),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH, "Password should be at least 10 characters long."),
})
.superRefine(async ({email}, ctx) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        }
    });
    if (user) {
        ctx.addIssue({
            code: "custom",
            message: "There is an account already registered with that email.",
            path: ["email"],
            fatal: true,
        });
        return z.NEVER;
    }
})
.superRefine(async ({username}, ctx) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        }
    });
    if (user) {
        ctx.addIssue({
            code: "custom",
            message: "This username is already taken.",
            path: ["username"],
            fatal: true,
        });
        return z.NEVER;
    }
})
.refine(checkPasswords, 
    {
        message: "Both passwords should be the same.",
        path: ["confirm_password"],
});

export async function handleForm(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    }

    const result = await formSchema.safeParseAsync(data);

    if (!result.success) {
        return result.error.flatten();
    }
    else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12);

        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword,
            },
            select: {
                id: true,
            },
        });

        redirect("/");
    }
}