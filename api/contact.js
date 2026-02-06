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
    console.error('Token:', TELEGRAM_BOT_TOKEN ? 'Set' : 'Not set');
    console.error('ChatID:', TELEGRAM_CHAT_ID ? 'Set' : 'Not set');
    return false;
  }

  const messageText = `📬 <b>新的联系表单提交</b>

👤 <b>姓名：</b> ${escapeHtml(data.name)}
📱 <b>电话：</b> ${escapeHtml(data.phone)}
📧 <b>邮箱：</b> ${escapeHtml(data.email || '未填写')}
🏢 <b>公司：</b> ${escapeHtml(data.company || '未填写')}
📝 <b>咨询内容：</b>
${escapeHtml(data.message)}

⏰ <b>提交时间：</b> ${new Date(data.timestamp || Date.now()).toLocaleString('zh-CN')}`;

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

module.exports = async (req, res) => {
  // Set CORS headers
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://www.dianxin.love',
    'https://dianxin.love',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.dianxin.love');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '3600');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }

  try {
    const { name, phone, email, company, message, timestamp } = req.body;

    // Validate required fields
    if (!name || !phone || !message) {
      return res.status(400).json({
        error: '请填写所有必填字段（姓名、电话、咨询内容）'
      });
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        error: '邮箱格式不正确'
      });
    }

    // Validate phone format
    const cleanPhone = phone.replace(/\s|-|\+/g, '');
    if (!/^\d{10,20}$/.test(cleanPhone)) {
      return res.status(400).json({
        error: '电话号码格式不正确'
      });
    }

    const data = {
      name,
      phone,
      email: email || '',
      company: company || '',
      message,
      timestamp: timestamp || new Date().toISOString()
    };

    // Send Telegram notification
    const telegramSent = await sendTelegramMessage(data);

    return res.status(200).json({
      success: true,
      message: '表单已提交成功',
      telegramNotified: telegramSent
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      error: '服务器错误，请稍后重试',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

