"use client";
import React from "react";
import { useContext, useState } from "react";
import Exchanges from "@/components/Exchanges";
import "../../../components/exchange.css";
import "../../../components/trendingcrypto.css";
import useCoins from "@/hooks/useCoins";
import Sidebar from "@/components/Sidebar";
import InvFriendsPopup from "@/components/popups/InvFriendsPopup";
import usePopup from "@/hooks/usePopup";
import { useSession } from "next-auth/react";
import { ConfirmContext } from "@/app/context/ConfirmationContext";
import ShowYourCoins from "./components/ShowYourCoins";
import ShowCoinList from "./components/ShowCoinList";
import useUser from "@/hooks/useUser";
import "./components/style/pageStyle.css";
import ConvertCrypto from "./components/ConvertCrypto";

interface Exchange {
  id: string;
  image: string;
}

function Page({ params }: { params: any }) {
  const { data } = useCoins();

  const { trigger, openPopup, closePopup } = usePopup();
  const { data: session } = useSession();
  const { user } = useUser();
  const { isView, setIsView } = useContext(ConfirmContext);
  const [isConvert, setIsConvert] = useState(false);

  const viewYourCryptohandler = () => {
    setIsView(!isView);
  };

  const closeHandler = () => {
    setIsConvert(!isConvert);
  };

  const transactionsLength = user?.transactions.length;
  return (
    <>
      {session && (
        <div>
          <div className="flex  pt-[5rem] justify-center">
            <h1 className="font-bold text-5xl">{params.id}</h1>
          </div>
          <div className="flex justify-center text-2xl pt-[4rem]">
            <h2>Your crypto</h2>
          </div>
          <div>
            <div className="icons-wrap">
              {data.map((exchange: Exchange) => {
                return <Exchanges key={exchange.id} image={exchange.image} />;
              })}
            </div>
          </div>

          {trigger && <InvFriendsPopup closePopup={closePopup} />}
          <div>
            <div className="container">
              <Sidebar popup={openPopup} />
              <div className="container2">
                <div>
                  <h1>Convert Crypto</h1>
                  <p>You can change anything you want</p>
                  {transactionsLength && transactionsLength > 0 && (
                    <button onClick={closeHandler} className="convertButton">
                      CONVERT CRYPTO
                    </button>
                  )}

                  {isConvert ? (
                    <ConvertCrypto closeHandler={closeHandler} />
                  ) : null}
                </div>
                <div className="cont3">
                  {transactionsLength === 0 ? (
                    <h1>You do not have crypto</h1>
                  ) : (
                    <>
                      <div className="left-content">
                        <ShowCoinList />
                      </div>

                      <div className="right-content">
                        <ShowYourCoins
                          isView={isView}
                          viewYourCryptohandler={viewYourCryptohandler}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
