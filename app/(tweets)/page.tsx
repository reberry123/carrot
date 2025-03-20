import ListTweet from "@/components/list-tweet";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getTweets() {
  const tweets = await db.tweet.findMany({
    // select: {
    //   id: true,
    //   userId: true,
    //   tweet: true,
    //   created_at: true,
    // },
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

export type initialTweets = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Tweets() {
  const initialTweets = await getTweets();

  return (
    <div className="flex justify-center w-full overflow-y-scroll">
      <TweetList initialTweets={initialTweets}/>
    </div>);
}
