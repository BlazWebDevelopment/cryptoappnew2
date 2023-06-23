import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  balance: number;
  transactions: {
    id: string;
    image: string;
    name: string;
    symbol: string;
    current_price: string;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    circulating_supply: number;
    bought: number;
    paid: number;
    time: string;
    sold: number;
    got: number;
    type: string;
  }[];
  yourCoins: {
    id: string;
    coin_name: string;
    symbol: string;
    value: number;
    image: string;
  }[];
  user?: any;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  name: String,
  balance: {
    type: Number,
    default: 100_000,
  },
  transactions: [
    {
      id: {
        type: String,
      },
      image: {
        type: String,
      },
      name: {
        type: String,
      },
      symbol: {
        type: String,
      },
      current_price: {
        type: String,
      },
      price_change_percentage_24h: {
        type: Number,
      },
      market_cap: {
        type: Number,
      },
      total_volume: {
        type: Number,
      },
      circulating_supply: {
        type: Number,
      },
      bought: {
        type: Number,
      },
      paid: {
        type: Number,
      },
      time: Date,
      sold: {
        type: Number,
      },
      got: {
        type: Number,
      },
      type: {
        type: String,
      },
    },
  ],
  yourCoins: [
    {
      id: String,
      coin_name: String,
      symbol: String,
      value: Number,
      image: String,
    },
  ],
});

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
