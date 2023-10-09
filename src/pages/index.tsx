"use client";
import { Coin } from "../types";
import { COIN_DATA } from "../constants";
import { useEffect, useState } from "react";
import Filter from "@/components/filter";
import { CoinList } from "@/components/coinList";
import RootLayout from "@/app/layout";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

type GetCoinsParams = {
  vs_currency?: string;
  order?: string;
  per_page?: number;
  page?: number;
  locale?: string;
};

export const getCoins = async (params: GetCoinsParams = {}) => {
  try {
    // const { data } = await axios.get(`${API_BASE_URL}/coins/markets`, {
    //   params: {
    //     vs_currency: "usd",
    //     order: "market_cap_desc",
    //     per_page: 100,
    //     page: 1,
    //     locale: "en", // might not want to hardcode, since users can be in any region
    //     ...params,
    //   },
    // });
    // console.log("data: ", data);
    // return data;

    return new Promise((resolve) => setTimeout(() => resolve(COIN_DATA), 300));
  } catch (err: any) {
    console.error(err.message);
  }
};

const PER_PAGE = 10;

export default function Home() {
  const [filters, setFilters] = useState({
    largeCap: false,
    volatile: false,
  });
  const [coins, setCoins] = useState<Coin[] | null>(null);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    try {
      const coinData = await getCoins();
      setCoins(coinData);
    } catch (err: any) {
      console.warn(err.message);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  let displayedCoins: Coin[] = [];

  if (coins) {
    displayedCoins = coins;
    if (input) {
      displayedCoins = coins.filter((coin) => {
        return coin.name.toLowerCase().includes(input.toLowerCase());
      });
    }

    displayedCoins = displayedCoins.filter((coin) => {
      if (filters.largeCap && coin.market_cap_rank > 5) return false;
      if (filters.volatile && coin.price_change_percentage_24h < 10)
        return false;
      return true;
    });
  }

  const pageCoins = displayedCoins.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  const numPages = Math.floor(displayedCoins.length / PER_PAGE);

  const isLeftShown = page > 1;
  const isRightShown = page < numPages;

  return (
    <RootLayout>
      <div className="content min-w-[1280px]">
        <div className="searchbar flex flex-row justify-between mb-12">
          <Filter
            input={input}
            setInput={setInput}
            filters={filters}
            setFilters={setFilters}
            setPage={setPage}
          />
        </div>
        <div className="result-list">
          {coins?.length && <CoinList coins={pageCoins} />}
        </div>
        {coins?.length && (
          <div className="pagination">
            <div className="flex flex-row justify-center items-center space-x-4">
              <button
                disabled={!isLeftShown}
                onClick={() => setPage(page - 1)}
                className={`rounded-md px-4 py-2 text-white bg-red-500 ${
                  !isLeftShown && "opacity-50"
                }`}
              >
                Prev
              </button>
              <div className="text-xl text-gray-400">{page}</div>
              <button
                disabled={!isRightShown}
                onClick={() => setPage(page + 1)}
                className={`rounded-md px-4 py-2 text-white bg-red-500 ${
                  !isRightShown && "opacity-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </RootLayout>
  );
}
