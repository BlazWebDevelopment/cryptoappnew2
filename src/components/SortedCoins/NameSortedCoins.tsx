import React from "react";
import useCoins from "@/hooks/useCoins";
import TrendingCrypto from "../TrendingCrypto";

interface Exchange {
  id: string;
  image: string;
}

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
}

function NameSortedCoins(props: any) {
  return (
    <>
      {props.nameSorted.map((crypto: Crypto) => {
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

export default NameSortedCoins;
