import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowDownUp, Zap, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import {
  cryptoAssets,
  fiatAssets,
  rates,
  type CryptoAsset,
  formatAmount,
} from "@/lib/exchange-data";

export function ExchangeCalculator() {
  const navigate = useNavigate();
  const [direction, setDirection] = useState<"crypto-to-fiat" | "fiat-to-crypto">("crypto-to-fiat");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAssets[0].id);
  const [selectedFiat, setSelectedFiat] = useState(fiatAssets[0].id);
  const [amount, setAmount] = useState("");

  const isCryptoToFiat = direction === "crypto-to-fiat";
  const fromAssets = isCryptoToFiat ? cryptoAssets : fiatAssets;
  const toAssets = isCryptoToFiat ? fiatAssets : cryptoAssets;
  const selectedFrom = isCryptoToFiat ? selectedCrypto : selectedFiat;
  const selectedTo = isCryptoToFiat ? selectedFiat : selectedCrypto;

  const rate = useMemo(() => {
    const cryptoId = selectedCrypto;
    const fiatId = selectedFiat;
    return rates[cryptoId]?.[fiatId] ?? 0;
  }, [selectedCrypto, selectedFiat]);

  const receiveAmount = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount <= 0) return 0;
    return isCryptoToFiat ? numAmount * rate : numAmount / rate;
  }, [amount, rate, isCryptoToFiat]);

  const fromAsset = [...cryptoAssets, ...fiatAssets].find((a) => a.id === selectedFrom);
  const toAsset = [...cryptoAssets, ...fiatAssets].find((a) => a.id === selectedTo);

  const handleSwap = () => {
    setDirection(isCryptoToFiat ? "fiat-to-crypto" : "crypto-to-fiat");
    setAmount("");
  };

  const handleExchange = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    if (isCryptoToFiat) {
      // Crypto → Fiat: go to payment page
      navigate({
        to: "/payment",
        search: {
          from: selectedCrypto,
          to: selectedFiat,
          amount: amount,
          receive: receiveAmount.toString(),
        },
      });
    } else {
      // Fiat → Crypto: show manager contact
      navigate({
        to: "/payment",
        search: {
          from: selectedFiat,
          to: selectedCrypto,
          amount: amount,
          receive: receiveAmount.toString(),
          fiat: "true",
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-lg"
    >
      <div className="rounded-2xl border border-border bg-card p-6 glow-green">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Обмен криптовалюты</h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>5–15 мин</span>
          </div>
        </div>

        {/* From */}
        <div className="rounded-xl bg-surface-elevated p-4">
          <label className="mb-2 block text-xs text-muted-foreground">Отдаёте</label>
          <div className="flex gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="min-w-0 flex-1 bg-transparent text-xl font-medium text-foreground outline-none placeholder:text-muted-foreground"
            />
            <select
              value={selectedFrom}
              onChange={(e) => {
                if (isCryptoToFiat) setSelectedCrypto(e.target.value);
                else setSelectedFiat(e.target.value);
              }}
              className="rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground outline-none"
            >
              {fromAssets.map((a: CryptoAsset) => (
                <option key={a.id} value={a.id}>
                  {a.network ? `${a.symbol} (${a.network})` : a.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center -my-3 relative z-10">
          <button
            onClick={handleSwap}
            className="rounded-full border border-border bg-card p-2.5 text-primary transition-transform hover:scale-110 hover:bg-surface-elevated"
          >
            <ArrowDownUp className="h-4 w-4" />
          </button>
        </div>

        {/* To */}
        <div className="rounded-xl bg-surface-elevated p-4">
          <label className="mb-2 block text-xs text-muted-foreground">Получаете</label>
          <div className="flex gap-3">
            <div className="min-w-0 flex-1 text-xl font-medium text-foreground">
              {receiveAmount > 0
                ? formatAmount(receiveAmount, toAsset?.symbol ?? "")
                : "0.00"}
            </div>
            <select
              value={selectedTo}
              onChange={(e) => {
                if (isCryptoToFiat) setSelectedFiat(e.target.value);
                else setSelectedCrypto(e.target.value);
              }}
              className="rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground outline-none"
            >
              {toAssets.map((a: CryptoAsset) => (
                <option key={a.id} value={a.id}>
                  {a.network ? `${a.symbol} (${a.network})` : a.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rate display */}
        {rate > 0 && (
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Zap className="h-3 w-3 text-primary" />
            <span>1 {fromAsset?.symbol} ≈ {isCryptoToFiat ? formatAmount(rate, toAsset?.symbol ?? "") : formatAmount(1/rate, toAsset?.symbol ?? "")}</span>
          </div>
        )}

        {/* Exchange button */}
        <button
          onClick={handleExchange}
          disabled={!amount || parseFloat(amount) <= 0}
          className="mt-5 w-full rounded-xl gradient-green-purple py-3.5 text-sm font-semibold text-foreground transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Обменять
        </button>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1"><Shield className="h-3 w-3 text-primary" /> Без KYC</div>
          <div className="flex items-center gap-1"><Zap className="h-3 w-3 text-accent" /> Мгновенно</div>
        </div>
      </div>
    </motion.div>
  );
}
