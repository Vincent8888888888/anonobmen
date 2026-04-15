import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Часто задаваемые вопросы | AnonObmen24" },
      { name: "description", content: "Ответы на частые вопросы об обмене криптовалюты на AnonObmen24. Как быстро проходит обмен, нужна ли верификация и другое." },
      { property: "og:title", content: "FAQ — AnonObmen24" },
      { property: "og:description", content: "Ответы на частые вопросы об обмене криптовалюты." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  { q: "Как быстро проходит обмен?", a: "Среднее время обработки заявки — от 5 до 15 минут после получения подтверждения транзакции в сети. В редких случаях, при высокой загрузке сети, обмен может занять до 30 минут." },
  { q: "Нужно ли проходить верификацию (KYC)?", a: "Нет. AnonObmen24 — полностью анонимный сервис. Мы не запрашиваем документы, не проводим верификацию и не храним персональные данные." },
  { q: "Какие сети поддерживаются для USDT?", a: "Мы поддерживаем USDT в сетях TRC20 (Tron) и ERC20 (Ethereum). Обратите внимание: курсы и адреса кошельков отличаются в зависимости от сети. Отправляйте только в указанной сети!" },
  { q: "Что делать, если я отправил неправильную сумму или сеть?", a: "Немедленно свяжитесь с менеджером в Telegram @Anon_obmen24. Мы приложим все усилия для возврата средств, но гарантировать возврат при ошибке сети невозможно." },
  { q: "Сколько времени даётся на оплату?", a: "На оплату заявки выделяется 30 минут. Если вы не успели — создайте новую заявку, так как курс мог измениться." },
  { q: "Можно ли обменять другие криптовалюты?", a: "Помимо основных направлений (BTC, ETH, USDT, LTC, Monero, TON), мы можем обработать индивидуальные запросы. Напишите менеджеру @Anon_obmen24 для уточнения." },
  { q: "Как связаться с поддержкой?", a: "Напишите нашему менеджеру в Telegram: @Anon_obmen24. Поддержка работает круглосуточно, 7 дней в неделю." },
  { q: "Безопасен ли ваш сервис?", a: "Да. Мы работаем с 2024 года и провели более 5000 успешных обменов. Не храним данные клиентов, используем только проверенные кошельки и каналы связи." },
];

function FaqPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-3xl font-bold">
            Часто задаваемые <span className="gradient-green-purple-text">вопросы</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-5">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
