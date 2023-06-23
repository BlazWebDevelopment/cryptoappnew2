import React from "react";
import Image from "next/image";
import "./exchange.css";

function Exchanges({ image }: any) {
  return (
    <div className="icons">
      <div>
        <ul className="ul-icons">
          <li>
            <Image
              src={image}
              alt=""
              className="icon-img"
              height={32}
              width={32}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Exchanges;
