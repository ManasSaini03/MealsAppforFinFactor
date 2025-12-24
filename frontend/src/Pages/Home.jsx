import { useEffect, useState } from "react";
import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";
import MealCard from "../Components/MealCard";
import Loader from "../Components/Loader";
import CategoryCard from "../Components/CategoryCard";

import {
  searchMeals,
  getRandomMeal,
  getCategories,
  getMealsByCategory,
} from "../API/mealsApi";

export default function Home() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load categories on page load
    getCategories().then((res) => {
      setCategories(res.data.categories || []);
    });
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const res = await searchMeals(query);
    setMeals(res.data.meals || []);
    setLoading(false);
  };

  const randomMeal = async () => {
    setLoading(true);
    const res = await getRandomMeal();
    setMeals(res.data.meals || []);
    setLoading(false);
  };

  const loadByCategory = async (category) => {
    setLoading(true);
    const res = await getMealsByCategory(category);
    setMeals(res.data.meals || []);
    setLoading(false);
  };

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* SEARCH */}
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />

<button
  onClick={randomMeal}
  className="mt-4 w-full sm:w-auto
             bg-gradient-to-r from-[#BBC863] to-[#658C58]
             text-[#31694E] font-bold
             px-6 py-3 rounded-xl
             shadow-lg hover:scale-[1.03]
             transition"
>
  🎲 Surprise Me with a Random Recipe
</button>

        </div>

        {/* CATEGORIES */}
        <section>
        <h2 className="text-xl font-bold mb-4 text-[var(--text)]">
  Browse Categories</h2>


          <div   className="
    grid grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-6
    gap-4
  "
>
            {categories.map((cat) => (
              <CategoryCard
                key={cat.idCategory}
                category={cat}
                onClick={loadByCategory}
              />
            ))}
          </div>
        </section>

        {/* RESULTS */}
        <section>
          {loading ? (
            <Loader />
          ) : (
            <div className="
              grid grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-5
            ">
              {meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </section>

      </main>
    </>
  );
}
