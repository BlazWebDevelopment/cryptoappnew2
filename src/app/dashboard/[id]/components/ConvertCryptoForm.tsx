import React from "react";

import "./style/convertCrypto.css";

function ConvertCryptoForm(props: any) {
  return (
    <>
      {props.error && <p className="errorText">Please insert a valid value!</p>}
      <div className="converter-container">
        <div className="input-group crypto-input">
          <input
            type="number"
            id="cryptoAmount"
            placeholder="0.0000"
            step="0.0001"
            min="0"
            className="input-field"
            onChange={props.coinValueHandler}
          />
          <select
            id="cryptoType"
            className="select-field"
            value={props.selectedCoin || "default"}
            onChange={props.selectHandler}
          >
            <option value="default" disabled>
              From
            </option>
            {props.user?.yourCoins.map(
              (coin: { symbol: string; id: string }) => (
                <option key={coin.id} value={coin.symbol.toUpperCase()}>
                  {coin.symbol.toUpperCase()}
                </option>
              )
            )}
          </select>
        </div>
        <div className="conversion-icon">&#8595;</div>
        <div className="input-group fiat-input">
          <p id="fiatAmount" placeholder="0.00" className="input-field">
            {props.toCoinConverter || "0.00"}
          </p>
          <select
            id="fiatType"
            className="select-field"
            value={props.toCoin || "default"}
            onChange={props.toCoinHandler}
          >
            <option value="default" disabled>
              To
            </option>
            {props.data.map((coin: { symbol: string; name: string }) => {
              return (
                <option key={coin.name}>{coin.symbol.toUpperCase()}</option>
              );
            })}
          </select>
        </div>
      </div>
      {props.valid && props.selected && props.toCoinSelected && (
        <button
          id="convertBtn"
          className="convert-btn"
          onClick={props.updateCrypto}
        >
          Convert
        </button>
      )}

      <button className="close-btn" onClick={props.closeHandler}>
        Close
      </button>

      <div id="result" className="conversion-result"></div>
    </>
  );
}

export default ConvertCryptoForm;
