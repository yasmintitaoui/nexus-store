// src/components/LoadingSkeleton.jsx
export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
          
          {/* Left: Gallery Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10" />
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/10" />
              ))}
            </div>
          </div>

          {/* Right: Info Skeleton */}
          <div className="space-y-8">
            <div className="h-8 bg-white/5 rounded w-3/4" />
            <div className="h-16 bg-white/5 rounded w-full" />
            <div className="h-12 bg-white/5 rounded w-1/2" />

            <div className="space-y-6">
              <div className="h-6 bg-white/5 rounded w-24" />
              <div className="flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-14 h-14 bg-white/5 rounded-full border border-white/10" />
                ))}
              </div>

              <div className="h-6 bg-white/5 rounded w-20" />
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-14 bg-white/5 rounded-xl border border-white/10" />
                ))}
              </div>

              <div className="h-16 bg-white/10 rounded-2xl" />
              <div className="h-20 bg-white/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}