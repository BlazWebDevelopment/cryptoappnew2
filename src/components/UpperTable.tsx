import React from "react";
import Image from "next/image";
import useCoins from "@/hooks/useCoins";
import world from "../img/world.svg";
import graphDown from "../img/graphDown.svg";
import graphUp from "../img/graphUp.svg";
import "./upperTable.css";

function UpperTable(props: any) {
  const { data } = useCoins();
  return (
    <div className="upperTable">
      <div className="aboveSmalls">
        <h1>Crypto prices</h1>
        <p>{data.length} assets</p>
      </div>

      <div className="closeUpperTable">
        <div className="upperCont" onClick={props.allDataHandler}>
          <Image
            src={world}
            width={32}
            height={32}
            alt="world"
            className="world"
          />
          <h4>All assets</h4>
        </div>
        <div className="upperCont" onClick={props.gainersHandler}>
          <Image
            src={graphUp}
            width={32}
            height={32}
            alt="graphUp"
            className="graphUp"
          />
          <h4>Gainers</h4>
        </div>
        <div className="upperCont" onClick={props.losersHandler}>
          <Image
            src={graphDown}
            width={32}
            height={32}
            alt="graohDown"
            className="graohDown"
          />
          <h4>Losers</h4>
        </div>
      </div>
    </div>
  );
}

export default UpperTable;
