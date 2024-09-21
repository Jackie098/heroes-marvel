import { useEffect, useState } from "react";
import { MarvelHeroesService } from "../../services/api/MarvelHeroesService.js";
import { Pagination } from "../../components/Pagination/index.jsx";

const AMOUNT_PER_PAGE = 10;

export function Home() {
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasActiveSearch, setHasActiveSearch] = useState(false);
  // const [pagination, setPagination] = useState({
  //   totalPages: 1,
  //   count: AMOUNT_PER_PAGE,
  //   limit: AMOUNT_PER_PAGE,
  //   offset: 0,
  //   total: 0,
  // });

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [name, setName] = useState("");

  useEffect(() => {
    const marvelHeroesService = new MarvelHeroesService();

    const params = {
      offset: (currentPage - 1) * AMOUNT_PER_PAGE, //pagination.offset,
      limit: AMOUNT_PER_PAGE, //pagination.limit,
    };

    marvelHeroesService
      .getHeroes(params)
      .then((response) => {
        setHeroes(response.data.results);

        if (response.data.total > 0) {
          setTotalPages(Math.floor(response.data.total / response.data.count));
        }
        // setPagination((prev) => ({
        //   ...prev,
        //   totalPages: Math.floor(response.data.total / response.count),
        //   limit: response.data.limit,
        //   offset: response.data.offset,
        // }));
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

    // setPagination((prev) => ({
    //   ...prev,
    //   offset,
    //   limit,
    // }));

    const queryParams = {
      offset,
      limit,
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
      offset: (currentPage - 1) * AMOUNT_PER_PAGE,
      limit: AMOUNT_PER_PAGE,
    };

    marvelHeroesService
      .getHeroes(params)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        setHeroes(response.data.results);
        if (response.data.total > 0) {
          setTotalPages(Math.floor(response.data.total / response.data.count));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handlePageClick(page) {
    setCurrentPage(page);
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
            placeholder="Digite o nome do herói aqui..."
            className="border-2 border-black skew-x-[-12deg] pl-4"
            onChange={handleChangeName}
          />
          <button
            type="submit"
            className="border-2 border-red-600 bg-red-600 text-white font-semibold py-2 px-3 skew-x-[-12deg] uppercase hover:bg-red-700 focus:bg-red-800"
          >
            Icon Search
          </button>
          {hasActiveSearch && (
            <button
              onClick={(e) => handleSubmit(e, undefined)}
              className="text-white font-normal italic pu-2 px-3 underline"
            >
              Clear Search X
            </button>
          )}
        </form>
        <div></div>
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
