import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="w-20 h-20 rounded-2xl mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-48 mx-auto" />
        </div>

        {/* Card Skeleton */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-5 w-48 mx-auto" />
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}







