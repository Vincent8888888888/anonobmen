import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Copy, CheckCircle, AlertTriangle, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { getAssetById, walletAddresses, formatAmount } from "@/lib/exchange-data";
import { z } from "zod";

const searchSchema = z.object({
  from: z.string().default("btc"),
  to: z.string().default("rub"),
  amount: z.string().default("0"),
  receive: z.string().default("0"),
  fiat: z.string().optional(),
});

export const Route = createFileRoute("/payment")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Оплата заявки — AnonObmen24" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const { from, to, amount, receive, fiat } = Route.useSearch();
  const isFiatToСrypto = fiat === "true";

  if (isFiatToСrypto) {
    return <FiatToCryptoMessage />;
  }

  return <CryptoPayment fromId={from} toId={to} amount={amount} receive={receive} />;
}

function FiatToCryptoMessage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <MessageCircle className="h-7 w-7 text-accent" />
        </div>
        <h1 className="text-xl font-bold text-foreground">Свяжитесь с менеджером</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Для обмена рублей, тенге или гривен на криптовалюту, а также других направлений напишите менеджеру.
        </p>
        <a
          href="https://t.me/Anon_obmen24"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-green-purple py-3.5 text-sm font-semibold text-foreground transition-all hover:opacity-90"
        >
          Написать менеджеру @Anon_obmen24
          <ArrowRight className="h-4 w-4" />
        </a>
        <Link to="/" className="mt-3 block text-xs text-muted-foreground hover:text-foreground">
          ← Вернуться на главную
        </Link>
      </motion.div>
    </div>
  );
}

function CryptoPayment({ fromId, toId, amount, receive }: { fromId: string; toId: string; amount: string; receive: string }) {
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min

  const fromAsset = getAssetById(fromId);
  const toAsset = getAssetById(toId);
  const walletAddress = walletAddresses[fromId] ?? "";

  useEffect(() => {
    if (paid || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [paid, timeLeft]);

  const copyAddress = useCallback(() => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [walletAddress]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (paid) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md rounded-2xl border border-primary/30 bg-card p-8 text-center glow-green"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Заявка принята!</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Среднее время зачисления — 5–15 минут. Следите за статусом в Telegram.
          </p>
          <a
            href="https://t.me/Anon_obmen24"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-green-purple py-3.5 text-sm font-semibold text-foreground"
          >
            Написать @Anon_obmen24
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link to="/" className="mt-3 block text-xs text-muted-foreground hover:text-foreground">
            ← Вернуться на главную
          </Link>
        </motion.div>
      </div>
    );
  }

  const steps = [
    `Откройте ваш криптокошелёк с ${fromAsset?.symbol ?? ""}`,
    `Выберите сеть: ${fromAsset?.network ?? fromAsset?.symbol ?? "основная сеть"}`,
    "Скопируйте адрес кошелька ниже",
    `Отправьте ровно ${amount} ${fromAsset?.symbol ?? ""} на указанный адрес`,
    "Дождитесь подтверждения транзакции",
    'Нажмите кнопку «Я оплатил» ниже',
  ];

  return (
    <div className="py-10">
      <div className="mx-auto max-w-lg px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-lg font-bold text-foreground">Оплата заявки</h1>
            <div className="flex items-center gap-1.5 rounded-lg bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning">
              <Clock className="h-3.5 w-3.5" />
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
          </div>

          {/* Direction */}
          <div className="mb-5 rounded-xl bg-surface-elevated p-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Отдаёте</div>
                <div className="font-semibold text-foreground">{amount} {fromAsset?.symbol}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary" />
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Получаете</div>
                <div className="font-semibold text-foreground">≈ {formatAmount(parseFloat(receive) || 0, toAsset?.symbol ?? "")}</div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mb-5 flex items-start gap-3 rounded-xl bg-destructive/10 p-4">
            <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
            <p className="text-xs text-destructive">
              Отправляйте ровно указанную сумму и с правильной сетью. Иначе средства могут быть потеряны.
            </p>
          </div>

          {/* Wallet + QR */}
          <div className="mb-5 text-center">
            <div className="mb-3 inline-block rounded-xl border border-border bg-foreground p-3">
              <QRCodeSVG value={walletAddress} size={160} bgColor="#ffffff" fgColor="#000000" />
            </div>
            <div className="text-xs text-muted-foreground mb-1">Адрес кошелька:</div>
            <div className="flex items-center gap-2 rounded-lg bg-surface-elevated p-3">
              <code className="min-w-0 flex-1 break-all text-xs text-foreground font-mono">{walletAddress}</code>
              <button onClick={copyAddress} className="shrink-0 rounded-md bg-primary/10 p-2 text-primary hover:bg-primary/20">
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-5">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Инструкция:</h3>
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Pay button */}
          <button
            onClick={() => setPaid(true)}
            className="w-full rounded-xl gradient-green-purple py-3.5 text-sm font-semibold text-foreground transition-all hover:opacity-90"
          >
            Я оплатил
          </button>

          <Link to="/" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground">
            ← Отменить и вернуться
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
