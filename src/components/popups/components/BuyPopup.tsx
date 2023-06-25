import React, { useState, useContext } from "react";
import "@/components/popups/confirmPopup.css";
import dollar from "@/img/dollar.svg";
import Image from "next/image";
import { ConfirmContext } from "@/app/context/ConfirmationContext";
import useUser from "@/hooks/useUser";

function BuyPopup(props: any) {
  const { setInvestmentDollars } = useContext(ConfirmContext);

  return (
    <>
      <p>Your balance: {props.user?.balance.toLocaleString()}</p>
      <fieldset>
        <legend>You invest</legend>
        <div>
          <div className="first-column">
            <div className="left-side-first-column">
              <h4>USD</h4>
              <p>US DOLLARS</p>
            </div>
            <div className="img-col">
              <Image src={dollar} alt="" width={128} height={128} />
              <input
                placeholder="investment"
                type="number"
                onChange={(e) => setInvestmentDollars(+e.target.value)}
              ></input>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>You Get</legend>
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
              <p>{props.calculated.toFixed(8)}</p>
            </div>
          </div>
        </div>
      </fieldset>
      <div className="buttons-popup">
        <button className="cancel-btn" onClick={props.closeConfirm}>
          Close
        </button>
        <button className="confirm-btn" onClick={props.updateUser}>
          Confirm purchase
        </button>
      </div>
    </>
  );
}

export default BuyPopup;
