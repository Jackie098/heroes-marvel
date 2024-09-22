import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/index.jsx";
import { HeroDetails } from "../pages/HeroDetails/index.jsx";
import { MainTemplate } from "../templates/MainTemplate.jsx";

const routes = [
  {
    path: "/",
    element: (
      <MainTemplate>
        <Home />
      </MainTemplate>
    ),
  },
  {
    path: "/hero/:id",
    element: (
      <MainTemplate>
        <HeroDetails />,
      </MainTemplate>
    ),
  },
];

export const router = createBrowserRouter(routes);
