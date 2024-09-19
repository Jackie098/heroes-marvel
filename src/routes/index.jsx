import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { HeroDetails } from "../pages/HeroDetails";

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
