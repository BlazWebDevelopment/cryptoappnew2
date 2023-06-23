import React, { useState, useContext, useEffect } from "react";
import "@/components/popups/confirmPopup.css";
import { ConfirmContext } from "@/app/context/ConfirmationContext";
import useUser from "@/hooks/useUser";
import BuyPopup from "./components/BuyPopup";
import SellPopup from "./components/SellPopup";
import { v4 as uuidv4 } from "uuid";

interface Crypto {
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
}

interface ConfirmPopupProps {
  data: any;
  sum?: number;
  closeConfirm: () => void;
}

function ConfirmPopup(props: ConfirmPopupProps): JSX.Element {
  const coin = props.data;

  const { user, updateTransaction } = useUser();
  const {
    investmentDollars,
    calculated,
    setCalculated,
    cryptoBuy,
    soldCrypto,
    setSoldCrypto,
    sellCalculated,
    setInvestmentDollars,
    setSellCalculated,
  } = useContext(ConfirmContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isBuy, setIsBuy] = useState<boolean>(true);
  const [isSell, setIsSell] = useState<boolean>(false);

  useEffect(() => {
    setCalculated(investmentDollars / coin.current_price);
    setSellCalculated(soldCrypto * coin.current_price);
  }, [
    investmentDollars,
    coin.current_price,
    setCalculated,
    setSellCalculated,
    soldCrypto,
  ]);

  const sellHandler = (): void => {
    setIsBuy(false);
    setIsSell(true);
    setError(false);
  };

  const buyHandler = (): void => {
    setIsBuy(true);
    setIsSell(false);
    setError(false);
  };

  const SellCrypto = user?.yourCoins.filter(
    (cryptoCoin) => cryptoCoin.coin_name === coin.name
  );

  const getValieOfCoins = SellCrypto?.filter((coinValue) => {
    if (coinValue.value) return coinValue.value;
    else return;
  });
  const combineValueOfCoins = getValieOfCoins?.map((coins) => coins.value);
  const sum = combineValueOfCoins?.reduce((acc, curr) => acc + curr, 0);

  const sumValue = sum || 0;

  const updateUser = (): void => {
    if (!user) return;

    if (isBuy) {
      if (investmentDollars === 0 || investmentDollars <= 0) {
        setError(true);
        return;
      }

      if (investmentDollars > user?.balance) {
        setError(true);
        return;
      }

      if (investmentDollars > 0) {
        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
          setInvestmentDollars(0);
          setError(false);
        }, 1500);

        const newBalance = user?.balance - investmentDollars;

        const newSum = sumValue + calculated;
        const date = new Date();

        updateTransaction(
          [
            {
              ...cryptoBuy,
              id: uuidv4(),
              time: date,
              paid: investmentDollars,
              bought: calculated,
              type: "buy",
            },
          ],
          newBalance,
          [
            {
              id: uuidv4(),
              coin_name: coin.name,
              symbol: coin.symbol,
              value: newSum,
              image: coin.image,
            },
          ]
        );
      }
    }

    if (isSell) {
      if (soldCrypto > sumValue || +soldCrypto === 0) {
        setError(true);
        return;
      }

      if (soldCrypto < sumValue) {
        setError(false);
      }

      if (soldCrypto > 0) {
        setIsLoading(true);
      }

      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1500);

      const newBalance = user?.balance + sellCalculated;

      const newSum = sumValue - soldCrypto;
      updateTransaction(
        [
          {
            ...cryptoBuy,
            id: uuidv4(),
            time: new Date(),
            sold: soldCrypto,
            got: sellCalculated,
            type: "sell",
          },
        ],
        newBalance,
        [
          {
            id: uuidv4(),
            coin_name: coin.name,
            symbol: coin.symbol,
            value: newSum,
            image: coin.image,
          },
        ]
      );
    }
  };

  return (
    <div className="bg-clr">
      <div className="wrapper-popup">
        <div className="inside-wrapper">
          <h2>
            <button className={isBuy ? "buy-active" : ""} onClick={buyHandler}>
              BUY
            </button>

            <span> | </span>
            <button
              className={isSell ? "sell-active" : ""}
              onClick={sellHandler}
            >
              SELL
            </button>
          </h2>
          {error && <p className="errorText">Please insert a valid value!</p>}
          {!isLoading && !isSuccess && isBuy && (
            <BuyPopup
              coin={coin}
              calculated={calculated}
              updateUser={updateUser}
              closeConfirm={props.closeConfirm}
              user={user}
            />
          )}
          {!isLoading && !isSuccess && isSell && (
            <SellPopup
              coin={coin}
              sellCalculated={sellCalculated}
              updateUser={updateUser}
              closeConfirm={props.closeConfirm}
              setInvestmentDollars={soldCrypto}
              user={user}
              yourCoin={sum}
              setSoldCrypto={setSoldCrypto}
              soldCrypto={soldCrypto}
            />
          )}
          {isLoading && !isSuccess && <div className="spinner2"></div>}
          {isSuccess && (
            <>
              <div className="successfull">
                {isBuy ? (
                  <p>Successfully purchased!</p>
                ) : (
                  <p>Successfully sold!</p>
                )}
              </div>
              <div className="buttons-popup">
                <button className="cancel-btn" onClick={props.closeConfirm}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;
