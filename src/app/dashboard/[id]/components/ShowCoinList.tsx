import React, { useState } from "react";
import useUser from "@/hooks/useUser";
import LatestTransaction from "./LatestTransactions";
import Pagination from "../../components/Pagination";
import "./style/latestTransaction.css";

interface Crypto {
  image: string;
  id: string;
  name: string;
  symbol: string;
  current_price: string;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  bought: number;
  paid: number;
  sold: number;
  time: string;
  got: number;
  type: string;
}

const ShowCoinList = () => {
  const { user } = useUser();
  const [isSold, setIsSold] = useState(false);
  const [isBought, setIsBought] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [whatIsChosen, setWhatIsChosen] = useState("");

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = user?.transactions.slice(firstPostIndex, lastPostIndex);

  const boughtHandler = () => {
    setIsBought(true);
    setIsSold(false);
    setWhatIsChosen("BOUGHT");
  };
  const soldHandler = () => {
    setIsSold(true);
    setIsBought(false);
    setWhatIsChosen("SOLD");
  };
  const resetHandler = () => {
    setIsSold(false);
    setIsBought(false);
    setWhatIsChosen("");
  };

  const soldTransactions = user?.transactions.filter(
    (transaction) => transaction.type === "sell"
  );
  const buyTransactions = user?.transactions.filter(
    (transaction) => transaction.type === "buy"
  );

  const length = user?.transactions.length;
  return (
    <>
      <div>
        <p>Latest transactions</p>
        <button onClick={boughtHandler} className="bsr-btn">
          BOUGHT
        </button>
        {soldTransactions && soldTransactions?.length > 0 && (
          <button onClick={soldHandler} className="bsr-btn">
            SOLD
          </button>
        )}
        {isBought || isSold ? (
          <button onClick={resetHandler} className="bsr-btn">
            RESET
          </button>
        ) : null}
        <span> {whatIsChosen && whatIsChosen + " Transactions"} </span>
        <div className="card-wrapper">
          {isBought &&
            buyTransactions?.map((crypto: Crypto) => {
              return (
                <LatestTransaction
                  key={crypto.id}
                  id={crypto.id}
                  bought={crypto.bought}
                  name={crypto.name}
                  image={crypto.image}
                  symbol={crypto.symbol}
                  current_price={+crypto.current_price}
                  price_change_percentage_24h={
                    crypto.price_change_percentage_24h
                  }
                  market_cap={crypto.market_cap}
                  total_volume={crypto.total_volume}
                  circulating_supply={crypto.circulating_supply}
                  paid={crypto.paid}
                  sold={crypto.sold}
                  time={crypto.time}
                  got={crypto.got}
                />
              );
            })}
          {isSold &&
            soldTransactions?.map((crypto: Crypto) => {
              return (
                <LatestTransaction
                  key={crypto.id}
                  id={crypto.id}
                  bought={crypto.bought}
                  name={crypto.name}
                  image={crypto.image}
                  symbol={crypto.symbol}
                  current_price={+crypto.current_price}
                  price_change_percentage_24h={
                    crypto.price_change_percentage_24h
                  }
                  market_cap={crypto.market_cap}
                  total_volume={crypto.total_volume}
                  circulating_supply={crypto.circulating_supply}
                  paid={crypto.paid}
                  sold={crypto.sold}
                  time={crypto.time}
                  got={crypto.got}
                />
              );
            })}
          {!isSold &&
            !isBought &&
            currentPost?.map((crypto: Crypto) => {
              return (
                <LatestTransaction
                  key={crypto.id}
                  id={crypto.id}
                  bought={crypto.bought}
                  name={crypto.name}
                  image={crypto.image}
                  symbol={crypto.symbol}
                  current_price={+crypto.current_price}
                  price_change_percentage_24h={
                    crypto.price_change_percentage_24h
                  }
                  market_cap={crypto.market_cap}
                  total_volume={crypto.total_volume}
                  circulating_supply={crypto.circulating_supply}
                  paid={crypto.paid}
                  sold={crypto.sold}
                  time={crypto.time}
                  got={crypto.got}
                />
              );
            })}
        </div>
        {length && (
          <Pagination
            totalPosts={length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
};

export default ShowCoinList;
