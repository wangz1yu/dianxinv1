# 🎯 GitHub Pages + Telegram Bot 完整配置指南

## ✅ 您已有的信息

| 项目 | 值 |
|------|---|
| 部署平台 | GitHub Pages |
| Bot Token | `8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs` |
| Bot 用户名 | `@dianxinweb_bot` |
| Telegram ID | `5897817017` |
| 用户名 | @wangz1yu |

---

## 🔴 重要：GitHub Pages 的限制

GitHub Pages 是**纯静态网站托管**，不能运行后端代码。
因此，**前端在 GitHub Pages，后端 API 需要在其他地方运行**。

### 解决方案架构
```
用户提交表单 (GitHub Pages 前端)
         ↓
    调用后端 API
         ↓
  三选一后端方案：
  ├─ Vercel Functions (推荐，最简单)
  ├─ Netlify Functions
  └─ 自建 Node.js 服务器
         ↓
   调用 Telegram API
         ↓
  📬 您的 Telegram 收到通知
```

---

## 🚀 方案选择

### 📍 方案 A：Vercel Functions（⭐ 推荐）

**优点：**
- ✅ 简单，无需维护
- ✅ 免费额度充足
- ✅ 快速部署
- ✅ 自动扩展

**步骤：**

#### 1️⃣ 创建 Vercel 项目

Option A1：直接用现有 GitHub 仓库
```bash
# 在 Vercel 官网连接您的 GitHub 仓库
# https://vercel.com
# 导入您的 dianxinv1 仓库
# Vercel 会自动识别 api/ 目录
```

Option A2：分离创建（推荐）
```bash
# 创建一个新的 Vercel 项目仅用于 API
# 在 Vercel 中创建一个新项目
# 上传我们创建的 api/contact.ts
```

#### 2️⃣ 配置环境变量

在 Vercel Dashboard 中：
```
Project → Settings → Environment Variables

添加两个变量：
  TELEGRAM_BOT_TOKEN = 8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs
  TELEGRAM_CHAT_ID = 5897817017
```

#### 3️⃣ 获取 API 地址

Vercel 会给您一个 URL，例如：
```
https://your-vercel-project.vercel.app/api/contact
```

#### 4️⃣ 更新前端代码

编辑 `src/pages/about/Contact.tsx`，修改 API 地址：

**找到这行：**
```typescript
const response = await fetch('/api/contact', {
```

**改为：**
```typescript
const response = await fetch('https://your-vercel-project.vercel.app/api/contact', {
```

#### 5️⃣ 部署前端

```bash
# GitHub Pages 自动部署（推送到 GitHub）
git add .
git commit -m "Update API endpoint for Vercel"
git push origin main
```

---

### 📍 方案 B：Netlify Functions

**优点：**
- ✅ 与前端部署一起
- ✅ 自动环境变量
- ✅ 一体化部署

**步骤：**

#### 1️⃣ 在您的仓库中创建 Netlify 函数

```bash
# 创建目录
mkdir -p netlify/functions

# 创建函数文件（复制 api/contact.ts 的代码）
touch netlify/functions/contact.ts
```

#### 2️⃣ 在 Netlify Dashboard 配置

```
Site → Build & deploy → Environment

添加环境变量：
  TELEGRAM_BOT_TOKEN = 8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs
  TELEGRAM_CHAT_ID = 5897817017
```

#### 3️⃣ 更新前端

在 `src/pages/about/Contact.tsx` 中：
```typescript
const response = await fetch('/.netlify/functions/contact', {
```

---

### 📍 方案 C：自建 Node.js 服务器

如果您有自己的服务器/VPS，可以部署 `server/contact-api.ts`

```bash
# 1. 上传服务器
scp -r server/ user@your-server:/path/

# 2. 在服务器上配置 .env
TELEGRAM_BOT_TOKEN=8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs
TELEGRAM_CHAT_ID=5897817017

# 3. 启动服务
npx ts-node server/contact-api.ts

# 4. 更新前端 API 地址
# /api/contact → https://your-server.com/api/contact
```

---

## 🎯 推荐方案：Vercel + GitHub Pages

由于您已经在 GitHub Pages，**最简单的做法是用 Vercel 部署后端 API**。

### 快速步骤（10 分钟）

#### 步骤 1：创建 Vercel 账户（免费）
```
https://vercel.com
用 GitHub 账户登录
```

#### 步骤 2：部署 API

**方式 A：用现有仓库**
```
1. Vercel Dashboard → New Project
2. Import Git Repository → 选择 dianxinv1
3. Framework: Other（因为已有 api/ 目录）
4. Deploy
```

**方式 B：新建仓库只放 API**
```bash
# 假设您在 /tmp 创建
mkdir dianxin-api
cd dianxin-api

# 复制 api 和 package.json 相关
cp -r /path/to/dianxinv1/api .
cp /path/to/dianxinv1/.env.example .env

# 初始化 git
git init
git add .
git commit -m "Initial API setup"

# 推送到 GitHub
git remote add origin https://github.com/yourusername/dianxin-api.git
git push -u origin main

# 在 Vercel 中 import 这个新仓库
```

