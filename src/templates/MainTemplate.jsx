import { Content } from "../shared/Content/index.jsx";
import { Footer } from "../shared/Footer/index.jsx";
import { Header } from "../shared/Header/index.jsx";
import { MenuNavigator } from "../shared/MenuNavigator/index.jsx";

export function MainTemplate({ children }) {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <MenuNavigator />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}
