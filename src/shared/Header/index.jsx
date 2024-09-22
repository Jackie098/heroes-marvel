import logo from "/marvel_logo.svg";

export function Header() {
  return (
    <header className="w-full flex justify-center bg-gray-900 h-14">
      <img src={logo} alt="Logo" />
    </header>
  );
}
