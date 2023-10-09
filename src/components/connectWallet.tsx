import { AccountContext } from "@/context/context";
import { useContext } from "react";

export const Connectwallet = () => {
  const { account, connect, logout } = useContext(AccountContext);
  const shortenedAccountName = account
    ? `${account.slice(0, 5)}...${account.slice(-5)}`
    : "";

  return (
    <>
      <div className="header">
        {!account ? (
          <div className="accountInfo">
            <button onClick={connect} className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              Connect wallet
            </button>
          </div>
        ) : (
          <div onClick={logout} className="btn accountInfo bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>

            {shortenedAccountName}
          </div>
        )}
      </div>
    </>
  );
};
