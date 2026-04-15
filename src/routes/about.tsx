import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Users, Globe, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О нас — AnonObmen24 | Анонимный криптообменник" },
      { name: "description", content: "AnonObmen24 — анонимный криптообменник, работающий с 2024 года. Без KYC, мгновенная обработка, лучший курс для СНГ." },
      { property: "og:title", content: "О нас — AnonObmen24" },
      { property: "og:description", content: "Анонимный криптообменник с 2024 года." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl font-bold">
            О сервисе <span className="gradient-green-purple-text">AnonObmen24</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 rounded-2xl border border-border bg-card p-8"
        >
          <p className="text-base leading-relaxed text-muted-foreground">
            <strong className="text-foreground">AnonObmen24</strong> — анонимный криптообменник, работающий с 2024 года.
            Мы предлагаем самый выгодный курс обмена криптовалюты для жителей СНГ. Без верификации, без KYC,
            с мгновенной обработкой заявок. Наша цель — сделать обмен крипты простым, быстрым и безопасным.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Shield, title: "Безопасность", desc: "Полная анонимность и конфиденциальность каждой сделки" },
              { icon: Zap, title: "Скорость", desc: "Среднее время обработки — от 5 до 15 минут" },
              { icon: Globe, title: "СНГ", desc: "Работаем с рублями, тенге и гривнами" },
              { icon: Users, title: "5000+ обменов", desc: "Тысячи довольных клиентов по всему СНГ" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-surface-elevated p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
