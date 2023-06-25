import React from "react";
import "./style/showYourCoins.css";
import Image from "next/image";
import useCoins from "@/hooks/useCoins";
import useUser from "@/hooks/useUser";

interface CryptoType {
  image: string;
  symbol: string;
  value: number;
}

function YourCoinList({ image, symbol, value }: CryptoType, props: any) {
  const { data } = useCoins();

  const cryptoPrice = data.find((transaction) => transaction.symbol === symbol);
  const inDollars = cryptoPrice && value * cryptoPrice?.current_price;

  return (
    <div className="scrollable-list">
      <div className="youCoin-wrapper">
        <div className="yourCoin-wrapper">
          <div className="nameSim-wrapper">
            <Image src={image} width={128} height={128} alt="cryptoicon" />
            <p className="pElement">{symbol.toUpperCase()}</p>
          </div>
          <span className="equal">=</span>
          <div className="valueEl">
            <p className="pElement"> {value}</p>
            <p>= ${inDollars ? inDollars.toLocaleString() : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourCoinList;
