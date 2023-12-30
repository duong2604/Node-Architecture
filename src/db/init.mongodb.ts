import mongoose from "mongoose";

class Database {
  private static instance: Database | null = null;

  private constructor() {
    this._connect();
  }

  private _connect(type = "mongodb") {
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    try {
      mongoose.connect(`${process.env.MONGO_URI}`, { dbName: "shop_dev" });
      console.log("Connected to mongodb.");
    } catch (error) {
      console.log("Failed to connect to mongodb.");
    }
  }

  public static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

export const instanceMongoDB = Database.getInstance();
