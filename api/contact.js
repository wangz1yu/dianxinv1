// Telegram Bot API endpoint for contact form
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

async function sendTelegramMessage(data) {
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

export default async function handler(req, res) {
  // Get origin from request
  const origin = req.headers.origin || '';
  
  // Allow specific domains
  const allowedOrigins = [
    'https://www.dianxin.love',
    'https://dianxin.love',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ];
  
  // Set CORS headers
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.dianxin.love');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = {
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
      message: '表单已提交成功'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      error: '服务器错误，请稍后重试' 
    });
  }
}
