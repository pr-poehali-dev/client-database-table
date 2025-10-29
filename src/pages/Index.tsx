import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Building2" size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CRM Система</span>
          </div>
          <Link to="/clients">
            <Button>
              Перейти к базе клиентов
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-6 animate-fade-in mb-16">
          <h1 className="text-5xl font-bold tracking-tight">
            Корпоративная система управления
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Профессиональное решение для управления клиентской базой и бизнес-процессами
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover-scale">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <CardTitle>База клиентов</CardTitle>
              <CardDescription>
                Централизованное хранение и управление данными клиентов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/clients">
                <Button variant="outline" className="w-full">
                  Открыть
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="BarChart3" size={24} className="text-accent" />
              </div>
              <CardTitle>Аналитика</CardTitle>
              <CardDescription>
                Отчеты и статистика по клиентской базе в реальном времени
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Скоро
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Settings" size={24} className="text-secondary-foreground" />
              </div>
              <CardTitle>Настройки</CardTitle>
              <CardDescription>
                Конфигурация системы и управление доступом
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Скоро
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle>Ключевые возможности</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Быстрый поиск</h3>
                  <p className="text-sm text-muted-foreground">
                    Мгновенный поиск по имени, компании или контактам
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Управление статусами</h3>
                  <p className="text-sm text-muted-foreground">
                    Отслеживание активности клиентов в режиме реального времени
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Редактирование данных</h3>
                  <p className="text-sm text-muted-foreground">
                    Простое добавление и изменение информации о клиентах
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Статистика</h3>
                  <p className="text-sm text-muted-foreground">
                    Визуализация ключевых показателей и метрик
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          © 2024 CRM Система. Корпоративное решение для управления клиентами
        </div>
      </footer>
    </div>
  );
}
