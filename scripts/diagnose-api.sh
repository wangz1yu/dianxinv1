#!/bin/bash

# 🔍 诊断 Vercel API 连接问题

echo "🔍 诊断 Vercel API......"
echo "================================"
echo ""

API_URL="https://dianxinv1.vercel.app/api/contact"
ORIGIN="https://www.dianxin.love"

echo "📍 API 地址: $API_URL"
echo "📍 来源域名: $ORIGIN"
echo ""

# 测试 1: 检查 API 是否可访问 (OPTIONS 请求)
echo "测试 1️⃣：检查 CORS 预检..."
curl -i -X OPTIONS "$API_URL" \
  -H "Origin: $ORIGIN" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  2>&1 | head -20

echo ""
echo "================================"
echo ""

# 测试 2: 发送实际的 POST 请求
echo "测试 2️⃣️：发送测试数据..."
curl -i -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Origin: $ORIGIN" \
  -d '{
    "name": "测试",
    "phone": "13800000000",
    "email": "test@example.com",
    "company": "测试公司",
    "message": "这是测试消息"
  }' 2>&1

echo ""
echo "================================"
echo "✅ 诊断完成"
echo ""
echo "📝 请复制上面的输出，查看：" 
echo "  1. HTTP 状态码是什么？"
echo "  2. 是否看到 404 或其他错误？"
echo "  3. CORS 头是否正确？"
