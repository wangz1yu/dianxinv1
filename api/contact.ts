import { VercelRequest, VercelResponse } from '@vercel/node';

// 从环境变量获取 Telegram 配置
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface ContactData {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  timestamp?: string;
}

async function sendTelegramMessage(data: ContactData): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials not configured');
    return false;
  }

  const messageText = `
📬 <b>新的联系表单提交</b>

👤 <b>姓名：</b> ${escapeHtml(data.name)}
📱 <b>电话：</b> ${escapeHtml(data.phone)}
📧 <b>邮箱：</b> ${escapeHtml(data.email)}
🏢 <b>公司：</b> ${escapeHtml(data.company || '未填写')}
📝 <b>咨询内容：</b>
${escapeHtml(data.message)}

⏰ <b>提交时间：</b> ${new Date(data.timestamp || Date.now()).toLocaleString('zh-CN')}
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return false;
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: ContactData = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      company: req.body.company,
      message: req.body.message,
      timestamp: req.body.timestamp,
    };

    // Validate required fields
    if (!data.name || !data.phone || !data.message) {
      return res.status(400).json({ 
        error: '请填写所有必填字段（姓名、电话、咨询内容）' 
      });
    }

    // Send Telegram notification
    const telegramSent = await sendTelegramMessage(data);

    if (!telegramSent) {
      // Still return 200 if form is valid, but log the Telegram error
      console.warn('Failed to send Telegram notification, but form was valid');
    }

    return res.status(200).json({ 
      success: true,
      message: '表单已提交成功'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      error: '服务器错误，请稍后重试' 
    });
  }
}
