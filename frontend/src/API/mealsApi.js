import axios from "axios";

const API_BASE = "http://localhost:8080/api/meals";

export const searchMeals = (name) =>
    axios.get(`${API_BASE}/search`, { params: { name } });
  
  export const getMealById = (id) =>
    axios.get(`${API_BASE}/${id}`);
  
  export const getRandomMeal = () =>
    axios.get(`${API_BASE}/random`);
  
  export const getCategories = () =>
    axios.get(`${API_BASE}/categories`);
  
  export const getMealsByCategory = (category) =>
    axios.get(`${API_BASE}/category/${category}`);