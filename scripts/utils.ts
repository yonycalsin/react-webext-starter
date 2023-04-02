import path from "node:path";
import { bgCyan, black } from "kolorist";

const port = parseInt(process.env.PORT || "") || 3303;

const isDev = process.env.NODE_ENV !== "production";

function r(...args: string[]) {
  return path.resolve(__dirname, "..", ...args);
}

function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message);
}

export { port, r, isDev, log };
