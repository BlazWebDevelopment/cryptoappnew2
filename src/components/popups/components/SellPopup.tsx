import React, { useState, useContext } from "react";
import "@/components/popups/confirmPopup.css";
import dollar from "@/img/dollar.svg";
import Image from "next/image";

function SellPopup(props: any) {
  return (
    <>
      <p>
        You have {props.yourCoin} {props.coin.name}
      </p>
      <fieldset>
        <legend>You sell</legend>
        <div>
          <div className="first-column">
            <div className="left-side-first-column">
              <h4>{props.coin.symbol.toUpperCase()}</h4>
              <p>{props.coin.name.toUpperCase()}</p>
            </div>
            <div className="img-col">
              <Image
                src={props.coin.image}
                alt={props.coin.name}
                width={128}
                height={128}
              />
              <input
                placeholder={"value"}
                type="number"
                onChange={(e) => props.setSoldCrypto(e.target.value)}
                value={props.soldCrypto > 0 ? props.soldCrypto : "Value"}
              ></input>
              <button onClick={() => props.setSoldCrypto(props.yourCoin)}>
                MAX
              </button>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>You get</legend>
        <div>
          <div className="first-column">
            <div className="left-side-first-column">
              <h4>USD</h4>
              <p>US DOLLARS</p>
            </div>
            <div className="img-col">
              <Image src={dollar} alt="coin" width={128} height={128} />

              <p>{props.sellCalculated.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </fieldset>

      <div className="buttons-popup">
        <button className="cancel-btn" onClick={props.closeConfirm}>
          Close
        </button>
        <button className="confirm-btn" onClick={props.updateUser}>
          Sell crypto
        </button>
      </div>
    </>
  );
}

export default SellPopup;
