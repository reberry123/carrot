"use client";

import { initialTweets } from "@/app/(tweets)/page";
import ListTweet from "./list-tweet";
import { useEffect, useRef, useState } from "react";
import { getMoreTweets } from "@/app/(tweets)/actions";

interface TweetListProps {
    initialTweets: initialTweets;
}

export default function TweetList({initialTweets}: TweetListProps) {
    const [tweets, setTweets] = useState(initialTweets);
    const [isLoading, setisLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    const trigger = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries: IntersectionObserverEntry[],
                observer: IntersectionObserver) => {
                const element = entries[0];
                if (element.isIntersecting && trigger.current) {
                    observer.unobserve(trigger.current);
                    setisLoading(true);
                    const newTweets = await getMoreTweets(page + 1);

                    if (newTweets.length !== 0) {
                        setPage((prev) => prev + 1);
                        setTweets((prev) => [...prev, ...newTweets]);
                    } else {
                        setIsLastPage(true);
                    }
                    setisLoading(false);
                }
            }
        );
        if (trigger.current) {
            observer.observe(trigger.current);
        }
        return () => {
            observer.disconnect();
        }
    }, [page]);

    return (
        <div className="flex flex-col gap-20">
            {tweets.map(tweet => <ListTweet key={tweet.id} {...tweet}/>)}
            {!isLastPage ? (<span ref={trigger}>Load More</span>) : null}
        </div>
    )
}