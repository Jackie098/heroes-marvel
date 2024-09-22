import { useLocation } from "react-router-dom";
import logo from "/marvel_logo.svg";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

function BackButton({ active = false, handleBack }) {
  if (!active) return null;

  return (
    <button
      onClick={handleBack}
      className="absolute h-full w-full max-w-20 left-0 bg-red-600 flex justify-center items-center text-white transition-all ease-in hover:max-w-40 active:bg-red-800"
    >
      <ChevronLeftIcon className="w-6 stroke-[3px]" />
    </button>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const isLastHero = pathname.includes("/hero/");

  function handleBack() {
    window.history.back();
  }

  return (
    <header className="relative w-full flex justify-center bg-gray-900 h-14">
      <BackButton active={isLastHero} handleBack={handleBack} />
      <img src={logo} alt="Logo" />
    </header>
  );
}
