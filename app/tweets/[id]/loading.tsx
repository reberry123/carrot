export default function Loading() {
    return (
        <div className="flex flex-col gap-3 w-80 animate-pulse">
            <div className="flex flex-row items-center gap-3">
                <div className="size-12 rounded-full bg-neutral-300"/>
                <div className="rounded-full bg-neutral-300 w-36 h-6"/>
            </div>
            <div className="rounded-full bg-neutral-300 w-full h-6"/>
        </div>
    )
}