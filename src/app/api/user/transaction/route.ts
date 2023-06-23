import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User, { IUser } from "../../../../models/user/User";

export async function POST(req: NextRequest) {
  const { email, balance, transactions, yourCoins } = await req.json();

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" });
    user.balance = balance;
    user.transactions.push(...transactions);

    const { coin_name } = yourCoins[0];
    const filtered = user.yourCoins.find(
      (cryp) => cryp.coin_name === coin_name
    );

    if (filtered) {
      if (yourCoins[0].value > 0) {
        filtered.value = yourCoins[0].value;
      } else if (yourCoins[0].value === 0) {
        const index = user.yourCoins.indexOf(filtered);
        user.yourCoins.splice(index, 1);
      }
    } else {
      user.yourCoins.push(...yourCoins);
    }

    const newUser = new User(user);
    await newUser.save();

    if (user) {
      return NextResponse.json({ status: 200, user });
    } else {
      return NextResponse.json({ status: 404, message: "User not found!" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
