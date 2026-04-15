export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  network?: string;
  isCrypto: boolean;
}

export const cryptoAssets: CryptoAsset[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", isCrypto: true },
  { id: "ltc", name: "Litecoin", symbol: "LTC", isCrypto: true },
  { id: "usdt-trc20", name: "USDT (TRC20)", symbol: "USDT", network: "TRC20", isCrypto: true },
  { id: "usdt-erc20", name: "USDT (ERC20)", symbol: "USDT", network: "ERC20", isCrypto: true },
  { id: "eth", name: "Ethereum", symbol: "ETH", isCrypto: true },
  { id: "monero", name: "Monero", symbol: "XMR", isCrypto: true },
  { id: "ton", name: "TON", symbol: "TON", isCrypto: true },
];

export const fiatAssets: CryptoAsset[] = [
  { id: "rub", name: "Рубли", symbol: "RUB", isCrypto: false },
  { id: "kzt", name: "Тенге", symbol: "KZT", isCrypto: false },
  { id: "uah", name: "Гривны", symbol: "UAH", isCrypto: false },
];

export const walletAddresses: Record<string, string> = {
  btc: "bc1ql749fqlf05ljg8u3ynthc9558s8fw6tvhyac3d",
  ltc: "LQ2X5wXTUyhwmUHYVSwLkmWN8C5N5toQTb",
  eth: "0xf8A11470ab6F4FBd76fEc90CFe65782f3f8D1fBe",
  "usdt-erc20": "0xf8A11470ab6F4FBd76fEc90CFe65782f3f8D1fBe",
  "usdt-trc20": "TE3936hKJhzJqzkJST2xHRMkR4GJ2UDCDy",
  monero: "0xf8A11470ab6F4FBd76fEc90CFe65782f3f8D1fBe",
  ton: "UQCj1qjRPGcYWdgztxvT9VrL-AVZZ1MsVmpgYYnFcvPMVUG_",
};

// Approximate rates (for display only)
export const rates: Record<string, Record<string, number>> = {
  btc: { rub: 8_750_000, kzt: 39_500_000, uah: 3_600_000 },
  ltc: { rub: 8_200, kzt: 37_000, uah: 3_400 },
  "usdt-trc20": { rub: 97, kzt: 440, uah: 40 },
  "usdt-erc20": { rub: 97, kzt: 440, uah: 40 },
  eth: { rub: 230_000, kzt: 1_040_000, uah: 95_000 },
  monero: { rub: 22_000, kzt: 99_000, uah: 9_000 },
  ton: { rub: 280, kzt: 1_260, uah: 115 },
};

export function getAssetById(id: string): CryptoAsset | undefined {
  return [...cryptoAssets, ...fiatAssets].find((a) => a.id === id);
}

export function formatAmount(amount: number, symbol: string): string {
  if (["RUB", "KZT", "UAH"].includes(symbol)) {
    return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(amount) + " " + symbol;
  }
  return amount.toFixed(8).replace(/\.?0+$/, "") + " " + symbol;
}
