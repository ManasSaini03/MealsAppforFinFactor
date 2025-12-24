export default function Loader() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-2xl bg-gradient-to-r
                       from-gray-200 via-gray-100 to-gray-200
                       animate-pulse"
          />
        ))}
      </div>
    );
  }
  