#### 步骤 3：配置环境变量
```
Vercel Dashboard → Project Settings → Environment Variables

添加：
  Key: TELEGRAM_BOT_TOKEN
  Value: 8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs
  Environments: Production, Preview, Development
  
  Key: TELEGRAM_CHAT_ID
  Value: 5897817017
  Environments: Production, Preview, Development
```

#### 步骤 4：保存并部署
部署完成后，Vercel 会给你一个 URL，例如：
```
https://dianxin-api.vercel.app
```

#### 步骤 5：更新您的网站代码

编辑 `src/pages/about/Contact.tsx`：

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    const contactRecord = {
      ...formData,
      timestamp: new Date().toISOString(),
    };
    
    // 👇 改这里，替换成您的 Vercel API URL
    const response = await fetch('https://dianxin-api.vercel.app/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactRecord),
    });

    if (!response.ok) {
      throw new Error('提交失败，请稍后重试');
    }

    // 其余代码保持不变...
  } catch (err) {
    setError(err instanceof Error ? err.message : '提交失败，请检查网络连接');
    console.error('Form submission error:', err);
  } finally {
    setLoading(false);
  }
};
```

#### 步骤 6：推送到 GitHub

```bash
cd /workspaces/dianxinv1

# 修改代码后
git add src/pages/about/Contact.tsx
git commit -m "Update API endpoint to Vercel"
git push origin main

# GitHub Pages 会自动重新部署
# 大约 1-2 分钟后网站更新
```

---

## 🧪 测试配置

### 方式 1：测试 Telegram Bot 连接

```bash
# 设置环境变量
export TELEGRAM_BOT_TOKEN="8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs"
export TELEGRAM_CHAT_ID="5897817017"

# 运行测试脚本
chmod +x scripts/test-telegram.sh
./scripts/test-telegram.sh
```

### 方式 2：手动 curl 测试

```bash
curl -X POST https://YOUR_VERCEL_URL/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "phone": "13800000000",
    "email": "test@example.com",
    "company": "测试公司",
    "message": "这是测试消息",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
  }'
```

### 方式 3：提交真实表单

1. 访问您的网站（在 GitHub Pages 上）
2. 进入 `/about/contact` 页面
3. 填写表单并提交
4. **立即检查 Telegram** - 您应该收到通知！

---

## 📋 完整检查清单

- [ ] ✅ 已有 Telegram Bot（`@dianxinweb_bot`）和 Token
- [ ] ✅ 已有 Telegram ID（`5897817017`）
- [ ] 创建 Vercel 账户
- [ ] 部署 API 到 Vercel
- [ ] 配置环境变量（TELEGRAM_BOT_TOKEN 和 TELEGRAM_CHAT_ID）
- [ ] 获取 Vercel API URL
- [ ] 更新 Contact.tsx 中的 API 地址
- [ ] 提交代码到 GitHub
- [ ] GitHub Pages 自动重新部署
- [ ] 测试表单提交
- [ ] 在 Telegram 收到通知

---

## 🚨 常见问题

**Q：为什么不能直接在 GitHub Pages 上运行后端？**
A：GitHub Pages 只支持纯静态 HTML/CSS/JS，不能运行 Node.js、Python 等后端代码。

**Q：Vercel API URL 是什么？**
A：部署后 Vercel 会自动给您一个 URL，例如 `https://dianxin-api.vercel.app`

**Q：环境变量放在哪里？**
A：不要放在代码中！放在 Vercel Dashboard 的 Environment Variables 中，Vercel 会自动注入。

**Q：前端代码可以写 API 地址吗？**
A：可以！因为是调用外部 API（Vercel），不涉及敏感信息。

**Q：如何隐藏 API URL？**
A：API URL 不需要隐藏（它是公开的），安全的是 Token 和 Chat ID（放在环境变量中）。

---

## 📁 最终项目结构

```
GitHub Pages (您的网站)
├── src/pages/about/Contact.tsx  ← 更新 API 地址
├── ... 其他前端代码
└── 部署在 GitHub Pages 上

Vercel (后端 API)
├── api/contact.ts               ← 处理表单提交
├── vercel.json                  ← Vercel 配置（自动生成）
└── 环境变量配置在 Dashboard     ← TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
```

---

## 🎯 核心要点

1. **前端在 GitHub Pages** → 只是静态网站
2. **后端在 Vercel** → 处理表单和 Telegram 通知
3. **环境变量在 Vercel** → Token 和 Chat ID 安全保存
4. **两者通过 HTTPS 通信** → 安全可靠

---

## 📞 需要帮助？

1. Vercel 文档：https://vercel.com/docs
2. 本仓库的详细指南：[TELEGRAM_SETUP_GUIDE.md](TELEGRAM_SETUP_GUIDE.md)
3. 测试脚本：`./scripts/test-telegram.sh`

祝您配置顺利！🎉

如有问题，可以参考 Vercel 的 [API 文档](https://vercel.com/docs/concepts/functions/serverless-functions)。
