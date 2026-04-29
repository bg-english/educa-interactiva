import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { useLocation } from 'wouter';
import { downloadCertificate, generateCertificatePDFBlob, CertificateData } from '@/lib/pdf-generator';
import { generateTelegramMessage, openTelegramShare, copyToClipboard, sendDocumentToTelegram } from '@/lib/telegram-utils';
import { Copy, Download, Send } from 'lucide-react';

export default function Results() {
  const { moduleScores, currentStudent } = useUser();
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [sentToTeacher, setSentToTeacher] = useState<'pending' | 'sent' | 'failed' | null>(null);

  const studentName = currentStudent?.name || 'Student';

  const calculateTotalScore = (): number => {
    const scores = Object.values(moduleScores);
    if (scores.length === 0) return 0;
    const total = scores.reduce((sum: number, score: number) => sum + score, 0);
    return Math.round(total / scores.length);
  };

  const totalScore = calculateTotalScore();
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certificateData: CertificateData = {
    studentName,
    scores: {
      wordGames: moduleScores.wordGames || 0,
      nutrition: moduleScores.nutrition || 0,
      nervousSystem: moduleScores.nervousSystem || 0,
      eatingDisorders: moduleScores.eatingDisorders || 0,
      cnsDisorders: moduleScores.cnsDisorders || 0,
      biblicalIntegration: moduleScores.biblicalIntegration || 0,
    },
    totalScore,
    completionDate,
  };

  const telegramMessage = generateTelegramMessage({
    studentName,
    scores: certificateData.scores,
    totalScore,
    completionDate,
  });

  // Auto-send PDF + results to teacher on load
  useEffect(() => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    if (botToken && chatId && currentStudent?.group !== 'Teacher') {
      setSentToTeacher('pending');
      const pdfBlob = generateCertificatePDFBlob(certificateData);
      const filename = `Certificate_${studentName.replace(/\s+/g, '_')}.pdf`;
      const caption = `📊 *Results - ${studentName}* (${currentStudent?.group})\n🏆 Total Score: ${totalScore}%\n📅 ${completionDate}`;
      sendDocumentToTelegram(botToken, chatId, pdfBlob, filename, caption).then((ok) => {
        setSentToTeacher(ok ? 'sent' : 'failed');
      });
    }
  }, []);

  const handleDownloadPDF = () => {
    downloadCertificate(certificateData);
  };

  const handleShareTelegram = () => {
    openTelegramShare(telegramMessage);
  };

  const handleCopyMessage = async () => {
    const success = await copyToClipboard(telegramMessage);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartOver = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Workshop Complete!</h1>
          <p className="text-lg text-gray-600">Excellent work, {studentName}!</p>
          {currentStudent?.group && (
            <p className="text-sm text-gray-400">{currentStudent.group}</p>
          )}
        </div>

        {/* Score Summary */}
        <Card className="p-8 bg-white border-2 border-blue-300 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
              <p className="text-sm font-semibold text-gray-600">Word Games</p>
              <p className="text-3xl font-bold text-green-700">{moduleScores.wordGames || 0}%</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg">
              <p className="text-sm font-semibold text-gray-600">Nutrition</p>
              <p className="text-3xl font-bold text-orange-700">{moduleScores.nutrition || 0}%</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
              <p className="text-sm font-semibold text-gray-600">Nervous System</p>
              <p className="text-3xl font-bold text-blue-700">{moduleScores.nervousSystem || 0}%</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg">
              <p className="text-sm font-semibold text-gray-600">Eating Disorders</p>
              <p className="text-3xl font-bold text-red-700">{moduleScores.eatingDisorders || 0}%</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
              <p className="text-sm font-semibold text-gray-600">CNS Diseases</p>
              <p className="text-3xl font-bold text-purple-700">{moduleScores.cnsDisorders || 0}%</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
              <p className="text-sm font-semibold text-gray-600">Biblical Integration</p>
              <p className="text-3xl font-bold text-amber-700">{moduleScores.biblicalIntegration || 0}%</p>
            </div>
          </div>

          {/* Total Score */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <p className="text-white text-sm font-semibold mb-2">Total Score</p>
            <p className="text-5xl font-bold text-white">{totalScore}%</p>
          </div>
        </Card>

        {/* Biblical Reflection */}
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 mb-8">
          <h3 className="text-xl font-bold text-amber-700 mb-4">Biblical Reflection</h3>
          <div className="space-y-4 text-gray-700">
            <p className="italic">
              "Your body is a temple of the Holy Spirit who is in you, whom you have from God, and that you are not your own." - 1 Corinthians 6:19
            </p>
            <p>
              Through this workshop, you've learned about nutrition, the nervous system, eating disorders, and CNS diseases. You've also explored how biblical principles guide us toward health, compassion, and community care. Remember that taking care of your body is an act of worship and stewardship.
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Button
            onClick={handleDownloadPDF}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download Certificate PDF
          </Button>

          <Button
            onClick={handleShareTelegram}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Share on Telegram
          </Button>
        </div>

        {/* Copy Message */}
        <Card className="p-4 bg-gray-50 border-2 border-gray-300 mb-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-600 mb-2">Telegram Message:</p>
              <div className="p-3 bg-white rounded border border-gray-300 text-xs text-gray-700 max-h-32 overflow-y-auto">
                {telegramMessage}
              </div>
            </div>
            <Button onClick={handleCopyMessage} variant="outline" className="self-end" title="Copy message">
              <Copy size={20} />
            </Button>
          </div>
          {copied && <p className="text-xs text-green-600 font-semibold mt-2">✓ Copied to clipboard!</p>}
        </Card>

        {/* Teacher notification status */}
        {sentToTeacher && (
          <div className={`text-center text-sm font-semibold mb-4 ${sentToTeacher === 'sent' ? 'text-green-600' : sentToTeacher === 'failed' ? 'text-red-500' : 'text-gray-400'}`}>
            {sentToTeacher === 'pending' && '⏳ Sending results to teacher...'}
            {sentToTeacher === 'sent' && '✓ Results and certificate sent to teacher'}
            {sentToTeacher === 'failed' && '⚠ Could not send results to teacher'}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleStartOver}
            variant="outline"
            className="border-gray-400 text-gray-700 hover:bg-gray-100 font-bold py-3 px-6"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
