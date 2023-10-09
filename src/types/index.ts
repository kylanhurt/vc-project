import { BigNumber } from "ethers";

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
};

export type LogData = {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: false;
};

export type Transaction = {
  accessList: any[];
  blockHash: string;
  blockNumber: BigNumber;
  chainId: BigNumber;
  data: string;
  from: string;
  gas: BigNumber;
  gasPrice: BigNumber;
  hash: string;
  input: string;
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
  nonce: BigNumber;
  r: string;
  s: string;
  to: string;
  transactionIndex: BigNumber;
  type: BigNumber;
  v: BigNumber;
  value: BigNumber;
};
