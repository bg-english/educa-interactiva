import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { findStudentByEmail } from '@/lib/students';
import { sendToTelegram } from '@/lib/telegram-utils';

export default function Login() {
  const { setCurrentStudent } = useUser();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const student = findStudentByEmail(email);
    if (!student) {
      setError('Email not found. Please check and try again.');
      return;
    }

    setLoading(true);

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    if (botToken && chatId && student.group !== 'Teacher') {
      const msg = `📚 *${student.name}* (${student.group}) has logged in to the workshop.`;
      sendToTelegram(botToken, chatId, msg).catch(() => {});
    }

    // Navigate after firing notification (no await — avoids unmounted state update)
    setCurrentStudent(student);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="p-8 bg-white border-2 border-blue-300 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-blue-700">EducaInteractiva</h1>
          <p className="text-gray-500 mt-1">Health & Faith Workshop</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter your school email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="yourname@redboston.edu.co"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              autoComplete="email"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          <Button
            onClick={handleLogin}
            disabled={!email.trim() || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
          >
            {loading ? 'Logging in...' : 'Start Workshop →'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
