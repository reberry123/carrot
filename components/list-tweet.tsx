import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface ListTweetProps {
    id: number,
    userId: number,
    tweet: string,
    created_at: Date,
    updated_at: Date,
    user: {
        username: string,
    }
}

export default async function ListTweet({
    id, userId, tweet, created_at, updated_at, user: {username}
  }: ListTweetProps) {
    return <Link href={`/tweets/${id}`}>
        <div className="flex flex-row gap-5 w-64">
            <div className="size-12 rounded-full bg-neutral-300"/>
            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-3">
                    <span className="text-lg font-bold">{username}</span>
                    <span className="text-lg text-neutral-600">{formatToTimeAgo(created_at.toString())}</span>
                </div>
                <span className="text-lg">{tweet}</span>
            </div>
        </div>
    </Link>;

}