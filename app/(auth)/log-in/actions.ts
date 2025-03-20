"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import {z} from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmail = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });
    return Boolean(user);
}

const formSchema = z.object({
    email: z.string().email().toLowerCase()
    .refine(checkEmail, "An account with this email does not exists."),
    password: z.string().min(PASSWORD_MIN_LENGTH, "Password should be at least 10 characters long.")
})

export async function handleForm(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    const result = await formSchema.safeParseAsync(data);

    if (!result.success) {
        return result.error.flatten();
    }
    else {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
            select: {
                id: true,
                password: true,
            },
        });

        const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
        if (ok) {
            const session = await getSession();
            session.id = user!.id;
            await session.save();
    
            redirect("/");
        }
        else {
            return {
                fieldErrors: {
                    password: ["Wrong password."],
                    email:[],
                }
            }
        }
    }
}