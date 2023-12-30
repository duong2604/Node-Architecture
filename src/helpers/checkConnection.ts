import mongoose, { Connection } from "mongoose";
import os from "os";
import process from "process";

export const countConnection = (): number => {
  const connections: Connection[] = mongoose.connections as Connection[];
  return connections.length;
};

export const overload = () => {
  const time = 5000;
  setInterval(() => {
    const activeConnections = mongoose.connections.length;
    const numOfCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnection = numOfCores * 5;

    console.log("Number of cores:", numOfCores);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

    if (activeConnections > maxConnection) {
      console.log("Connections overload detected.");
    }
  }, time);
};
