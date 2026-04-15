import { Link } from "@tanstack/react-router";
import { Shield, Clock, CheckCircle, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold gradient-green-purple-text">AnonObmen24</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Анонимный криптообменник для стран СНГ. Работаем с 2024 года.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Навигация</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Главная</Link>
              <Link to="/reviews" className="text-sm text-muted-foreground hover:text-foreground">Отзывы</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">О нас</Link>
              <Link to="/guarantees" className="text-sm text-muted-foreground hover:text-foreground">Гарантии</Link>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Преимущества</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-primary" /> Без KYC</div>
              <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /> 5–15 минут</div>
              <div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-primary" /> 100% анонимно</div>
              <div className="flex items-center gap-2"><MessageCircle className="h-3.5 w-3.5 text-primary" /> 24/7 поддержка</div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Контакты</h4>
            <a
              href="https://t.me/Anon_obmen24"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <MessageCircle className="h-4 w-4" />
              @Anon_obmen24
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AnonObmen24. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
