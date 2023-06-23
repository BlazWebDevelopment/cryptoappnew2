"use client";
import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CryptoType {
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

interface ConfirmContextData {
  confirm: boolean;
  setConfirm: Dispatch<SetStateAction<boolean>>;
  closeConfirm: () => void;
  openConfirm: () => void;
  cryptoBuy: CryptoType | null;
  setCryptoBuy: Dispatch<SetStateAction<CryptoType | null>>;
  investmentDollars: number;
  setInvestmentDollars: Dispatch<SetStateAction<number>>;
  calculated: number;
  setCalculated: Dispatch<SetStateAction<number>>;
  soldCrypto: number;
  setSoldCrypto: Dispatch<SetStateAction<number>>;
  sellCalculated: number;
  setSellCalculated: Dispatch<SetStateAction<number>>;
  isView: boolean;
  setIsView: Dispatch<SetStateAction<boolean>>;
}

export const ConfirmContext = createContext<ConfirmContextData>({
  confirm: false,
  setConfirm: () => {},
  closeConfirm: () => {},
  openConfirm: () => {},
  cryptoBuy: null,
  setCryptoBuy: () => {},
  investmentDollars: 0,
  setInvestmentDollars: () => {},
  calculated: 0,
  setCalculated: () => {},
  soldCrypto: 0,
  setSoldCrypto: () => {},
  sellCalculated: 0,
  setSellCalculated: () => {},
  isView: false,
  setIsView: () => {},
});

interface ConfirmationProviderProps {
  children: ReactNode;
}

export function ConfirmationProvider({ children }: ConfirmationProviderProps) {
  const [confirm, setConfirm] = useState(false);
  const [cryptoBuy, setCryptoBuy] = useState<CryptoType | null>(null);
  const [investmentDollars, setInvestmentDollars] = useState(0);
  const [calculated, setCalculated] = useState(0);
  const [soldCrypto, setSoldCrypto] = useState(0);
  const [sellCalculated, setSellCalculated] = useState(0);
  const [isView, setIsView] = useState(false);

  const closeConfirm = () => {
    setConfirm(false);
  };

  const openConfirm = () => {
    setConfirm(true);
  };

  return (
    <ConfirmContext.Provider
      value={{
        confirm,
        setConfirm,
        closeConfirm,
        openConfirm,
        cryptoBuy,
        setCryptoBuy,
        investmentDollars,
        setInvestmentDollars,
        calculated,
        setCalculated,
        soldCrypto,
        setSoldCrypto,
        sellCalculated,
        setSellCalculated,
        isView,
        setIsView,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}
