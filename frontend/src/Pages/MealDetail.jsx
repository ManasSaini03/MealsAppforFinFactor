import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../Components/Header";
import MealDetailSkeleton from "../Components/MealDetailSkeleton";
import { getMealById } from "../API/mealsApi";
import { toggleFavorite, isFavorite } from "../Utils/favorites";

export default function MealDetail() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setLoading(true);

    getMealById(id)
      .then((res) => {
        const fetchedMeal = res.data.meals?.[0] || null;
        setMeal(fetchedMeal);
        setFav(isFavorite(id));
      })
      .catch(() => setMeal(null))
      .finally(() => {
        setLoading(false);
        window.scrollTo(0, 0);
      });
  }, [id]);

  const getEmbedUrl = (url) =>
    url ? url.replace("watch?v=", "embed/") : null;

  // Extract ingredients safely
  const ingredients = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push({ ing, meas });
      }
    }
  }

  /* ---------- STATES ---------- */

  if (loading) {
    return (
      <>
        <Header />
        <MealDetailSkeleton />
      </>
    );
  }

  if (!meal) {
    return (
      <>
        <Header />
        <p className="text-center mt-10 text-red-500">
          Meal not found
        </p>
      </>
    );
  }

  /* ---------- UI ---------- */

  return (
    <>
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">

        {/* IMAGE + META */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="
                w-full
                max-w-md
                h-auto
                object-cover
                rounded-2xl
                shadow-lg
              "
            />
          </div>

          {/* META */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-[var(--text)]">
              {meal.strMeal}
            </h1>

            <button
              onClick={() => {
                toggleFavorite(meal);
                setFav(!fav);
              }}
              className="
                mt-3 px-4 py-2 rounded-lg
                bg-[var(--accent)]
                text-[var(--text)]
                hover:scale-105 transition
              "
            >
              {fav ? "❤️ Saved" : "🤍 Save to Favorites"}
            </button>

            <p className="text-sm opacity-80 mt-3">
              🍽 <strong>{meal.strCategory}</strong> · 🌍{" "}
              <strong>{meal.strArea}</strong>
            </p>
          </div>

        </section>

        {/* INGREDIENTS (FULL WIDTH) */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-center">
            🧂 Ingredients
          </h2>

          <div className="
            grid grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            gap-4
          ">
            {ingredients.map(({ ing, meas }, index) => (
              <div
                key={index}
                className="
                  bg-[var(--surface)]
                  rounded-xl
                  shadow
                  p-3
                  text-center
                "
              >
                <img
                  src={`https://www.themealdb.com/images/ingredients/${ing}.png`}
                  alt={ing}
                  className="h-10 mx-auto mb-1"
                />
                <p className="text-sm font-medium">{ing}</p>
                <p className="text-xs opacity-70">{meas}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INSTRUCTIONS */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">
            📖 Instructions
          </h2>

          <p className="whitespace-pre-line leading-relaxed text-center md:text-left">
            {meal.strInstructions}
          </p>
        </section>

        {/* VIDEO */}
        {meal.strYoutube && (
          <section className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">
              🎥 Recipe Video
            </h2>

            <div
              className="
                relative w-full
                overflow-hidden
                rounded-xl
                shadow-md
              "
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                src={getEmbedUrl(meal.strYoutube)}
                title="Recipe Video"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
          </section>
        )}

      </main>
    </>
  );
}
