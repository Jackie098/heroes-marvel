import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/index.jsx";
import { HeroDetails } from "../pages/HeroDetails/index.jsx";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/hero",
    element: <HeroDetails />,
  },
];

export const router = createBrowserRouter(routes);
