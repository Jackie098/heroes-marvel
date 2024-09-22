import { useLocation } from "react-router-dom";

export function MenuNavigator() {
  const { pathname } = useLocation();

  const sessionHeroId = sessionStorage.getItem("@HeroesMarvel:heroId");
  const hasHeroId = !!sessionHeroId;

  return (
    <menu className="flex justify-center items-center gap-6 h-[50px]">
      <li
        className={`uppercase ${
          pathname === "/"
            ? "font-bold after:content-[''] after:block after:h-2 after:bg-red-500 after:mt-[-4px] after: after:w-20 after:skew-x-[-12deg]"
            : ""
        }`}
      >
        <a href="/">Pesquisar</a>
      </li>
      <li
        className={`uppercase ${
          pathname.includes("/hero/")
            ? "font-bold after:content-[''] after:block after:h-2 after:bg-red-500 after:mt-[-4px] after: after:w-20 after:skew-x-[-12deg]"
            : !hasHeroId && "text-gray-400 hover:cursor-not-allowed"
        }`}
      >
        <a
          href={hasHeroId ? `/hero/${sessionHeroId}` : "#"}
          className={!hasHeroId && "text-gray-400 hover:cursor-not-allowed"}
        >
          Último herói
        </a>
      </li>
    </menu>
  );
}
