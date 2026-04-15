import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Zap, Clock, Eye, ArrowRight, Users, CreditCard, ShoppingBag } from "lucide-react";
import { ExchangeCalculator } from "@/components/ExchangeCalculator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AnonObmen24 — Анонимный криптообменник для СНГ | Лучший курс" },
      { name: "description", content: "Анонимный обмен криптовалюты без KYC. BTC, USDT, ETH, LTC на рубли, тенге, гривны. Лучший курс, мгновенная обработка. Обмен крипты для СНГ." },
      { property: "og:title", content: "AnonObmen24 — Анонимный криптообменник для СНГ" },
      { property: "og:description", content: "Обмен BTC, USDT, ETH на рубли без KYC. Лучший курс и мгновенная обработка." },
      { name: "keywords", content: "криптообменник, обмен btc на рубли, анонимный обмен криптовалюты, обмен usdt на рубли, купить биткоин за рубли, обмен крипты без kyc, лучший курс обмена криптовалюты снг" },
    ],
  }),
  component: Index,
});

const advantages = [
  { icon: Shield, title: "100% Анонимно", desc: "Без верификации и KYC. Мы не храним ваши данные." },
  { icon: Zap, title: "Мгновенный обмен", desc: "Среднее время зачисления — 5–15 минут." },
  { icon: Eye, title: "Лучший курс", desc: "Самые выгодные курсы для стран СНГ." },
  { icon: Clock, title: "24/7 Поддержка", desc: "Круглосуточная поддержка в Telegram." },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.2_155_/_0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.65_0.25_300_/_0.06),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <Shield className="h-3.5 w-3.5" />
              Более 5000 успешных обменов
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Анонимный обмен{" "}
              <span className="gradient-green-purple-text">криптовалюты</span>
              <br />
              для стран СНГ
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Обменивайте BTC, USDT, ETH, LTC на рубли, тенге и гривны. Без KYC, без верификации, мгновенно.
            </p>
          </motion.div>

          <ExchangeCalculator />
        </div>
      </section>

      {/* Advantages */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2 {...fadeUp} className="mb-10 text-center text-2xl font-bold">
            Почему выбирают <span className="gradient-green-purple-text">AnonObmen24</span>
          </motion.h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <a.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{a.title}</h3>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center"
          >
            <h2 className="mb-4 text-xl font-bold text-foreground">Дополнительные услуги</h2>
            <p className="mx-auto mb-6 max-w-lg text-sm text-muted-foreground">
              Ищем постоянных клиентов. Занимаемся оплатой заграничных сервисов, выкупом товаров за рубежом, оформлением сделок.
            </p>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4 text-accent" /> Оплата сервисов</span>
              <span className="flex items-center gap-1.5"><ShoppingBag className="h-4 w-4 text-accent" /> Выкуп товаров</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-accent" /> Оформление сделок</span>
            </div>
            <a
              href="https://t.me/Anon_obmen24"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
            >
              Написать менеджеру
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
