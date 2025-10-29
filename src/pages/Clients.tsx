import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  registeredAt: string;
}

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Александр Петров',
    company: 'ООО "Техносервис"',
    email: 'petrov@techservice.ru',
    phone: '+7 (495) 123-45-67',
    status: 'active',
    registeredAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    company: 'ЗАО "Консалтинг Групп"',
    email: 'm.sidorova@consulting.ru',
    phone: '+7 (495) 234-56-78',
    status: 'active',
    registeredAt: '2024-02-20'
  },
  {
    id: '3',
    name: 'Иван Кузнецов',
    company: 'ИП Кузнецов',
    email: 'kuznetsov@mail.ru',
    phone: '+7 (495) 345-67-89',
    status: 'inactive',
    registeredAt: '2024-03-10'
  }
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive'
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeClientsCount = clients.filter(c => c.status === 'active').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingClient) {
      setClients(clients.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...formData }
          : c
      ));
      toast.success('Клиент успешно обновлен');
    } else {
      const newClient: Client = {
        id: Date.now().toString(),
        ...formData,
        registeredAt: new Date().toISOString().split('T')[0]
      };
      setClients([...clients, newClient]);
      toast.success('Клиент успешно добавлен');
    }
    
    resetForm();
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      status: client.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
    toast.success('Клиент удален');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'active'
    });
    setEditingClient(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">База клиентов</h1>
            <p className="text-muted-foreground mt-1">Управление клиентской базой компании</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Icon name="UserPlus" size={18} />
                Добавить клиента
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingClient ? 'Редактировать клиента' : 'Добавить нового клиента'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">ФИО</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иванов Иван Иванович"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Компания</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="ООО 'Компания'"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Статус</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="active">Активный</option>
                    <option value="inactive">Неактивный</option>
                  </select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingClient ? 'Сохранить' : 'Добавить'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Отмена
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего клиентов</CardTitle>
              <Icon name="Users" size={20} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground mt-1">в базе данных</p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активных</CardTitle>
              <Icon name="CheckCircle" size={20} className="text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{activeClientsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((activeClientsCount / clients.length) * 100)}% от общего числа
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Неактивных</CardTitle>
              <Icon name="XCircle" size={20} className="text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {clients.length - activeClientsCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">требуют внимания</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Список клиентов</CardTitle>
                <CardDescription className="mt-1">
                  Управление данными клиентов и их статусами
                </CardDescription>
              </div>
              <div className="relative w-72">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени, компании или email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">ФИО</TableHead>
                    <TableHead className="font-semibold">Компания</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Телефон</TableHead>
                    <TableHead className="font-semibold">Статус</TableHead>
                    <TableHead className="font-semibold">Дата регистрации</TableHead>
                    <TableHead className="text-right font-semibold">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        {searchQuery ? 'Клиенты не найдены' : 'Список клиентов пуст'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredClients.map((client) => (
                      <TableRow key={client.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.company}</TableCell>
                        <TableCell className="text-muted-foreground">{client.email}</TableCell>
                        <TableCell className="text-muted-foreground">{client.phone}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            client.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              client.status === 'active' ? 'bg-green-600' : 'bg-orange-600'
                            }`} />
                            {client.status === 'active' ? 'Активный' : 'Неактивный'}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(client.registeredAt).toLocaleDateString('ru-RU')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(client)}
                              className="h-8 w-8 p-0"
                            >
                              <Icon name="Pencil" size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(client.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
