import { Connectwallet } from "./connectWallet";

type FilterProps = {
  filters: { largeCap: boolean; volatile: boolean };
  setFilters: (value: { largeCap: boolean; volatile: boolean }) => void;
  input: string;
  setInput: (value: string) => void;
  setPage: (value: number) => void;
};

const Filter = ({ filters, setFilters, setInput, setPage }: FilterProps) => {
  const { largeCap, volatile } = filters;

  const setNewFilter = (newValue: "largeCap" | "volatile") => {
    setFilters({ ...filters, [newValue]: !filters[newValue] });
    setPage(1);
  };

  const setNewInput = (searchInput: string) => {
    setInput(searchInput);
    setPage(1);
  };

  return (
    <>
      <div className="search-wrap">
        <input
          className="rounded-md px-2 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
          type="text"
          placeholder="Search"
          onChange={(e) => setNewInput(e.target.value)}
        />
      </div>
      <div className="filter-wrap space-x-6 flex flex-row">
        <button
          onClick={() => setNewFilter("largeCap")}
          className={`btn bg-green ${!largeCap && "opacity-60"}`}
        >
          Large Cap
        </button>
        <button
          onClick={() => setNewFilter("volatile")}
          className={`btn bg-black ${!volatile && "opacity-60"}`}
        >
          Volatile
        </button>
      </div>
      <div className="">
        <Connectwallet />
      </div>
    </>
  );
};

export default Filter;
