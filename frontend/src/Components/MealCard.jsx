import { Link } from "react-router-dom";

export default function MealCard({ meal }) {
  return (
    <Link
      to={`/meal/${meal.idMeal}`}
      className="bg-[var(--surface)]
                 rounded-2xl overflow-hidden
                 shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                 hover:shadow-[0_20px_40px_rgba(0,0,0,0.28)]
                 transform hover:-translate-y-1 transition-all"
    >
      {/* Smaller Image */}
      <div className="overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-36 w-full object-cover
                     transform hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-[var(--text)] text-sm leading-tight">
          {meal.strMeal}
        </h3>

        <p className="text-xs mt-1 opacity-70">
          {meal.strCategory}
        </p>
      </div>
    </Link>
  );
}
