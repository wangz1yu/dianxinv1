# Formspree + Telegram 集成指南

这个指南将帮助你设置 Formspree 表单提交到 Telegram 的完整流程。

## 架构

```
用户填写表单 → Formspree 接收 → Webhook 转发到 Vercel API → Telegram Bot API → 你的 Telegram
```

## 前端无需修改

[src/pages/about/Contact.tsx](../src/pages/about/Contact.tsx) 已配置为向 Formspree 提交：
```typescript
const response = await fetch('https://formspree.io/f/mpqjabyr', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify(contactRecord),
});
```

## 后端设置

### 1. 验证环境变量

确保 Vercel 已配置以下环境变量：
- `TELEGRAM_BOT_TOKEN`: 你的 Telegram Bot Token
- `TELEGRAM_CHAT_ID`: 你的 Telegram Chat ID (例如 `5897817017`)

在 Vercel Dashboard 中设置：
1. 进入 Project Settings → Environment Variables
2. 添加 `TELEGRAM_BOT_TOKEN` 和 `TELEGRAM_CHAT_ID`
3. 保存并重新部署

### 2. 部署 Webhook 处理函数

[api/formspree-webhook.js](../api/formspree-webhook.js) 已创建，它会：
- 接收 Formspree 的 POST 请求
- 解析表单数据
- 格式化成漂亮的 Telegram 消息
- 发送到你的 Telegram

Vercel 会自动部署这个 API，地址为：
```
https://dianxinv1.vercel.app/api/formspree-webhook
```

### 3. 在 Formspree 中配置 Webhook

1. 登录 [Formspree Dashboard](https://formspree.io/)
2. 选择你的表单 (mpqjabyr)
3. 进入 **Settings** → **Webhooks**
4. 添加新 Webhook：
   - **Webhook URL**: `https://dianxinv1.vercel.app/api/formspree-webhook`
   - **Events**: 选择 "Submission created"
5. 点击 **Save**

## 测试流程

### 方式 1：通过网站表单

1. 访问 https://www.dianxin.love/about/contact
2. 填写表单并提交
3. Formspree 接收 → 立即发送 Webhook 到你的 API
4. 检查你的 Telegram，应该立即收到一条格式化的消息

### 方式 2：直接测试 Webhook（curl）

```bash
curl -X POST https://dianxinv1.vercel.app/api/formspree-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "submission": {
      "name": "测试用户",
      "phone": "13800138000",
      "email": "test@example.com",
      "company": "测试公司",
      "message": "这是一条测试消息"
    },
    "metadata": {
      "submission_id": "test-123"
    }
  }'
```

预期返回：
```json
{
  "success": true,
  "message": "Form forwarded to Telegram",
  "submission_id": "test-123"
}
```

## Telegram 消息格式

收到的 Telegram 消息会是这样的：

```
📬 新的表单提交

姓名: 张三
电话: 13800138000
邮箱: test@example.com
公司: 测试公司
咨询内容: 这是一条咨询消息
```

## 故障排除

### 收不到 Telegram 消息？

1. **检查环境变量**
   ```bash
   vercel env pull  # 从 Vercel 拉取环境变量
   cat .env.local   # 查看是否有 TELEGRAM_BOT_TOKEN 和 TELEGRAM_CHAT_ID
   ```

2. **检查 Vercel 部署日志**
   - 登录 Vercel Dashboard
   - 选择 dianxinv1 项目
   - 进入 Deployments，查看最新部署的 Logs
   - 搜索 "formspree-webhook" 的错误消息

3. **验证 Bot Token 和 Chat ID**
   ```bash
   # 测试 Bot Token 是否有效
   curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe
   
   # 应该返回类似：
   # {"ok":true,"result":{"id":123456789,"is_bot":true,"first_name":"..."}}
   ```

4. **检查 Formspree Webhook 日志**
   - 登录 Formspree Dashboard
   - 选择表单
   - 进入 Settings → Webhooks
   - 查看最近的请求和响应状态

### Webhook 返回 500 错误？

这通常是由于：
- 环境变量未正确配置
- Telegram Token 无效
- 网络连接问题

查看 Vercel 日志确认具体错误。

## 可选：添加更多字段

如果你想在表单中添加更多字段（例如"城市"、"行业"等），只需：

1. 在 [src/pages/about/Contact.tsx](../src/pages/about/Contact.tsx) 中添加字段
2. 在 [api/formspree-webhook.js](../api/formspree-webhook.js) 的 `formatTelegramMessage` 函数中添加对应的 `formatData` 调用

例如：
```javascript
formatData('城市', formData.city) +
formatData('行业', formData.industry) +
```

## 相关文件

- 前端表单: [src/pages/about/Contact.tsx](../src/pages/about/Contact.tsx)
- Webhook 处理器: [api/formspree-webhook.js](../api/formspree-webhook.js)
- Formspree 表单: https://formspree.io/f/mpqjabyr

## 拓展阅读

- [Formspree Webhooks 文档](https://formspree.io/help/webhooks/)
- [Telegram Bot API 文档](https://core.telegram.org/bots/api)
