# 联系表单 + Telegram 通知集成指南

## 📌 概述
这个指南将帮您配置一个完整的联系表单，当用户提交时会收到 Telegram 通知。

---

## 🤖 第一步：创建 Telegram Bot

### 1️⃣ 创建 Bot
1. 在 Telegram 中搜索 **@BotFather**
2. 发送命令 `/start`，然后 `/newbot`
3. 按照指引输入 Bot 名称和用户名
4. **保存返回的 Token**（形如：`1234567890:ABCdefGHIjklmnoPQRstuvWXYZ`）

### 2️⃣ 获取 Chat ID
1. 在 Telegram 中搜索 **@userinfobot**
2. 发送任何消息，获取您的 User ID
3. 将 Bot 加入一个群聊或私聊，获取 Group Chat ID（通常是负数，如：`-1001234567890`）

>  **推荐**：创建一个专门的私密群聊或频道来接收通知，然后将 Bot 加入该群聊。

---

## 🚀 第二步：选择部署方案

### **方案 A：Vercel 部署（推荐）**

#### 前置条件
- 项目已部署在 Vercel 上，或准备部署
- 有 Vercel 账户

#### 步骤

1. **配置环境变量**
   - 在 Vercel Dashboard 找到您的项目
   - 进入 `Settings` → `Environment Variables`
   - 添加以下变量：
     ```
     TELEGRAM_BOT_TOKEN = 1234567890:ABCdefGHIjklmnoPQRstuvWXYZ
     TELEGRAM_CHAT_ID = -1001234567890
     ```

2. **无需额外配置**
   - API 文件已准备好：`/api/contact.ts`
   - Vercel 会自动识别并部署

3. **测试**
   - 访问您的网站，提交联系表单
   - 应该在 2-3 秒内收到 Telegram 通知

---

### **方案 B：自建 Node.js 服务器**

#### 前置条件
- Node.js 16+ 已安装
- 拥有服务器或 VPS（如 AWS、Azure、DigitalOcean 等）

#### 步骤

1. **安装依赖**
   ```bash
   npm install express dotenv cors
   npm install -D @types/express typescript ts-node
   ```

2. **创建环境配置文件** `.env`
   ```bash
   PORT=3001
   TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklmnoPQRstuvWXYZ
   TELEGRAM_CHAT_ID=-1001234567890
   FRONTEND_URL=https://yourdomain.com
   ```

3. **启动服务器**
   ```bash
   npx ts-node server/contact-api.ts
   ```
   或编译后运行：
   ```bash
   npx tsc server/contact-api.ts --outDir dist
   node dist/server/contact-api.js
   ```

4. **在前端更新 API 地址**
   编辑 [src/pages/about/Contact.tsx](../src/pages/about/Contact.tsx)，修改：
   ```jsx
   // 改为：
   const response = await fetch('https://your-server.com/api/contact', {
     // ...
   });
   ```

5. **配置 PM2（可选，用于后台运行）**
   ```bash
   npm install -g pm2
   pm2 start server/contact-api.ts --name "contact-api"
   pm2 save
   pm2 startup
   ```

---

### **方案 C：使用 Netlify Functions**

#### 步骤
1. 在 Netlify 中连接您的 GitHub 仓库
2. 创建 `netlify/functions/contact.ts`，代码与 Vercel 的 API 类似
3. 在 Netlify Dashboard 配置环境变量：`TELEGRAM_BOT_TOKEN`、`TELEGRAM_CHAT_ID`
4. 部署后，前端的 `/api/contact` 会自动映射到 `/.netlify/functions/contact`

---

## 📤 前端表单配置

前端已更新，包含：
- ✅ 表单验证
- ✅ 加载状态反馈
- ✅ 错误消息显示
- ✅ 成功提示
- ✅ 本地备份（localStorage）

**文件位置**：[src/pages/about/Contact.tsx](../src/pages/about/Contact.tsx)

---

## 🧪 测试 Telegram 接收

1. **测试 Token 有效性**
   ```bash
   curl -X POST https://api.telegram.org/botYOUR_TOKEN/getMe
   ```

2. **测试发送消息**
   ```bash
   curl -X POST https://api.telegram.org/botYOUR_TOKEN/sendMessage \
     -H "Content-Type: application/json" \
     -d '{
       "chat_id": "YOUR_CHAT_ID",
       "text": "测试消息"
     }'
   ```

3. **提交表单测试**
   - 访问 `/about/contact` 页面
   - 填写表单并提交
   - 检查是否收到 Telegram 通知

---

## 🔐 安全建议

1. **环境变量隐私**
   - ❌ 不要把 Token 提交到 Git
   - ✅ 使用 `.env.local` 和 `.gitignore`

2. **速率限制**
   建议添加防止滥用：
   ```typescript
   // 在 API 中添加
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 分钟
     max: 5 // 最多 5 个请求
   });
   
   app.post('/api/contact', limiter, async (req, res) => {
     // ...
   });
   ```

3. **输入验证**
   - ✅ 已在 API 中验证必填字段
   - ✅ 已验证邮箱和电话格式

---

## 📊 数据备份

除了 Telegram 通知，表单数据还会：
1. **保存在 localStorage**：用户端本地保存
2. **可选**：发送到数据库（MongoDB、Firebase 等）

### 扩展：保存到数据库

```typescript
// 在 API 中添加
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

async function saveToDatabase(data: ContactData) {
  const db = client.db('dianxin');
  const collection = db.collection('contacts');
  
  await collection.insertOne({
    ...data,
    createdAt: new Date(),
  });
}
```

---

## 🛠️ 故障排除

| 问题 | 解决方案 |
|------|----------|
| 提交后没收到 Telegram 通知 | 检查 Token 和 Chat ID 是否正确；确保 Bot 已加入聊天 |
| 400 错误：必填字段缺少 | 确保三个必填字段（姓名、电话、内容）都填写了 |
| 500 错误 | 检查服务器日志；确认互联网连接 |
| 表单没提交成功 | 打开浏览器控制台查看错误信息；检查 CORS 配置 |

---

## 📞 下一步

- [ ] 获取 Telegram Bot Token
- [ ] 获取 Chat ID
- [ ] 选择部署方案（Vercel/自建/Netlify）
- [ ] 配置环境变量
- [ ] 测试表单提交
- [ ] 在网站上线

祝您配置顺利！有问题可参考 [Telegram Bot API 文档](https://core.telegram.org/bots/api)
