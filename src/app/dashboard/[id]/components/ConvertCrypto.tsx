import React, { useState } from "react";
import useCoins from "@/hooks/useCoins";
import useUser from "@/hooks/useUser";
import "./style/convertCrypto.css";
import ConvertCryptoForm from "./ConvertCryptoForm";
import { v4 as uuidv4 } from "uuid";

function ConvertCrypto(props: any) {
  const { data } = useCoins();
  const { user, convertCpypto } = useUser();
  const [selectedCoin, setSelectedCoin] = useState("");
  const [coinValue, setCoinValue] = useState(0);
  const [toCoin, setToCoin] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [valid, setValid] = useState(false);
  const [selected, setSelected] = useState(false);
  const [toCoinSelected, isToCoinSelected] = useState(false);

  const coinValueHandler = (e: any) => {
    setCoinValue(e.target.value);
    setValid(true);
  };

  const toCoinHandler = (e: any) => {
    setToCoin(e.target.value);
    isToCoinSelected(true);
  };

  const selectHandler = (e: any) => {
    setSelectedCoin(e.target.value);
    setSelected(true);
  };

  const filteredYourCoin = user?.yourCoins.filter(
    (crypto) => crypto.symbol.toUpperCase() === selectedCoin
  );

  const filteredYourToCoin = user?.yourCoins.filter(
    (crypto) => crypto.symbol.toUpperCase() === toCoin
  );

  const filteredTransactionCoin = data.find(
    (coin) => coin.symbol.toUpperCase() === selectedCoin
  );
  const filteredToTransactionCoin = data.find(
    (coin) => coin.symbol.toUpperCase() === toCoin
  );
  const convertToDollars = filteredTransactionCoin
    ? coinValue * +filteredTransactionCoin?.current_price
    : 0;

  const toCoinConverter = filteredToTransactionCoin
    ? convertToDollars / +filteredToTransactionCoin?.current_price
    : 0;

  const updateCrypto = () => {
    if (!user) return;

    if (
      coinValue > 0 &&
      filteredYourCoin &&
      coinValue <= filteredYourCoin[0].value
    ) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1500);
    }

    if (
      coinValue <= 0 ||
      (filteredYourCoin && coinValue > filteredYourCoin[0].value)
    ) {
      setError(true);
      return;
    }

    if (filteredYourToCoin && filteredYourToCoin[0] === undefined) {
      const newValue =
        filteredYourCoin && filteredYourCoin[0].value - coinValue;
      convertCpypto([
        {
          id: uuidv4(),
          coin_name: filteredToTransactionCoin?.name,
          symbol: filteredToTransactionCoin?.symbol,
          value: toCoinConverter,
          image: filteredToTransactionCoin?.image,
        },
        filteredYourCoin && {
          id: filteredYourCoin[0]?.id,
          coin_name: filteredYourCoin[0]?.coin_name,
          symbol: filteredYourCoin[0]?.symbol,
          value: newValue,
          image: filteredYourCoin[0]?.image,
        },
      ]);
    } else {
      const newValue =
        filteredYourToCoin && filteredYourToCoin[0].value + toCoinConverter;
      const removeValue =
        filteredYourCoin && filteredYourCoin[0].value - coinValue;

      convertCpypto([
        {
          id: filteredToTransactionCoin?.id,
          coin_name: filteredToTransactionCoin?.name,
          symbol: filteredToTransactionCoin?.symbol,
          value: newValue,
          image: filteredToTransactionCoin?.image,
        },
        filteredYourCoin && {
          id: filteredYourCoin[0]?.id,
          coin_name: filteredYourCoin[0]?.coin_name,
          symbol: filteredYourCoin[0]?.symbol,
          value: removeValue,
          image: filteredYourCoin[0]?.image,
        },
      ]);
    }
  };

  return (
    <div className="background">
      <div className="coverter-wrapper">
        <h1 className="title">Crypto Converter</h1>
        {selectedCoin && !isLoading && !isSuccess && (
          <p className="ofCoin">
            You have {filteredYourCoin && filteredYourCoin[0].value} of{" "}
            {filteredYourCoin && filteredYourCoin[0].coin_name}
          </p>
        )}
        {!isLoading && !isSuccess && (
          <ConvertCryptoForm
            selectedCoin={selectedCoin}
            filteredCoinValue={filteredYourCoin}
            filteredCoinName={filteredYourCoin}
            error={error}
            coinValueHandler={coinValueHandler}
            selectHandler={selectHandler}
            user={user}
            toCoinConverter={toCoinConverter}
            toCoin={toCoin}
            toCoinHandler={toCoinHandler}
            data={data}
            updateCrypto={updateCrypto}
            closeHandler={props.closeHandler}
            valid={valid}
            selected={selected}
            toCoinSelected={toCoinSelected}
          />
        )}
        {isLoading && !isSuccess && <div className="spinner2"></div>}
        {isSuccess && (
          <>
            <div className="successfully">
              <div>
                <p className="succesfullText">Successfully converted!</p>
                <div className="conversion-details">
                  <span className="numbers">
                    {coinValue} ({selectedCoin})
                  </span>
                  <br />
                  <span className="arrow">&#8595;</span>
                  <br />
                  <span className="numbers">
                    {toCoinConverter} ({toCoin})
                  </span>
                </div>
                <button className="close-btn" onClick={props.closeHandler}>
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ConvertCrypto;
