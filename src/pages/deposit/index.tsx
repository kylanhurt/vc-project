import RootLayout from "@/app/layout";
import { Connectwallet } from "@/components/connectWallet";
import { Transaction } from "@/types";
import { truncateString } from "@/utils";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Web3 from "web3";

let web3;

const ADDRESS_BASE_URL = `https://etherscan.io/address`;

const FAKE_LOG_DATA = [
  {
    address: "0x00000000219ab540356cbb839cbe05303d7705fa",
    topics: [
      "0x649bbc62d0e31342afea4e5cd82d4049e7e1ee912fc0889aa790803be39038c5",
    ],
    data: "0x00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003097362736831a0ff4a1fc8e6c10183e57bceff683265d1e0da73584c4f5abf7d187f6559e066c4a1d2e0c92b25a1249310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200100000000000000000000006ffdf24f6ba7cc735e84489a846f1979a2084b2500000000000000000000000000000000000000000000000000000000000000080040597307000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006095b3edaad28000c360734327a8d33d609de637a5ff4b8db5fcabad2cc130f619e3162e7015ba67c9d14378dce6999af702ab189d99ee9744093f806e8d79f4ba622b7a736862d2f75edf08538f0cfae33cb6706e9305ae343f6681d39336688c0000000000000000000000000000000000000000000000000000000000000008cb180f0000000000000000000000000000000000000000000000000000000000",
    blockNumber: "0x1170afa",
    transactionHash:
      "0x6ae253a56660c12c00be5918cd458d0bd46916ee02490f09ec86d6d0ae03dee5",
    transactionIndex: "0x2f",
    blockHash:
      "0x99233b1588048ad71dba4943ed7cc568e0dd52d7cc3153323983c916198e7e9f",
    logIndex: "0x36",
    removed: false,
  },
  {
    address: "0x00000000219ab540356cbb839cbe05303d7705fa",
    topics: [
      "0x649bbc62d0e31342afea4e5cd82d4049e7e1ee912fc0889aa790803be39038c5",
    ],
    data: "0x00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030b352873e4766b2b929de3bf2e2b79f95b487915b55bb16b109c418b385cc03ade2b7fe985e68443c52800f7dc5d2d28a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200100000000000000000000009f9b54ffb9e7029b8f200b6b3e40a3de51721985000000000000000000000000000000000000000000000000000000000000000800ca9a3b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060974154627ec6d798b2320aa6b6683451c219b6bd0a63c82d51140f55e12f3dfc255b1b4e197df73bc71f2543ad7734630c964eecb89777da6f16806444f8648d9eab764b9b7c180c54fe4558d07ec97ad63e5c3dbe370f7b294de409670981570000000000000000000000000000000000000000000000000000000000000008cb2f0f0000000000000000000000000000000000000000000000000000000000",
    blockNumber: "0x11772b3",
    transactionHash:
      "0x3297827cc25381ced9df8b5af9160677e7a7f2cf306221180bdf3d23b0d2daed",
    transactionIndex: "0x19",
    blockHash:
      "0x516b988ec18449140f1c39e7648cf5d7211c809e45f90568e27532c34f8d887f",
    logIndex: "0x35",
    removed: false,
  },
];

const Deposit = () => {
  const [transactions, setTransactions] = useState([]);

  const initializeWs = async () => {
    web3 = new Web3(
      "wss://mainnet.ethereum.validationcloud.io/v1/wss/_ebE-qbNd8xBRvrunhDTX68q_hrw5ca1ygruHGF0TtM"
    );

    const subscription1 = await web3.eth.subscribe("logs", {
      address: "0x00000000219ab540356cBB839Cbe05303d7705Fa",
    });

    subscription1.on("data", async (data) => {
      const txData = await web3.eth.getTransaction(data.transactionHash);
      setTransactions((prev) => [...prev, txData]);
    });

    subscription1.on("error", (err) => {
      console.warn("error", err);
    });

    const tx1Promise = web3.eth.getTransaction(
      FAKE_LOG_DATA[0].transactionHash
    );
    const tx2Promise = web3.eth.getTransaction(
      FAKE_LOG_DATA[1].transactionHash
    );
    const txs = await Promise.all([tx1Promise, tx2Promise]);
    setTransactions((prev) => [...prev, ...txs]);
  };

  useEffect(() => {
    initializeWs();

    return () => {
      web3.eth.clearSubscriptions();
    };
  }, []);
  return (
    <RootLayout>
      <div className="content min-w-[1280px] flex flex-col">
        <div className="flex w-full flex-row justify-end mb-6 space-x-2">
          <Connectwallet />
        </div>
        <div>
          {transactions.map(({ from, to, value, hash }: Transaction) => {
            const formattedAmount = BigNumber.from(value);
            const formattedEther = formatUnits(formattedAmount, 18);
            return (
              <div
                className="flex flex-row bg-white mb-4 p-4 rounded-lg justify-between shadow hover:bg-gray-50"
                key={hash}
              >
                <div className="text-gray-600 tx-link flex-1 ">
                  Hash:&nbsp;
                  <Link href={`${ADDRESS_BASE_URL}/${hash}`}>
                    {truncateString(hash, 20)}
                  </Link>
                </div>
                <div className="text-gray-600 tx-link flex flex-1 justify-center">
                  <Link href={`${ADDRESS_BASE_URL}/${from}`}>
                    {truncateString(from, 20)}
                  </Link>
                </div>
                <div className="flex flex-1 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
                <div className="text-gray-600 tx-link flex flex-1 justify-center">
                  <Link href={`${ADDRESS_BASE_URL}/${to}`}>
                    {truncateString(to, 20)}
                  </Link>
                </div>
                <div className="text-gray-600 flex flex-row flex-1 justify-end">
                  <Image
                    src="/eth-icon.svg"
                    className="inline"
                    width={20}
                    height={20}
                    alt="ethereum icon"
                  />
                  {formattedEther} Ether
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </RootLayout>
  );
};

export default Deposit;
