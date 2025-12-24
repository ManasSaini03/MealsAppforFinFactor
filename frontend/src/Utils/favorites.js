const KEY = "favoriteMeals";

export const getFavorites = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export const toggleFavorite = (meal) => {
  const favs = getFavorites();
  const exists = favs.find((m) => m.idMeal === meal.idMeal);

  const updated = exists
    ? favs.filter((m) => m.idMeal !== meal.idMeal)
    : [...favs, meal];

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
};

export const isFavorite = (id) =>
  getFavorites().some((m) => m.idMeal === id);
