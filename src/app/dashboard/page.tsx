"use client";
import React from "react";
import { useState, useContext } from "react";
import Exchanges from "@/components/Exchanges";
import "../../components/exchange.css";
import "../../components/trendingcrypto.css";
import useCoins from "@/hooks/useCoins";
import Sidebar from "@/components/Sidebar";
import arrowDown from "../../img/arrow-low-sorted.png";
import arrowUp from "../../img/arrow-sorted.png";
import Image from "next/image";
import UpperTable from "@/components/UpperTable";
import NameSortedCoins from "@/components/SortedCoins/NameSortedCoins";
import NotSortedCoins from "@/components/SortedCoins/NotSortedCoins";
import PriceSortedCoins from "@/components/SortedCoins/PriceSortedCoins";
import GainersSorted from "@/components/SortedCoins/GainersShow";
import LosersSorted from "@/components/SortedCoins/LosersSorted";
import InvFriendsPopup from "@/components/popups/InvFriendsPopup";
import usePopup from "@/hooks/usePopup";
import Search from "@/components/Search";
import { useSession, signIn } from "next-auth/react";
import Spinner from "./components/Spinner";
import RightSidebar from "./components/RightSidebar";
import Pagination from "./components/Pagination";
import ConfirmPopup from "@/components/popups/ConfirmPopup";
import { ConfirmContext } from "../context/ConfirmationContext";
import useUser from "@/hooks/useUser";
import ShowYourCoins from "./[id]/components/ShowYourCoins";

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

function Page() {
  const {
    data,
    priceSortingHandler,
    isPriceSorted,
    priceSorted,
    nameSorted,
    isNameSorted,
    nameSortingHandler,
    isGainerSorter,
    gainers,
    gainersHandler,
    losersHandler,
    isLosersSorter,
    losers,
    isReversePriceSorted,
    allDataHandler,
    setSearchInput,
    searchInput,
    searchedData,
  } = useCoins();

  const { trigger, openPopup, closePopup } = usePopup();
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { user } = useUser();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = data.slice(firstPostIndex, lastPostIndex);
  const { confirm, closeConfirm, cryptoBuy, isView, setIsView } =
    useContext(ConfirmContext);

  const viewYourCryptohandler = () => {
    setIsView(!isView);
  };

  return (
    <>
      {session && (
        <div>
          <div className="flex  pt-[5rem] justify-center">
            <h1 className="font-bold text-5xl">D A S H B O A R D</h1>
          </div>
          <div className="flex justify-center text-2xl pt-[4rem]">
            <h2>Crypto exchange</h2>
          </div>
          <div>
            <div className="icons-wrap">
              {data.map((exchange: Exchange) => {
                return <Exchanges key={exchange.id} image={exchange.image} />;
              })}
            </div>
          </div>
          {confirm && (
            <ConfirmPopup closeConfirm={closeConfirm} data={cryptoBuy} />
          )}
          {trigger && <InvFriendsPopup closePopup={closePopup} />}
          <div>
            <UpperTable
              gainersHandler={gainersHandler}
              losersHandler={losersHandler}
              allDataHandler={allDataHandler}
            />
            <Search searchInput={searchInput} setSearchInput={setSearchInput} />
            <div className="container">
              <Sidebar popup={openPopup} />
              <div className="container2">
                <table className="table">
                  <thead className="table-head">
                    <tr className="inside-th">
                      <th onClick={nameSortingHandler} className="cryptoname">
                        <span>Name</span>
                      </th>
                      <th onClick={priceSortingHandler} className="priceCon">
                        <span className="pricesort">Price</span>
                        {isReversePriceSorted && (
                          <Image
                            src={isPriceSorted ? arrowDown : arrowUp}
                            width={128}
                            height={128}
                            alt="arrow"
                            className="arrowImg"
                          />
                        )}
                      </th>
                      <th>
                        <span>Change (24h)</span>
                      </th>
                      <th>
                        <span>Market Cap</span>
                      </th>
                      <th>
                        <span>Total Volume</span>
                      </th>
                      <th>
                        <span>Circulating Supply</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="tableBody">
                    {searchInput && <NotSortedCoins data={searchedData} />}
                    {!isPriceSorted &&
                      !searchInput &&
                      !isReversePriceSorted &&
                      !isNameSorted &&
                      !isGainerSorter &&
                      !isLosersSorter && <NotSortedCoins data={currentPost} />}

                    {isPriceSorted && !searchInput && (
                      <PriceSortedCoins priceSorted={priceSorted} />
                    )}
                    {isReversePriceSorted && !searchInput && (
                      <PriceSortedCoins priceSorted={priceSorted} />
                    )}

                    {isNameSorted && !searchInput && (
                      <NameSortedCoins nameSorted={nameSorted} />
                    )}

                    {isLosersSorter && !searchInput && (
                      <LosersSorted losers={losers} />
                    )}

                    {isGainerSorter && !searchInput && (
                      <GainersSorted gainers={gainers} />
                    )}
                  </tbody>
                </table>
                <Pagination
                  totalPosts={data.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
              <RightSidebar />
              {user && user?.yourCoins.length > 0 && (
                <ShowYourCoins
                  viewYourCryptohandler={viewYourCryptohandler}
                  isView={isView}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {!session && (
        <div className="errorPage">
          <div className="errorPageCont">
            <h2>You have to be logged in to see your Crypto</h2>
            <div className="errorSpinner">
              <Spinner />
            </div>
            <div className="continueLog">
              <button onClick={() => signIn()}>Continue →</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
