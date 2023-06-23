import React, { useContext } from "react";
import "./style/latestTransaction.css";
import { ConfirmContext } from "@/app/context/ConfirmationContext";
import Image from "next/image";

interface CryptoType {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  bought: number;
  paid: number;
  got: number;
  sold: number;
  time: string;
}

function LatestTransaction({
  id,
  image,
  name,
  symbol,
  current_price,
  time,
  bought,
  sold,
}: CryptoType) {
  return (
    <div className="transaction-card">
      <div className="transaction-info">
        <div className="crypto-details">
          <Image src={image} width={128} height={128} alt="coin" />
          <div>
            <h3>{name}</h3>
            <p>{symbol}</p>
          </div>
        </div>
        <div className="transaction-details">
          <div className="transaction-item">
            <p>Date</p>
            <p className="transaction-value">
              {time.split("T")[0] + " | " + time.slice(11, 16)}
            </p>
          </div>
          <div className="transaction-item">
            <p>Quantity</p>
            <p className="transaction-value">{bought || sold}</p>
          </div>
          <div className="transaction-item">
            <p>Total</p>
            <p className="transaction-value">
              ${(current_price * bought || current_price * sold).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="transaction-id">
        <p className="id">{id}</p>
      </div>
      <div className="transaction-actions">
        <button className="confirm-button">Confirmed</button>
      </div>
    </div>
  );
}

export default LatestTransaction;
