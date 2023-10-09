import Image from "next/image";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
};

const Coin = ({ coin }: { coin: Coin }) => {
  return (
    <div className="flex flex-row bg-white mb-4 p-4 rounded-lg justify-between">
      <div className="identity flex flex-row space-x-4 items-center">
        <div className="rank text-xl text-gray-500">{coin.market_cap_rank}</div>
        <Image src={coin.image} alt={coin.name} width={48} height={48} />
        <div className="flex flex-col">
          <div className="text-gray-600 font-medium text-lg">{coin.name}</div>
          <div className="text-gray-400">{coin.symbol.toUpperCase()}</div>
        </div>
      </div>
      <div className="data flex flex-row items-center space-x-4">
        <div className="text-gray-600">
          ${coin.current_price.toLocaleString()}
        </div>
        <div className="text-gray-600">${coin.market_cap.toLocaleString()}</div>
        <div className={`text-gray-600`}>
          {coin.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export const CoinList = ({ coins }: { coins: Coin[] }) => {
  return coins.map((coin) => <Coin coin={coin} key={coin.symbol} />);
};
