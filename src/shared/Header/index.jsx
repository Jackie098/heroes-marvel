import logo from "/public/marvel_logo.svg";

export function Header() {
  return (
    <header className="w-full flex justify-center bg-slate-900 h-12">
      <img src={logo} alt="Logo" />
    </header>
  );
}
