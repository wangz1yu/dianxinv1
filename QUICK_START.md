# ⚡ 快速开始指南 - Contact Form + Telegram 通知

## 🎯 5 分钟快速配置

### 步骤 1：创建 Telegram Bot（2 分钟）

```bash
# 1. 打开 Telegram，搜索 @BotFather
# 2. 发送命令：/newbot
# 3. 输入 Bot 名称（例如：MyCompanyBot）
# 4. 输入用户名（例如：mycompany_contact_bot）
# 5. 复制返回的 Token，形如：
#    1234567890:ABCdefGHIjklmnoPQRstuvWXYZ
```

### 步骤 2：获取 Chat ID（2 分钟）

```bash
# 方法 1：个人聊天（最简单）
# 1. Telegram 搜索 @userinfobot
# 2. 发送任何消息，获取您的 ID（如 123456789）

# 方法 2：群组/频道（推荐）
# 1. 创建一个新的私密群组或频道
# 2. 将 Bot 添加为管理员
# 3. 群组 Chat ID 通常是负数（如 -1001234567890）
```

### 步骤 3：选择部署方案（1 分钟）

#### ✅ **Vercel 部署（推荐）**
```bash
# 1. 项目已在 Vercel 上，或连接 GitHub 仓库
# 2. Vercel Dashboard → Project Settings → Environment Variables
# 3. 添加两个变量：
#    名称: TELEGRAM_BOT_TOKEN
#    值: 1234567890:ABCdefGHIjklmnoPQRstuvWXYZ
#
#    名称: TELEGRAM_CHAT_ID
#    值: -1001234567890
# 4. 保存并重新部署，完成！
```

#### 🔄 **本地测试（开发环境）**
```bash
# 1. 创建 .env.local 文件（复制 .env.example）
cp .env.example .env.local

# 2. 编辑 .env.local，填入您的 Token 和 Chat ID
nano .env.local

# 3. 运行开发服务器
npm run dev

# 4. 访问 http://localhost:5173/about/contact 测试表单
```

#### 🖥️ **自建 Node.js 服务器**
```bash
# 1. 安装依赖
npm install express dotenv

# 2. 创建 .env 文件
cp .env.example .env
# 编辑并填入 Token 和 Chat ID

# 3. 启动服务器
npx ts-node server/contact-api.ts

# 4. 修改前端中的 API 地址：
# /api/contact → https://your-server.com/api/contact
```

---

## 📨 测试表单

### 测试 Telegram 连接
```bash
# 设置环境变量
export TELEGRAM_BOT_TOKEN="your_token"
export TELEGRAM_CHAT_ID="your_chat_id"

# 运行测试脚本
chmod +x scripts/test-telegram.sh
./scripts/test-telegram.sh
```

### 在网站上测试
1. 访问 `/about/contact` 页面
2. 填写表单：
   - 姓名：测试用户
   - 电话：13800000000
   - 邮箱：test@example.com
   - 公司：测试公司
   - 咨询内容：这是测试消息

3. 点击"提交咨询"
4. **立即检查 Telegram**，应该收到通知！

---

## 📋 检查清单

- [ ] 创建了 Telegram Bot（有 Token）
- [ ] 获取了 Chat ID
- [ ] 选择了部署方案
- [ ] 配置了环境变量
- [ ] 测试了 Bot 连接
- [ ] 在网站提交了测试表单
- [ ] 在 Telegram 收到了通知

---

## 🚨 常见问题

**Q：提交表单后没收到通知？**
A：
1. 检查 Token 是否正确：`TELEGRAM_BOT_TOKEN=...`
2. 检查 Chat ID 是否正确：`TELEGRAM_CHAT_ID=...`
3. 确保 Bot 已添加到聊天中
4. 查看浏览器控制台是否有错误
5. 运行测试脚本：`./scripts/test-telegram.sh`

---

**Q：表单提交后显示错误？**
A：
1. 打开浏览器开发者工具 (F12)
2. 查看 Network 标签中的请求响应
3. 查看 Console 标签中的日志
4. 检查 API 服务是否运行

---

**Q：如何获取群组的 Chat ID？**
A：
1. 创建或选择一个群组
2. 将下面这个 Bot 添加到群组：@getidsbot
3. 向群组发送消息，会收到 Chat ID

---

## 📚 文件结构

```
dianxinv1/
├── src/pages/about/Contact.tsx    ← 联系表单页面（已更新）
├── api/contact.ts                 ← Vercel API（自动部署）
├── server/contact-api.ts          ← Node.js 服务器（自建用）
├── scripts/test-telegram.sh       ← 测试脚本
├── .env.example                   ← 环境变量模板
└── TELEGRAM_SETUP_GUIDE.md        ← 详细设置指南
```

---

## 🎨 通知样式

Telegram 通知包含：
- ✅ 访客信息（姓名、电话、邮箱、公司）
- ✅ 咨询内容
- ✅ 提交时间戳
- ✅ HTML 格式化（便于阅读）

---

##  📞 需要帮助？

1. 查看详细指南：[TELEGRAM_SETUP_GUIDE.md](TELEGRAM_SETUP_GUIDE.md)
2. 测试 Telegram 连接：`./scripts/test-telegram.sh`
3. 检查浏览器控制台错误（F12）
4. 查看服务器日志

🎉 完成配置后，您就能实时接收网站访客的咨询信息了！
