import React, { useEffect, useState } from "react";
import market from "../../AllData/market.json";

interface ICryptoData {
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  id: string;
  symbol: string;
  image: string;
}

interface IUseCoins {
  data: ICryptoData[];
  isPriceSorted: boolean;
  isNameSorted: boolean;
  priceSorted: ICryptoData[];
  nameSorted: ICryptoData[];
  gainers: ICryptoData[];
  isGainerSorter: boolean;
  losers: ICryptoData[];
  isLosersSorter: boolean;
  isReversePriceSorted: boolean;
  searchInput: string;
  priceSortingHandler: () => void;
  nameSortingHandler: () => void;
  gainersHandler: () => void;
  losersHandler: () => void;
  allDataHandler: () => void;
  returnHandler: () => void;
  searchedData: ICryptoData[];
  error: boolean;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>; // Update this line
}

function useCoins(): IUseCoins {
  const [data, setData] = useState<ICryptoData[]>([]);
  const [isPriceSorted, setIsPriceSorted] = useState(false);
  const [priceSorted, setPriceSorted] = useState<ICryptoData[]>([]);
  const [isNameSorted, setIsNameSorted] = useState(false);
  const [nameSorted, setNameSorted] = useState<ICryptoData[]>([]);
  const [gainers, setGainers] = useState<ICryptoData[]>([]);
  const [isGainerSorter, setIsGainerSorter] = useState(false);
  const [losers, setLosers] = useState<ICryptoData[]>([]);
  const [isLosersSorter, setIsLosersSorter] = useState(false);
  const [isReversePriceSorted, setIsReversePriceSorted] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedData, setSearchedData] = useState<ICryptoData[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setData(market);
    setSearchedData(market);
  }, []);

  useEffect(() => {
    if (!data) return;

    const filteredCrypto = data.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setError(filteredCrypto.length === 0);
    setSearchedData(filteredCrypto);
  }, [searchInput, data]);

  const priceSortingHandler = () => {
    const sortedData = [...data].sort((a, b) =>
      isPriceSorted
        ? b.current_price - a.current_price
        : a.current_price - b.current_price
    );

    setPriceSorted(sortedData);
    setIsPriceSorted(!isPriceSorted);
    setIsNameSorted(false);
    setIsLosersSorter(false);
    setIsGainerSorter(false);
    setIsReversePriceSorted(!isPriceSorted);
  };

  const nameSortingHandler = () => {
    const sortedData = [...data].sort((a, b) => b.name.localeCompare(a.name));

    setIsNameSorted(!isNameSorted);
    setNameSorted(sortedData);
    setIsPriceSorted(false);
    setIsGainerSorter(false);
    setIsLosersSorter(false);
    setIsReversePriceSorted(false);
  };

  const gainersHandler = () => {
    const filteredData = data.filter(
      (crypto) => crypto.price_change_percentage_24h > 0
    );

    setGainers(filteredData);
    setIsGainerSorter(!isGainerSorter);
    setIsPriceSorted(false);
    setIsLosersSorter(false);
    setIsReversePriceSorted(false);
    setIsNameSorted(false);
  };

  const losersHandler = () => {
    const filteredData = data.filter(
      (crypto) => crypto.price_change_percentage_24h < 0
    );

    setLosers(filteredData);
    setIsLosersSorter(!isLosersSorter);
    setIsGainerSorter(false);
    setIsPriceSorted(false);
    setIsNameSorted(false);
    setIsReversePriceSorted(false);
  };

  const allDataHandler = () => {
    setIsGainerSorter(false);
    setIsLosersSorter(false);
    setIsPriceSorted(false);
    setIsNameSorted(false);
    setIsReversePriceSorted(false);
    setSearchedData(data);
    setSearchInput("");
  };

  const returnHandler = () => {
    setSearchedData(data);
    setError(false);
    setSearchInput("");
  };

  return {
    data,
    isPriceSorted,
    isNameSorted,
    priceSorted,
    nameSorted,
    gainers,
    isGainerSorter,
    losers,
    isLosersSorter,
    isReversePriceSorted,
    searchInput,
    priceSortingHandler,
    nameSortingHandler,
    gainersHandler,
    losersHandler,
    allDataHandler,
    returnHandler,
    searchedData,
    error,
    setSearchInput,
  };
}

export default useCoins;
