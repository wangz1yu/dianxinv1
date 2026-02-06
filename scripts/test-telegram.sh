#!/bin/bash

# Telegram Bot Connection Test Script
# 用于测试 Telegram Bot 连接和消息发送

set -e

echo "🤖 Telegram Bot 连接测试"
echo "========================="
echo ""

# 检查环境变量
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
  echo "❌ 错误：TELEGRAM_BOT_TOKEN 环境变量未设置"
  echo "请设置：export TELEGRAM_BOT_TOKEN=your_token_here"
  exit 1
fi

if [ -z "$TELEGRAM_CHAT_ID" ]; then
  echo "❌ 错误：TELEGRAM_CHAT_ID 环境变量未设置"
  echo "请设置：export TELEGRAM_CHAT_ID=your_chat_id_here"
  exit 1
fi

echo "✅ 环境变量已设置"
echo "   Token (前10字符): ${TELEGRAM_BOT_TOKEN:0:10}***"
echo "   Chat ID: $TELEGRAM_CHAT_ID"
echo ""

# 测试 1：获取 Bot 信息
echo "📋 测试 1：获取 Bot 信息..."
BOT_INFO=$(curl -s -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe)
echo "$BOT_INFO" | grep -q "ok" && echo "✅ Bot 连接成功" || echo "❌ Bot 连接失败"
echo ""

# 测试 2：发送测试消息
echo "📤 测试 2：发送测试消息..."
SEND_RESULT=$(curl -s -X POST https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage \
  -H "Content-Type: application/json" \
  -d "{
    \"chat_id\": \"$TELEGRAM_CHAT_ID\",
    \"text\": \"✅ <b>Telegram Bot 配置成功！</b>\n\n这是来自您的网站的测试消息。\n\n时间：$(date '+%Y-%m-%d %H:%M:%S')\",
    \"parse_mode\": \"HTML\"
  }")

if echo "$SEND_RESULT" | grep -q "ok.*true"; then
  echo "✅ 消息发送成功！请检查 Telegram 聊天。"
else
  echo "❌ 消息发送失败"
  echo "响应：$SEND_RESULT"
  exit 1
fi

echo ""
echo "========================="
echo "✅ 所有测试通过！Bot 已准备就绪。"
echo ""
echo "📝 建议："
echo "1. 确认在您的 Telegram 聊天中收到了消息"
echo "2. 在网站上提交联系表单进行完整测试"
echo "3. 查看 Telegram 通知格式是否符合要求"
