import { useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../models/user/User";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import YourCoinList from "@/app/dashboard/[id]/components/YourCoinList";

interface Transaction {
  id: string;
  image: string;
  name: string;
  bought: number;
  paid: number;
  time: Date;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  got: number;
  sold: number;
  type: string;
}

interface YourCoins {
  coin_name: string;
  value: number;
  symbol: string;
  image: string;
}

interface UserHookResult {
  user: IUser | undefined;
  updateTransaction: (
    transactions: any[],
    newUserBalance: number,
    yourCoins: any[]
  ) => Promise<void>;
  convertCpypto: (yourCoins: any[]) => Promise<void>;
}

function useUser(): UserHookResult {
  const [user, setUser] = useState<IUser | undefined>();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;
    const fetchUser = async () => {
      try {
        const response = await axios.get<IUser>(
          `/api/user?email=${session && session.user?.email}`
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [session]);

  const updateTransaction = async (
    transactions: any[],
    newUserBalance: number,
    yourCoins: any[]
  ) => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/user/transaction`, {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          balance: newUserBalance,
          transactions: transactions,
          yourCoins: yourCoins,
        }),
      });

      if (response.ok) {
        console.log("User transactions updated successfully");
      } else {
        console.error(
          "Failed to update user transactions:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to update user transactions:", error);
    }
  };

  const convertCpypto = async (yourCoins: any[]) => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/user/converter`, {
        method: "POST",
        body: JSON.stringify({
          email: session?.user?.email,
          yourCoins: yourCoins,
        }),
      });

      if (response.ok) {
        console.log("User transactions updated successfully", yourCoins);
      } else {
        console.error(
          "Failed to update user transactions:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to update user transactions:", error);
    }
  };

  return { user, updateTransaction, convertCpypto };
}

export default useUser;
