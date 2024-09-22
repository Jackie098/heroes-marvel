import { useLocation } from "react-router-dom";

export function MenuNavigator() {
  const { pathname } = useLocation();
  console.log("🚀 ~ Header ~ pathname:", pathname);

  return (
    <menu className="flex justify-center items-center gap-6 h-[50px]">
      <li
        className={`uppercase ${
          pathname === "/"
            ? "font-bold after:content-[''] after:block after:h-2 after:bg-red-500 after:mt-[-4px] after: after:w-20 after:skew-x-[-12deg]"
            : ""
        }`}
      >
        <a href="">Pesquisar</a>
      </li>
      <li
        className={`uppercase ${
          pathname.includes("/hero/")
            ? "font-bold after:content-[''] after:block after:h-2 after:bg-red-500 after:mt-[-4px] after: after:w-20 after:skew-x-[-12deg]"
            : ""
        }`}
      >
        <a href="">Último herói</a>
      </li>
    </menu>
  );
}
