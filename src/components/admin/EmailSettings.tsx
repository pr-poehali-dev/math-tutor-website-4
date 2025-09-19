import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface EmailConfig {
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_password: string;
  smtp_secure: boolean;
  imap_host: string;
  imap_port: number;
  imap_user: string;
  imap_password: string;
  imap_secure: boolean;
}

const EmailSettings: React.FC = () => {
  const [config, setConfig] = useState<EmailConfig>({
    smtp_host: '',
    smtp_port: 587,
    smtp_user: '',
    smtp_password: '',
    smtp_secure: true,
    imap_host: '',
    imap_port: 993,
    imap_user: '',
    imap_password: '',
    imap_secure: true
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState({ smtp: false, imap: false });
  const [testResults, setTestResults] = useState({ smtp: '', imap: '' });

  const API_URL = 'https://functions.poehali.dev/email-settings-function'; // Placeholder URL

  useEffect(() => {
    fetchEmailSettings();
  }, []);

  const fetchEmailSettings = async () => {
    try {
      // In a real implementation, fetch from backend
      setLoading(false);
    } catch (error) {
      console.error('Error fetching email settings:', error);
      setLoading(false);
    }
  };

  const saveEmailSettings = async () => {
    setSaving(true);
    try {
      // In a real implementation, save to backend via API
      console.log('Saving email settings:', config);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Настройки почты сохранены успешно!');
    } catch (error) {
      console.error('Error saving email settings:', error);
      alert('Ошибка при сохранении настроек');
    } finally {
      setSaving(false);
    }
  };

  const testSmtpConnection = async () => {
    setTesting(prev => ({ ...prev, smtp: true }));
    setTestResults(prev => ({ ...prev, smtp: '' }));
    
    try {
      // In a real implementation, test SMTP connection via backend
      console.log('Testing SMTP connection:', {
        host: config.smtp_host,
        port: config.smtp_port,
        user: config.smtp_user,
        secure: config.smtp_secure
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setTestResults(prev => ({ ...prev, smtp: 'success' }));
      } else {
        setTestResults(prev => ({ ...prev, smtp: 'error' }));
      }
    } catch (error) {
      console.error('SMTP test error:', error);
      setTestResults(prev => ({ ...prev, smtp: 'error' }));
    } finally {
      setTesting(prev => ({ ...prev, smtp: false }));
    }
  };

  const testImapConnection = async () => {
    setTesting(prev => ({ ...prev, imap: true }));
    setTestResults(prev => ({ ...prev, imap: '' }));
    
    try {
      // In a real implementation, test IMAP connection via backend
      console.log('Testing IMAP connection:', {
        host: config.imap_host,
        port: config.imap_port,
        user: config.imap_user,
        secure: config.imap_secure
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setTestResults(prev => ({ ...prev, imap: 'success' }));
      } else {
        setTestResults(prev => ({ ...prev, imap: 'error' }));
      }
    } catch (error) {
      console.error('IMAP test error:', error);
      setTestResults(prev => ({ ...prev, imap: 'error' }));
    } finally {
      setTesting(prev => ({ ...prev, imap: false }));
    }
  };

  const updateConfig = (field: keyof EmailConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTestStatusIcon = (result: string, isLoading: boolean) => {
    if (isLoading) {
      return <Icon name="Loader2" size={16} className="animate-spin" />;
    }
    
    switch (result) {
      case 'success':
        return <Icon name="CheckCircle" size={16} className="text-green-600" />;
      case 'error':
        return <Icon name="XCircle" size={16} className="text-red-600" />;
      default:
        return <Icon name="TestTube" size={16} />;
    }
  };

  const getTestStatusText = (result: string, isLoading: boolean) => {
    if (isLoading) return 'Тестирование...';
    
    switch (result) {
      case 'success':
        return 'Подключение успешно';
      case 'error':
        return 'Ошибка подключения';
      default:
        return 'Тестировать подключение';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Загрузка настроек...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Настройки почты</h2>
        <Button 
          onClick={saveEmailSettings}
          disabled={saving}
          className="flex items-center gap-2"
        >
          <Icon name="Save" size={16} />
          {saving ? 'Сохранение...' : 'Сохранить настройки'}
        </Button>
      </div>

      <Tabs defaultValue="smtp" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="smtp">SMTP (Отправка)</TabsTrigger>
          <TabsTrigger value="imap">IMAP (Получение)</TabsTrigger>
        </TabsList>

        <TabsContent value="smtp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Send" size={20} />
                Настройки SMTP
              </CardTitle>
              <p className="text-sm text-gray-600">
                Настройки для отправки писем клиентам
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_host">SMTP сервер</Label>
                  <Input
                    id="smtp_host"
                    value={config.smtp_host}
                    onChange={(e) => updateConfig('smtp_host', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp_port">Порт</Label>
                  <Input
                    id="smtp_port"
                    type="number"
                    value={config.smtp_port}
                    onChange={(e) => updateConfig('smtp_port', parseInt(e.target.value) || 587)}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp_user">Email</Label>
                <Input
                  id="smtp_user"
                  type="email"
                  value={config.smtp_user}
                  onChange={(e) => updateConfig('smtp_user', e.target.value)}
                  placeholder="your-email@gmail.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp_password">Пароль / App Password</Label>
                <Input
                  id="smtp_password"
                  type="password"
                  value={config.smtp_password}
                  onChange={(e) => updateConfig('smtp_password', e.target.value)}
                  placeholder="Пароль приложения"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="smtp_secure"
                  checked={config.smtp_secure}
                  onCheckedChange={(checked) => updateConfig('smtp_secure', checked)}
                />
                <Label htmlFor="smtp_secure">Использовать SSL/TLS</Label>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Button
                  onClick={testSmtpConnection}
                  disabled={testing.smtp || !config.smtp_host || !config.smtp_user}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {getTestStatusIcon(testResults.smtp, testing.smtp)}
                  {getTestStatusText(testResults.smtp, testing.smtp)}
                </Button>
                
                {testResults.smtp === 'success' && (
                  <span className="text-sm text-green-600">✓ SMTP подключение работает</span>
                )}
                {testResults.smtp === 'error' && (
                  <span className="text-sm text-red-600">✗ Проверьте настройки SMTP</span>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imap">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Mail" size={20} />
                Настройки IMAP
              </CardTitle>
              <p className="text-sm text-gray-600">
                Настройки для получения входящих писем от клиентов
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imap_host">IMAP сервер</Label>
                  <Input
                    id="imap_host"
                    value={config.imap_host}
                    onChange={(e) => updateConfig('imap_host', e.target.value)}
                    placeholder="imap.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imap_port">Порт</Label>
                  <Input
                    id="imap_port"
                    type="number"
                    value={config.imap_port}
                    onChange={(e) => updateConfig('imap_port', parseInt(e.target.value) || 993)}
                    placeholder="993"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imap_user">Email</Label>
                <Input
                  id="imap_user"
                  type="email"
                  value={config.imap_user}
                  onChange={(e) => updateConfig('imap_user', e.target.value)}
                  placeholder="your-email@gmail.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imap_password">Пароль / App Password</Label>
                <Input
                  id="imap_password"
                  type="password"
                  value={config.imap_password}
                  onChange={(e) => updateConfig('imap_password', e.target.value)}
                  placeholder="Пароль приложения"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="imap_secure"
                  checked={config.imap_secure}
                  onCheckedChange={(checked) => updateConfig('imap_secure', checked)}
                />
                <Label htmlFor="imap_secure">Использовать SSL/TLS</Label>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Button
                  onClick={testImapConnection}
                  disabled={testing.imap || !config.imap_host || !config.imap_user}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {getTestStatusIcon(testResults.imap, testing.imap)}
                  {getTestStatusText(testResults.imap, testing.imap)}
                </Button>
                
                {testResults.imap === 'success' && (
                  <span className="text-sm text-green-600">✓ IMAP подключение работает</span>
                )}
                {testResults.imap === 'error' && (
                  <span className="text-sm text-red-600">✗ Проверьте настройки IMAP</span>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" size={20} />
            Справка по настройке
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Gmail / Google Workspace:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• SMTP: smtp.gmail.com:587 (TLS) или smtp.gmail.com:465 (SSL)</li>
              <li>• IMAP: imap.gmail.com:993 (SSL)</li>
              <li>• Используйте пароли приложений (App Passwords) вместо основного пароля</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Yandex Mail:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• SMTP: smtp.yandex.ru:587 (TLS)</li>
              <li>• IMAP: imap.yandex.ru:993 (SSL)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Mail.ru:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• SMTP: smtp.mail.ru:587 (TLS)</li>
              <li>• IMAP: imap.mail.ru:993 (SSL)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSettings;