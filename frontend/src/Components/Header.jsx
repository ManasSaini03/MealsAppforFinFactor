import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)] shadow-lg">

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          {location.pathname !== "/" && (
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 rounded-lg text-sm
                         bg-[var(--accent)] text-[var(--primary)]
                         hover:opacity-80"
            >
              ← Back
            </button>
          )}

          <Link
            to="/"
            className="text-xl font-extrabold text-[var(--primary)]"
          >
            🍽️ ManasMeals
          </Link>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 rounded-lg text-sm
                     bg-[var(--primary)] text-white
                     hover:opacity-90"
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}
