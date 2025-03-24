"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import fs from "fs/promises";

const tweetSchema = z.object({
    photo: z.string(),
    tweet: z.string({
        required_error: "Tweet is required.",
    }).max(200),
})

export async function getMoreTweets(page: number) {
    const tweets = await db.tweet.findMany({
        skip: page * 5,
        take: 5,
        orderBy: {
            created_at: "desc",
        },
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    });

    return tweets;
}

export async function uploadTweet(prevState: any, formData:FormData) {
    const data = {
        photo: formData.get("photo"),
        tweet: formData.get("tweet"),
    };

    if (data.photo instanceof File) {
        if (data.photo.name === undefined) {
            data.photo = "";
        }
        else {
            const photoData = await data.photo.arrayBuffer();
            await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
            data.photo = `/${data.photo.name}`;
        }
    }
    const result = tweetSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        const session = await getSession();
        if (session.id) {
            const tweet = await db.tweet.create({
                data: {
                    tweet: result.data.tweet,
                    user: {
                        connect: {
                            id: session.id,
                        }
                    }
                }
            });
            redirect(`/tweets/${tweet.id}`);
        }
    }
}