import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  message: string;
  sender_type: 'admin' | 'client';
  sender_email?: string;
  created_at: string;
}

interface Booking {
  id: number;
  name: string;
  phone: string;
  role: string;
  grade: string;
  city: string;
  schedule: Record<string, boolean>;
  schedule_vladivostok: Record<string, boolean>;
  user_timezone: string;
  goals: string;
  created_at: string;
  status: string;
  messages: Message[];
}

const BookingsSection: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_URL = 'https://functions.poehali.dev/06c8aa2d-1b5e-4e78-aa26-47c808bcd490';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedBooking?.messages]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const sendMessage = async () => {
    if (!selectedBooking || !newMessage.trim()) return;

    setSendingMessage(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: selectedBooking.id,
          message: newMessage.trim(),
          sender_type: 'admin',
          sender_email: 'admin@company.ru'
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Add message to current booking
        const newMsg: Message = {
          id: result.id,
          message: newMessage.trim(),
          sender_type: 'admin',
          sender_email: 'admin@company.ru',
          created_at: result.created_at
        };

        setSelectedBooking(prev => prev ? {
          ...prev,
          messages: [...prev.messages, newMsg]
        } : null);

        // Update bookings list
        setBookings(prev => prev.map(booking => 
          booking.id === selectedBooking.id 
            ? { ...booking, messages: [...booking.messages, newMsg] }
            : booking
        ));

        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      const response = await fetch(`${API_URL}?id=${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setBookings(prev => prev.map(booking => 
          booking.id === bookingId ? { ...booking, status } : booking
        ));
        
        if (selectedBooking?.id === bookingId) {
          setSelectedBooking(prev => prev ? { ...prev, status } : null);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      'new': { label: 'Новая', variant: 'default' },
      'in_progress': { label: 'В работе', variant: 'secondary' },
      'completed': { label: 'Завершена', variant: 'outline' },
      'cancelled': { label: 'Отменена', variant: 'destructive' }
    };
    
    const config = statusMap[status] || { label: status, variant: 'default' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatSchedule = (schedule: Record<string, boolean>) => {
    const dayNames: Record<string, string> = {
      'monday': 'Пн',
      'tuesday': 'Вт', 
      'wednesday': 'Ср',
      'thursday': 'Чт',
      'friday': 'Пт',
      'saturday': 'Сб',
      'sunday': 'Вс'
    };

    return Object.entries(schedule)
      .filter(([_, available]) => available)
      .map(([day, _]) => dayNames[day])
      .join(', ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Загрузка заявок...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Bookings List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Заявки ({bookings.length})</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={fetchBookings}
                className="flex items-center gap-2"
              >
                <Icon name="RefreshCw" size={16} />
                Обновить
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-2 p-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedBooking?.id === booking.id 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{booking.name}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{booking.phone}</p>
                    <p className="text-xs text-gray-500">{booking.role} • {booking.grade}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        {formatDate(booking.created_at)}
                      </span>
                      {booking.messages.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {booking.messages.length} сообщ.
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        {selectedBooking ? (
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{selectedBooking.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedBooking.phone} • {selectedBooking.city}
                  </p>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={selectedBooking.status}
                    onChange={(e) => updateBookingStatus(selectedBooking.id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="new">Новая</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Завершена</option>
                    <option value="cancelled">Отменена</option>
                  </select>
                </div>
              </div>
              
              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Роль и класс:</p>
                  <p className="text-sm text-gray-600">{selectedBooking.role} • {selectedBooking.grade}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Расписание:</p>
                  <p className="text-sm text-gray-600">{formatSchedule(selectedBooking.schedule)}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium">Цели:</p>
                  <p className="text-sm text-gray-600">{selectedBooking.goals}</p>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedBooking.messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender_type === 'admin'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender_type === 'admin' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatDate(message.created_at)}
                          {message.sender_type === 'client' && message.sender_email && 
                            ` • ${message.sender_email}`
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <Separator />

              {/* Message Input */}
              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите ответ клиенту..."
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    disabled={sendingMessage}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sendingMessage}
                    className="flex items-center gap-2"
                  >
                    <Icon name="Send" size={16} />
                    {sendingMessage ? 'Отправка...' : 'Отправить'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Выберите заявку для просмотра чата</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingsSection;