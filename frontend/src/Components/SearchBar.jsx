export default function SearchBar({ value, onChange, onSearch }) {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search meals like chicken, pasta..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-3 rounded-xl border border-gray-300
                     focus:outline-none focus:ring-4 focus:ring-lime-300
                     bg-white"
        />
  
        <button
          onClick={onSearch}
          className="px-6 py-3 rounded-xl font-semibold
                     bg-gradient-to-r from-emerald-500 to-lime-400
                     text-white hover:scale-[1.02] transition
                     shadow-md"
        >
          Search
        </button>
      </div>
    );
  }
  