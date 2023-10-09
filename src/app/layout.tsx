"use client";
process.env.__NEXT_PRIVATE_PREBUNDLED_REACT = "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { AccountContext } from "../context/context";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [account, setAccount] = useState<string>("");
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
        },
      },
    });
    return web3Modal;
  }

  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
      localStorage.setItem("address", accounts[0]);
    } catch (err) {
      console.log("error:", err);
    }
  }

  const logout = () => {
    localStorage.removeItem("address");
    setAccount("");
  };

  useEffect(() => {
    const address = localStorage.getItem("address");
    if (address) {
      setAccount(address);
    }
  }, []);

  return (
    <>
      <AccountContext.Provider value={{ account, connect, logout }}>
        <header className="w-full bg-darkgrey flex flex-row">
          <div className="w-full toolbar flex flex-row justify-start">
            <div className="image-wrap p-4">
              <Image
                alt="Validation Cloud logo"
                loading="lazy"
                width="268"
                height="30"
                decoding="async"
                data-nimg="1"
                className="hidden md:block"
                src="https://www.validationcloud.io/_next/static/media/vc-logo-white.507698cc.svg"
              />
            </div>
            <div className="nav flex flex-row text-white justify-end p-4 pr-0">
              <Link href="/">
                <div className="font-semibold mr-12 hover:cursor-pointer opacity-90 hover:opacity-100">
                  Home
                </div>
              </Link>
              <Link href="/deposit">
                <div className="font-semibold hover:cursor-pointer opacity-90 hover:opacity-100">
                  Deposits
                </div>
              </Link>
            </div>
          </div>
        </header>
        <div className={inter.className}>
          <div className="flex flex-col items-center content-center py-12 px-16">
            {children}
          </div>
        </div>
      </AccountContext.Provider>
    </>
  );
}
