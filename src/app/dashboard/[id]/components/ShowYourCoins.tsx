import React from "react";
import useUser from "@/hooks/useUser";
import YourCoinList from "./YourCoinList";
import "./style/showYourCoins.css";
import wallet from "@/img/wallet.svg";
import walletClosed from "@/img/wallet-closed.svg";
import Image from "next/image";

const ShowYourCoins = (props: any) => {
  const { user } = useUser();

  return (
    <>
      <div className="aboveAllStuff">
        <div className={"walletIcon"}>
          <Image
            className={props.isView ? "wallet-open" : "wallet"}
            src={props.isView ? wallet : walletClosed}
            width={128}
            height={128}
            onClick={props.viewYourCryptohandler}
            alt="wallet"
          />
        </div>
        {props.isView && (
          <div className="allStuff-wrapper">
            <h1>YOUR CRYPTO</h1>

            <div className="allStuff2-wrapper">
              {user?.yourCoins.length === 0 && <p>You have 0 crypto</p>}
              {user?.yourCoins.map((crypto) => {
                return (
                  <YourCoinList
                    key={crypto.id}
                    image={crypto.image}
                    symbol={crypto.symbol}
                    value={crypto.value}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowYourCoins;
