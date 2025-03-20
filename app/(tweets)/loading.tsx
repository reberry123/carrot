export default function Loading() {
    return (
        <div className="flex flex-col gap-20 p-5 animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-row gap-5 w-64">
            <div className="size-10 rounded-full bg-neutral-300"/>
            <div className="flex flex-col gap-1">
              <div className="rounded-full bg-neutral-300 w-32 h-5"/>
              <div className="rounded-full bg-neutral-300 w-full h-5"/>
            </div>
          </div>
        ))}
      </div>);
}