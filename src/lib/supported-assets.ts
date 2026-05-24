/** Illustrative supported assets — environment-scoped, not a public availability matrix. */
export type SupportedAsset = {
  symbol: string;
  name: string;
  rails: string[];
  category: "stablecoin" | "native" | "token";
};

export const SUPPORTED_ASSETS: SupportedAsset[] = [
  { symbol: "USDT", name: "Tether", rails: ["TRC20", "ERC20"], category: "stablecoin" },
  { symbol: "BTC", name: "Bitcoin", rails: ["Bitcoin"], category: "native" },
  { symbol: "ETH", name: "Ethereum", rails: ["Ethereum"], category: "native" },
  { symbol: "TRX", name: "Tron", rails: ["Tron"], category: "native" },
  { symbol: "BNB", name: "BNB Chain", rails: ["BEP20"], category: "native" },
  { symbol: "LTC", name: "Litecoin", rails: ["Litecoin"], category: "native" },
  { symbol: "DASH", name: "Dash", rails: ["Dash"], category: "native" },
];
