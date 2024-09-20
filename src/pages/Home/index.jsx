import React, { useEffect, useState } from "react";
import { MainTemplate } from "../../templates/MainTemplate";
import { MarvelHeroesService } from "../../services/api/MarvelHeroesService";

export function Home() {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");

  useEffect(() => {
    const marvelHeroesService = new MarvelHeroesService();

    marvelHeroesService
      .getHeroes()
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        setHeroes(response.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSearch(name) {
    setIsLoading(true);

    const marvelHeroesService = new MarvelHeroesService();

    const params = {
      nameStartsWith: name,
    };

    marvelHeroesService
      .getHeroes(params)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        setHeroes(response.data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        Carregando...
      </div>
    );
  }

  if (heroes.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        Não há dados carregados!
      </div>
    );
  }

  return (
    <MainTemplate>
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex gap-2 justify-center py-6 flex-wrap">
          <input
            type="text"
            placeholder="Digite o nome do herói aqui..."
            className="border-2 border-black skew-x-[-12deg] pl-4"
            onChange={handleChangeName}
          />
          <button
            onClick={() => handleSearch(name)}
            className="border-2 border-red-600 bg-red-600 text-white font-semibold py-2 px-3 skew-x-[-12deg] uppercase hover:bg-red-700 focus:bg-red-800"
          >
            Icon Search
          </button>
        </div>
        <div className="px-6 w-full h-full flex gap-5 justify-center flex-wrap">
          {heroes.map((hero, idx) => (
            <div
              key={idx}
              className="flex flex-col w-64 bg-white max-h-96 py-1 justify-between"
            >
              <div>
                <div className="flex justify-between px-4">
                  {/* FIXME: Test ellipts */}
                  <h4 className="size-8 font-semibold w-36 max-h-[24px] text-ellipsis overflow-hidden">
                    {hero.name}
                  </h4>
                  <span className="size-3 font-light text-slate-500 w-fit">
                    #{hero.id}
                  </span>
                </div>
                <div>
                  <img
                    src={`${hero.thumbnail.path}/standard_fantastic.jpg?apiKey=ff1bdb7e8c57dc2a2e38ed23899f3e8e`}
                    alt="Hero"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between px-2 py-2">
                  <span className="font-medium">
                    Comics: {hero.comics.available}
                  </span>
                  <span className="font-medium">
                    Events: {hero.events.available}
                  </span>
                  <span className="font-medium">
                    Series: {hero.series.available}
                  </span>
                  <span className="font-medium">
                    Stories: {hero.stories.available}
                  </span>
                </div>
              </div>
              <div className="flex justify-end items-end px-4 pb-2">
                <button className="px-2 py-0.5 border-2 border-red-600 bg-red-600 text-white">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainTemplate>
  );
}
