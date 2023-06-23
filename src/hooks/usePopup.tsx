import React from "react";
import { useState } from "react";

interface IUseCoins {
  trigger: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

function usePopup() {
  const [trigger, setTrigger] = useState(false);

  const openPopup = () => {
    setTrigger(!trigger);
  };

  const closePopup = () => {
    setTrigger(!trigger);
  };

  return {
    openPopup,
    closePopup,
    trigger,
  };
}

export default usePopup;
