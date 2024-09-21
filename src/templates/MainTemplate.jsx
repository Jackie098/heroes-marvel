import { Header } from "../shared/Header/index.jsx";
import { Content } from "../shared/Content/index.jsx";
import { Footer } from "../shared/Footer/index.jsx";
import { MenuNavigator } from "../shared/MenuNavigator/index.jsx";

export function MainTemplate({ children }) {
  return (
    // w-full flex flex-col
    <div className="h-full flex flex-col">
      <Header />
      <MenuNavigator />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}
