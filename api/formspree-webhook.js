/**
 * Formspree Webhook Handler - Receive form submissions from Formspree and forward to Telegram
 * 
 * Formspree will POST to this endpoint with the following structure:
 * {
 *   "submission": { "name": "...", "phone": "...", ... },
 *   "metadata": { "submission_id": "...", "timestamp": "..." }
 * }
 */

const https = require('https');

function sendTelegramMessage(message) {
  return new Promise((resolve, reject) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return reject(new Error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID'));
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
      },
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ success: true, status: res.statusCode });
        } else {
          reject(new Error(`Telegram API returned ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function formatTelegramMessage(formData) {
  const formatData = (key, value) => {
    if (!value) return '';
    return `<b>${key}</b>: ${value}\n`;
  };

  const message = `📬 <b>新的表单提交</b>\n\n${
    formatData('姓名', formData.name) +
    formatData('电话', formData.phone) +
    formatData('邮箱', formData.email) +
    formatData('公司', formData.company) +
    formatData('咨询内容', formData.message)
  }`;

  return message.trim();
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Parse Formspree webhook payload
    const { submission, metadata } = req.body;

    if (!submission) {
      return res.status(400).json({ error: 'No submission data' });
    }

    // Format and send to Telegram
    const message = formatTelegramMessage(submission);
    await sendTelegramMessage(message);

    res.status(200).json({
      success: true,
      message: 'Form forwarded to Telegram',
      submission_id: metadata?.submission_id,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    
    // Still return 200 to Formspree to prevent retries
    res.status(200).json({
      success: false,
      error: error.message,
    });
  }
};
