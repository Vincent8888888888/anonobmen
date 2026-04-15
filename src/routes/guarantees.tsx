import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Zap, Clock, MessageCircle, Eye, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/guarantees")({
  head: () => ({
    meta: [
      { title: "Гарантии — AnonObmen24 | Безопасный обмен криптовалюты" },
      { name: "description", content: "Гарантии AnonObmen24: 100% анонимность, лучший курс, мгновенная обработка, круглосуточная поддержка." },
      { property: "og:title", content: "Гарантии — AnonObmen24" },
      { property: "og:description", content: "100% анонимность, лучший курс и мгновенная обработка." },
    ],
  }),
  component: GuaranteesPage,
});

const guarantees = [
  { icon: Shield, title: "100% анонимность", desc: "Мы не собираем и не храним персональные данные. Никакой верификации и KYC." },
  { icon: Eye, title: "Самый выгодный курс", desc: "Мониторим рынок 24/7 и предлагаем курсы лучше, чем на P2P-биржах." },
  { icon: Zap, title: "Мгновенная обработка", desc: "Среднее время зачисления — 5–15 минут после подтверждения транзакции." },
  { icon: MessageCircle, title: "Поддержка 24/7", desc: "Менеджер доступен круглосуточно в Telegram для решения любых вопросов." },
  { icon: CheckCircle, title: "Защита от потери средств", desc: "Автоматическая проверка сети и суммы. Предупреждения перед отправкой." },
  { icon: Clock, title: "5000+ обменов", desc: "Более пяти тысяч успешно выполненных обменов с момента запуска в 2024 году." },
];

function GuaranteesPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-3xl font-bold">
            Наши <span className="gradient-green-purple-text">гарантии</span>
          </h1>
          <p className="mt-3 text-muted-foreground">Безопасность и надёжность — наш главный приоритет</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/30"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <g.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">{g.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
