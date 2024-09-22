import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MarvelHeroesService } from "../../services/api/MarvelHeroesService.js";

export function HeroDetails() {
  const { id } = useParams();

  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const marvelHeroesService = new MarvelHeroesService();

    marvelHeroesService
      .getHero(id)
      .then((response) => {
        setHero(response.data.results[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mt-5 h-full max-h-[450px] w-full max-w-[1200px] flex self-center justify-around flex-wrap z-10 ">
        <div className="w-full max-w-[450px] -skew-x-[12deg]">
          <img
            src={`${hero.thumbnail.path}/standard_fantastic.jpg?apiKey=ff1bdb7e8c57dc2a2e38ed23899f3e8e`}
            alt="Hero"
            className="w-full object-fill mix-blend-multiply"
          />
        </div>
        <div className="w-full max-w-[700px] bg-white p-5 -skew-x-[12deg]">
          <h1 className="text-4xl font-bold">{hero.name}</h1>
          <p className="mt-5 text-2xl">{hero?.description}</p>
        </div>
      </div>
      <div className="self-center content-[''] h-10 bg-red-500 w-full max-w-[1150px] skew-x-[-12deg] -mt-5 -ml-5 b max-[1158px]:hidden"></div>
    </div>
  );
}
