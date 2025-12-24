import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MealDetail from "./Pages/MealDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
