import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
        <Skeleton className="h-6 w-full mb-12" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-4">
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
