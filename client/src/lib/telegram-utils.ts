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

export const sendDocumentToTelegram = (
  botToken: string,
  chatId: string,
  blob: Blob,
  filename: string,
  caption: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      const form = new FormData();
      form.append('chat_id', chatId);
      // Explicitly create File from Blob for Safari compatibility
      const file = new File([blob], filename, { type: 'application/pdf' });
      form.append('document', file);
      form.append('caption', caption);
      form.append('parse_mode', 'Markdown');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.telegram.org/bot${botToken}/sendDocument`);
      xhr.onload = () => resolve(xhr.status >= 200 && xhr.status < 300);
      xhr.onerror = () => resolve(false);
      xhr.send(form);
    } catch (error) {
      console.error('Error sending document to Telegram:', error);
      resolve(false);
    }
  });
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
