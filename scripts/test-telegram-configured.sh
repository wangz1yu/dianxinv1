#!/bin/bash

# 🤖 Telegram Bot 连接测试脚本
# 您的信息已预置，直接运行即可

echo "🤖 Telegram Bot 连接测试"
echo "========================="
echo ""

# 预置的环境变量
TELEGRAM_BOT_TOKEN="8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs"
TELEGRAM_CHAT_ID="5897817017"

echo "✅ 使用的凭证："
echo "   Bot Token (前10字符): ${TELEGRAM_BOT_TOKEN:0:10}***"
echo "   Chat ID: $TELEGRAM_CHAT_ID"
echo ""

# 测试 1：获取 Bot 信息
echo "📋 测试 1：检查 Bot Token 有效性..."
BOT_INFO=$(curl -s -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe)

if echo "$BOT_INFO" | grep -q '"ok":true'; then
  BOT_NAME=$(echo "$BOT_INFO" | grep -o '"username":"[^"]*' | cut -d'"' -f4)
  echo "✅ Bot 连接成功！"
  echo "   Bot 名称: @$BOT_NAME"
else
  echo "❌ Bot 连接失败！"
  echo "   错误：$BOT_INFO"
  exit 1
fi
echo ""

# 测试 2：发送测试消息
echo "📤 测试 2：发送测试消息..."
SEND_RESULT=$(curl -s -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage \
  -H "Content-Type: application/json" \
  -d "{
    \"chat_id\": \"$TELEGRAM_CHAT_ID\",
    \"text\": \"✅ <b>Telegram Bot 配置测试成功！</b>\n\n来自：dianxinv1 网站\n时间：$(date '+%Y-%m-%d %H:%M:%S')\",
    \"parse_mode\": \"HTML\"
  }")

if echo "$SEND_RESULT" | grep -q '"ok":true'; then
  echo "✅ 消息发送成功！"
  echo ""
  echo "📬 请检查您的 Telegram："
  echo "   用户名: @wangz1yu"
  echo "   ID: 5897817017"
  echo ""
  echo "如果 1-3 秒内没收到消息，请检查：" 
  echo "  1. Telegram 是否已打开且已登录"
  echo "  2. 检查设置 → 通知，确保通知已启用"
else
  echo "❌ 消息发送失败！"
  echo "   错误：$SEND_RESULT"
  echo ""
  echo "可能的原因："
  echo "  • Chat ID 不正确（应为 5897817017）"
  echo "  • Bot 未被正确授权"
  exit 1
fi

echo ""
echo "========================="
echo "✅ 所有测试通过！Bot 已准备就绪。"
echo ""
echo "📝 后续步骤："
echo "1. 创建 Vercel 账户 (https://vercel.com)"
echo "2. 部署您的 dianxinv1 应用"
echo "3. 配置环境变量 (Token 和 Chat ID)"
echo "4. 更新 src/pages/about/Contact.tsx 中的 API 地址"
echo "5. 提交到 GitHub，网站自动部署"
echo ""
echo "📚 详细指南："
echo "  - https://github.com/wangz1yu/dianxinv1/blob/main/GITHUB_PAGES_QUICK_START.md"
echo "  - https://github.com/wangz1yu/dianxinv1/blob/main/GITHUB_PAGES_SETUP.md"
