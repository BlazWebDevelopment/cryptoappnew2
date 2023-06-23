import React, { useContext } from "react";
import "./trendingcrypto.css";
import { ConfirmContext } from "@/app/context/ConfirmationContext";
import Image from "next/image";

type CryptoType = {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
};

function TrendingCrypto({
  id,
  image,
  name,
  symbol,
  current_price,
  price_change_percentage_24h,
  market_cap,
  total_volume,
  circulating_supply,
}: CryptoType) {
  const { openConfirm, setCryptoBuy } = useContext(ConfirmContext);

  const handleUpdateUser = async () => {
    openConfirm();

    const sentCoin: CryptoType = {
      id,
      image,
      name,
      symbol,
      current_price,
      price_change_percentage_24h,
      market_cap,
      total_volume,
      circulating_supply,
    };

    setCryptoBuy(sentCoin);
  };

  return (
    <tr className="coin-line">
      <td>
        <div className="icon-name-con">
          <Image src={image} alt="cryptoicon" height={32} width={32} />
          <div>
            <h3>{name}</h3>
            <p>{symbol}</p>
          </div>
        </div>
      </td>
      <td>
        <div>
          <span>${current_price}</span>
        </div>
      </td>
      <td>
        <div>
          <span
            className={
              price_change_percentage_24h > 0
                ? "positive-percantage"
                : "negative-percantage"
            }
          >
            {price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      </td>
      <td>
        <div>
          <span>{(market_cap / 1000000000).toFixed(2)}B</span>
        </div>
      </td>
      <td>
        <div>
          <span>{(total_volume / 1000000000).toFixed(2)}B</span>
        </div>
      </td>
      <td>
        <div>
          <span>{circulating_supply}M</span>
        </div>
      </td>
      <td>
        <ul key={id}>
          <li className="buy-sell-btn">
            <button onClick={handleUpdateUser}>Buy / Sell</button>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default TrendingCrypto;
