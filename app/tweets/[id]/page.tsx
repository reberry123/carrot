import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number) {
    const session = await getSession();
    if (session.id) {
        return session.id === userId;
    }
}

async function getTweet(id: number) {
    const tweet = await db.tweet.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                }
            }
        }
    });
  
    return tweet;
  }

export default async function TweetDetail({params}: {params: {id: string}}) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    const tweet = await getTweet(id);
    if (!tweet) {
        return notFound();
    }

    return (
    <div className="flex flex-col gap-3 w-80">
        <div className="flex flex-row items-center gap-3">
            <div className="size-12 rounded-full bg-neutral-300"/>
            <span className="text-xl font-bold">{tweet.user.username}</span>
            <span className="text-xl text-neutral-600">{formatToTimeAgo(tweet.created_at.toString())}</span>
        </div>
        <span className="text-xl">{tweet.tweet}</span>
    </div>);
}