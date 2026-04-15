import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Отзывы клиентов — AnonObmen24" },
      { name: "description", content: "Реальные отзывы клиентов AnonObmen24 из России, Казахстана и Украины. Быстрый и надёжный обмен криптовалюты." },
      { property: "og:title", content: "Отзывы клиентов — AnonObmen24" },
      { property: "og:description", content: "Реальные отзывы клиентов AnonObmen24." },
    ],
  }),
  component: ReviewsPage,
});

const reviews = [
  { name: "Сергей М.", city: "Москва", date: "12.03.2025", amount: "0.5 BTC → RUB", text: "Обменял полбитка на рубли за 10 минут. Курс лучше, чем на любой бирже. Без лишних вопросов и верификаций. Рекомендую!" },
  { name: "Айдар К.", city: "Алматы", date: "28.02.2025", amount: "2000 USDT → KZT", text: "Пользуюсь уже третий месяц. Курс всегда выгодный, деньги приходят быстро. Менеджер отвечает моментально." },
  { name: "Олена В.", city: "Киев", date: "15.03.2025", amount: "1 ETH → UAH", text: "Первый раз пользовалась таким сервисом — всё прошло гладко. Гривны пришли за 7 минут. Никакого KYC!" },
  { name: "Дмитрий Л.", city: "Санкт-Петербург", date: "05.03.2025", amount: "5000 USDT → RUB", text: "Менял USDT TRC20. Комиссия минимальная, курс адекватный. Поддержка в телеге работает 24/7 — проверял в 3 ночи." },
  { name: "Нурлан Б.", city: "Астана", date: "20.02.2025", amount: "0.3 BTC → KZT", text: "Друг посоветовал AnonObmen24. Теперь сам всем рекомендую. Быстро, анонимно, без головной боли." },
  { name: "Анна Р.", city: "Одесса", date: "10.03.2025", amount: "3 LTC → UAH", text: "Обменяла литкоины на гривны. Всё чётко, как описано на сайте. Особенно нравится, что не нужно никаких документов." },
  { name: "Максим Ш.", city: "Новосибирск", date: "01.04.2025", amount: "10000 USDT → RUB", text: "Крупная сумма — переживал. Но менеджер всё объяснил, провёл пошагово. Деньги пришли за 12 минут." },
  { name: "Виктор Г.", city: "Караганда", date: "25.03.2025", amount: "2 ETH → KZT", text: "Лучший обменник, которым пользовался. Курс реально выгоднее, чем на P2P биржах. Без нервов и ожидания." },
];

function ReviewsPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl font-bold">
            Отзывы <span className="gradient-green-purple-text">клиентов</span>
          </h1>
          <p className="mt-3 text-muted-foreground">Реальные отзывы от пользователей из России, Казахстана и Украины</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {r.city} · {r.date}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />
                  ))}
                </div>
              </div>
              <div className="mb-2 inline-block rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {r.amount}
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
