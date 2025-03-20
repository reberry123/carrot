"use server";

import db from "@/lib/db";

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