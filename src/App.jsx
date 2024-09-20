import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.jsx";
import { MainTemplate } from "./templates/MainTemplate.jsx";

function App() {
  return (
    <MainTemplate>
      <RouterProvider router={router} />;
    </MainTemplate>
  );
}

export default App;
