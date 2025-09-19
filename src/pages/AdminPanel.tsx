import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Booking {
  id: number;
  name: string;
  phone: string;
  role: string;
  grade: string;
  city: string;
  schedule: Record<string, string[]>;
  schedule_vladivostok: Record<string, string[]>;
  user_timezone: string;
  goals: string;
  created_at: string;
}

interface BookingsResponse {
  success: boolean;
  bookings: Booking[];
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

const AdminPanel = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    city: '',
    grade: '',
    role: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    offset: 0,
    hasMore: false
  });

  const fetchBookings = async (newFilters = filters, offset = 0) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        limit: pagination.limit.toString(),
        offset: offset.toString(),
        ...(newFilters.city && { city: newFilters.city }),
        ...(newFilters.grade && { grade: newFilters.grade }),
        ...(newFilters.role && { role: newFilters.role }),
        ...(newFilters.search && { search: newFilters.search })
      });

      const response = await fetch(`https://functions.poehali.dev/7411bd73-f0d1-4d58-a25c-97a056c959ef?${params}`);
      
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }

      const data: BookingsResponse = await response.json();
      
      if (offset === 0) {
        setBookings(data.bookings);
      } else {
        setBookings(prev => [...prev, ...data.bookings]);
      }
      
      setPagination({
        total: data.total,
        limit: data.limit,
        offset: data.offset,
        hasMore: data.has_more
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, offset: 0 }));
    fetchBookings(newFilters, 0);
  };

  const loadMore = () => {
    const newOffset = pagination.offset + pagination.limit;
    fetchBookings(filters, newOffset);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatSchedule = (schedule: Record<string, string[]>) => {
    return Object.entries(schedule).map(([day, times]) => (
      <div key={day} className="mb-1">
        <strong>{day}:</strong> {times.join(', ')}
      </div>
    ));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Ошибка</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => fetchBookings()}>
              Попробовать снова
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Админ-панель</h1>
          <p className="text-gray-600">Управление заявками на обучение</p>
        </div>

        {/* Фильтры */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Filter" size={20} />
              Фильтры и поиск
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Поиск по имени/телефону</Label>
                <Input
                  id="search"
                  placeholder="Введите имя или телефон..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="city">Город</Label>
                <Input
                  id="city"
                  placeholder="Фильтр по городу..."
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="grade">Класс</Label>
                <Select value={filters.grade} onValueChange={(value) => handleFilterChange('grade', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все классы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все классы</SelectItem>
                    <SelectItem value="8">8 класс</SelectItem>
                    <SelectItem value="9">9 класс</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="role">Роль</Label>
                <Select value={filters.role} onValueChange={(value) => handleFilterChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все роли" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все роли</SelectItem>
                    <SelectItem value="parent">Родитель</SelectItem>
                    <SelectItem value="student">Ученик</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="Users" size={24} className="text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Всего заявок</p>
                  <p className="text-2xl font-semibold">{pagination.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="Calendar" size={24} className="text-green-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Показано</p>
                  <p className="text-2xl font-semibold">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon name="Clock" size={24} className="text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Последнее обновление</p>
                  <p className="text-sm font-medium">
                    {bookings.length > 0 ? formatDate(bookings[0].created_at) : 'Нет данных'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Список заявок */}
        <div className="space-y-4">
          {loading && bookings.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-4" />
              <p>Загрузка заявок...</p>
            </div>
          ) : bookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="Search" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Заявки не найдены</h3>
                <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Основная информация */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="User" size={16} />
                        <h3 className="font-semibold text-lg">{booking.name}</h3>
                        <Badge variant={booking.role === 'parent' ? 'default' : 'secondary'}>
                          {booking.role === 'parent' ? 'Родитель' : 'Ученик'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Phone" size={14} />
                          <span>{booking.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={14} />
                          <span>{booking.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="GraduationCap" size={14} />
                          <span>{booking.grade} класс</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Clock" size={14} />
                          <span>{formatDate(booking.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Расписание */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        Расписание
                      </h4>
                      <div className="text-sm">
                        <div className="mb-3">
                          <p className="font-medium text-gray-700 mb-1">По времени пользователя:</p>
                          {formatSchedule(booking.schedule)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 mb-1">По владивостокскому времени:</p>
                          {formatSchedule(booking.schedule_vladivostok)}
                        </div>
                        {booking.user_timezone && (
                          <p className="text-xs text-gray-500 mt-2">
                            Часовой пояс: {booking.user_timezone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Цели */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Target" size={16} />
                        Цели обучения
                      </h4>
                      <p className="text-sm text-gray-700">
                        {booking.goals || 'Не указаны'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Кнопка "Загрузить еще" */}
        {pagination.hasMore && (
          <div className="text-center mt-6">
            <Button onClick={loadMore} disabled={loading} variant="outline">
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="ChevronDown" size={16} className="mr-2" />
                  Загрузить еще
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;