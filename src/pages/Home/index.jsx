import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination/index.jsx";
import { MarvelHeroesService } from "../../services/api/MarvelHeroesService.js";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const AMOUNT_PER_PAGE = 10;

export function Home() {
  let navigate = useNavigate();

  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasActiveSearch, setHasActiveSearch] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [name, setName] = useState("");

  useEffect(() => {
    const marvelHeroesService = new MarvelHeroesService();

    const params = {
      offset: (currentPage - 1) * AMOUNT_PER_PAGE,
      limit: AMOUNT_PER_PAGE,
    };

    marvelHeroesService
      .getHeroes(params)
      .then((response) => {
        setHeroes(response.data.results);

        if (response.data.total > 0) {
          setTotalPages(Math.floor(response.data.total / response.data.count));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const marvelHeroesService = new MarvelHeroesService();
    //             offset - limit
    // pagina: 1  => - 0 - 9
    // pagina: 2  => - 10 - 19
    // pagina: 3 => - 20 - 29

    const offset = (currentPage - 1) * AMOUNT_PER_PAGE; //0 10 20
    const limit = AMOUNT_PER_PAGE; //10 20 30

    const queryParams = {
      offset,
      limit,
      nameStartsWith: name || undefined,
    };

    marvelHeroesService
      .getHeroes(queryParams)
      .then((response) => {
        setHeroes(response.data.results);
        if (response.data.total > 0) {
          setTotalPages(Math.floor(response.data.total / response.data.count));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e, name) {
    e.preventDefault();

    setIsLoading(true);
    setHasActiveSearch(true);

    const marvelHeroesService = new MarvelHeroesService();

    const params = {
      nameStartsWith: name,
      limit: AMOUNT_PER_PAGE,
      offset: (currentPage - 1) * AMOUNT_PER_PAGE,
    };

    marvelHeroesService
      .getHeroes(params)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        setHeroes(response.data.results);

        if (response.data.total > 0) {
          setCurrentPage(1);
          setTotalPages(Math.floor(response.data.total / response.data.count));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handlePageClick(page) {
    setHasActiveSearch(true);
    setCurrentPage(page);
  }

  function handleClearSearch() {
    setIsLoading(true);
    setCurrentPage(1);
    setHasActiveSearch(false);
    setName("");
    setIsLoading(false);
  }

  function handleSeeDetails(id) {
    navigate(`/hero/${id}`);
  }

  const LoadedCardList = () =>
    isLoading ? (
      <div className="w-full h-full flex flex-col justify-center items-center text-white font-bold">
        Carregando...
      </div>
    ) : heroes.length === 0 ? (
      <div className="w-full h-full flex flex-col justify-center items-center text-white font-bold">
        Não há dados carregados!
      </div>
    ) : (
      <div className="px-6 w-full h-full flex gap-5 justify-center flex-wrap">
        {heroes.map((hero, idx) => (
          <div
            key={idx}
            className="flex flex-col w-64 bg-white max-h-96 py-1 justify-between transition-all hover:scale-110"
          >
            <div>
              <div className="flex justify-between px-4">
                {/* FIXME: Test ellipts */}
                <h4 className="size-8 font-semibold w-36 max-h-[24px] text-ellipsis overflow-hidden">
                  {hero.name}
                </h4>
                <span className="size-3 font-light text-gray-500 w-fit">
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
              <button
                onClick={() => handleSeeDetails(hero.id)}
                className="px-2 py-0.5 border-2 border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700 active:bg-gray-900 active:text-red-500 active:border-gray-900"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    );

  // if (heroes.length === 0) {
  //   return (

  //   );
  // }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex">
        <form
          onSubmit={(e) => handleSubmit(e, name)}
          className="w-full flex gap-2 justify-center py-6 flex-wrap"
        >
          <input
            type="text"
            value={name}
            placeholder="Digite o nome do herói aqui..."
            onChange={handleChangeName}
            className="border-2 border-black skew-x-[-12deg] pl-4"
          />
          <button
            type="submit"
            className="border-2 border-red-600 bg-red-600 text-white font-semibold py-2 px-3 skew-x-[-12deg] uppercase flex gap-2 items-center hover:border-red-700 hover:bg-red-700 active:border-red-800 active:bg-red-800"
          >
            <MagnifyingGlassIcon className="w-5 stroke-3" /> Search
          </button>
          {hasActiveSearch && (
            <button
              onClick={(e) => handleClearSearch()}
              className="text-white font-normal italic pu-2 px-3 underline"
            >
              Clear Search
            </button>
          )}
        </form>
      </div>
      <div className="w-full flex justify-center mb-7">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageClick={handlePageClick}
        />
      </div>
      <LoadedCardList />
    </div>
  );
}
