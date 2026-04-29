export interface TelegramResult {
  studentName: string;
  scores: {
    wordGames: number;
    nutrition: number;
    nervousSystem: number;
    eatingDisorders: number;
    cnsDisorders: number;
    biblicalIntegration: number;
  };
  totalScore: number;
  completionDate: string;
}

export const generateTelegramMessage = (data: TelegramResult): string => {
  const message = `
🎓 *EducaInteractiva Workshop - Certificate of Completion* 🎓

👤 *Student:* ${data.studentName}
📅 *Date:* ${data.completionDate}

📊 *Module Scores:*
🎮 Word Games: ${data.scores.wordGames}%
🍽️ Nutrition: ${data.scores.nutrition}%
🧠 Nervous System: ${data.scores.nervousSystem}%
🚫 Eating Disorders: ${data.scores.eatingDisorders}%
🏥 CNS Diseases: ${data.scores.cnsDisorders}%
📖 Biblical Integration: ${data.scores.biblicalIntegration}%

🏆 *Total Score: ${data.totalScore}%*

"Your body is a temple of the Holy Spirit" - 1 Corinthians 6:19

✨ Congratulations on completing the workshop! ✨
  `.trim();

  return message;
};

export const sendToTelegram = async (
  botToken: string,
  chatId: string,
  message: string
): Promise<boolean> => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
};

export const openTelegramShare = (message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const telegramUrl = `https://t.me/share/url?url=&text=${encodedMessage}`;
  window.open(telegramUrl, '_blank');
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};
