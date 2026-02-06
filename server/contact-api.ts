import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 配置（允许前端跨域请求）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

interface ContactData {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  timestamp?: string;
}

async function sendTelegramMessage(data: ContactData): Promise<boolean> {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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

    console.log('Telegram message sent successfully');
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

// Contact form endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
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
        error: '请填写所有必填字段（姓名、电话、咨询内容）',
      });
    }

    // Validate email format if provided
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return res.status(400).json({
        error: '邮箱格式不正确',
      });
    }

    // Validate phone format (basic check)
    if (!/^\d{10,20}$/.test(data.phone.replace(/\s|-|\+/g, ''))) {
      return res.status(400).json({
        error: '电话号码格式不正确',
      });
    }

    // Send Telegram notification
    const telegramSent = await sendTelegramMessage(data);

    if (!telegramSent) {
      console.warn('Failed to send Telegram notification, but form was valid');
    }

    return res.status(200).json({
      success: true,
      message: '表单已提交成功',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      error: '服务器错误，请稍后重试',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Contact API server running on port ${PORT}`);
});

export default app;
