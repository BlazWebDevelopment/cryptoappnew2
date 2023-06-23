import React from "react";
import TrendingCrypto from "../TrendingCrypto";

interface Crypto {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  key: string;
  props?: any;
}

function GainersSorted(props: any) {
  return (
    <>
      {props.gainers.map((crypto: Crypto) => {
        return (
          <TrendingCrypto
            key={crypto.id}
            image={crypto.image}
            id={crypto.id}
            name={crypto.name}
            symbol={crypto.symbol}
            current_price={crypto.current_price}
            price_change_percentage_24h={crypto.price_change_percentage_24h}
            market_cap={crypto.market_cap}
            total_volume={crypto.total_volume}
            circulating_supply={crypto.circulating_supply}
          />
        );
      })}
    </>
  );
}

export default GainersSorted;
