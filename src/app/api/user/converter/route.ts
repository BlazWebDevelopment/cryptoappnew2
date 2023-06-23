import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/lib/mongodb";
import User, { IUser } from "../../../../models/user/User";

export async function POST(req: NextRequest) {
  const { email, yourCoins } = await req.json();

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" });

    const { coin_name } = yourCoins[0];
    const filtered = user.yourCoins.find(
      (cryp) => cryp.coin_name === coin_name
    );
    const { coin_name: second_name } = yourCoins[1];
    const secondFiltered = user.yourCoins.find(
      (cryp) => cryp.coin_name === second_name
    );

    if (secondFiltered && filtered) {
      secondFiltered.value = yourCoins[1].value;
      filtered.value = yourCoins[0].value;
      if (yourCoins[1].value > 0) {
        secondFiltered.value = yourCoins[1].value;
      } else if (yourCoins[1].value === 0) {
        const index = user.yourCoins.indexOf(secondFiltered);
        user.yourCoins.splice(index, 1);
      }
    }

    if (!filtered || !secondFiltered) {
      user.yourCoins.push(yourCoins[0]);
      if (secondFiltered) {
        if (yourCoins[1].value > 0) {
          secondFiltered.value = yourCoins[1].value;
        } else if (yourCoins[1].value === 0) {
          const index = user.yourCoins.indexOf(secondFiltered);
          user.yourCoins.splice(index, 1);
        }
      }
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
