import { Header } from "../shared/Header";
import { Content } from "../shared/Content";
import { Footer } from "../shared/Footer";
import { MenuNavigator } from "../shared/MenuNavigator";

export function MainTemplate({ children }) {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <MenuNavigator />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}
