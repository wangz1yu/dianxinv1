# ⚡ GitHub Pages + Telegram Bot - 3 步快速配置

## ✅ 您已准备好的信息

```
Bot Token:     8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs
Chat ID:       5897817017
Bot 名称:      @dianxinweb_bot
部署位置:      GitHub Pages
```

---

## 🚀 3 个步骤完成配置

### 📍 步骤 1️⃣：创建 Vercel 项目（3 分钟）

1. 访问 https://vercel.com（免费注册）
2. 用 GitHub 账户登录
3. 点击 **"New Project"**
4. 选择您的 `dianxinv1` 仓库
5. Framework 选择 **"Other"**（因为这只是 API）
6. 点击 **"Deploy"** 

**Vercel 会自动构建，给您一个 URL**（记下来）：
```
https://your-vercel-project.vercel.app
```

---

### 📍 步骤 2️⃣：配置环境变量（2 分钟）

在 Vercel Dashboard 中：

1. 选择您刚部署的项目
2. 进入 **Settings** → **Environment Variables**
3. 添加第一个变量：
   ```
   Name:  TELEGRAM_BOT_TOKEN
   Value: 8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs
   Environments: ✓ Production  ✓ Preview  ✓ Development
   ```
4. 添加第二个变量：
   ```
   Name:  TELEGRAM_CHAT_ID
   Value: 5897817017
   Environments: ✓ Production  ✓ Preview  ✓ Development
   ```
5. 点击 **"Save"**
6. 自动重新部署（2-3 分钟）

---

### 📍 步骤 3️⃣：更新网站代码（2 分钟）

编辑 `src/pages/about/Contact.tsx`，找到这行代码（大约第 70 行）：

```typescript
const response = await fetch('/api/contact', {
```

**改成：**

```typescript
const response = await fetch('https://your-vercel-project.vercel.app/api/contact', {
```

> ⚠️ 记得把 `your-vercel-project` 替换成您实际的 Vercel 项目名称！

然后提交代码：
```bash
git add src/pages/about/Contact.tsx
git commit -m "Update API endpoint to Vercel"
git push origin main
```

GitHub Pages 会自动重新部署（1-2 分钟）

---

## ✨ 完成！运行测试

### 测试 1：快速验证

```bash
# 在本地运行测试脚本
export TELEGRAM_BOT_TOKEN="8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs"
export TELEGRAM_CHAT_ID="5897817017"

chmod +x scripts/test-telegram.sh
./scripts/test-telegram.sh
```

### 测试 2：提交真实表单

1. 访问 (您的网站地址)/about/contact
   - 例如：https://wangz1yu.github.io/dianxinv1/about/contact
2. 填写表单：
   - 姓名：安格斯
   - 电话：任意 10+ 位数字
   - 邮箱：test@example.com
   - 公司：测试
   - 咨询内容：这是测试
3. 点击 **"提交咨询"**
4. **⏱️ 等待 2-3 秒**，应该收到 Telegram 通知！

---

## 🎯 Vercel 项目名称查找方法

在 Vercel Dashboard 中：
- 打开您的项目
- URL 中的项目名称，例如：
  ```
  https://vercel.com/wangz1yu/dianxin-api
                              ↑
                        这就是项目名称
  ```
- 或者从部署完成的信息中获取，例如：
  ```
  Production URL: https://dianxin-api.vercel.app
                       ↑
                    项目名称
  ```

---

## ⚠️ 常见错误

| 错误 | 原因 | 解决 |
|------|------|------|
| API 地址不对 | 没有更新 Contact.tsx | 确保用的是 https://your-vercel-project.vercel.app（您的实际地址） |
| 收不到通知 | 环境变量未配置 | 在 Vercel Dashboard Environment Variables 中添加两个变量 |
| CORS 错误 | API 地址不对 | 确保用 https:// 不是 http:// |
| 500 错误 | 服务器问题 | 检查 Vercel 的部署日志 |

---

## 📋 快速检查清单

- [ ] ✅ 有 Telegram Bot Token（已有）
- [ ] ✅ 有 Telegram Chat ID（已有）
- [ ] 创建 Vercel 账户并连接 GitHub
- [ ] 部署 dianxinv1 项目到 Vercel
- [ ] 配置环境变量（Token 和 Chat ID）
- [ ] 更新 Contact.tsx 中的 API 地址
- [ ] 提交代码到 GitHub
- [ ] 测试表单提交
- [ ] ✅ 在 Telegram 收到通知

---

## 🎨 您会收到的通知格式

```
📬 新的联系表单提交

👤 姓名：安格斯
📱 电话：13800000000
📧 邮箱：user@example.com
🏢 公司：测试公司
📝 咨询内容：这是测试消息

⏰ 提交时间：2026-02-06 10:00:00
```

---

## 🚀 就是这样！

只需 3 个步骤，您的网站就能通过 Telegram 接收访客咨询了！

**如有问题，参考详细指南：**
- [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) - 详细内容
- [TELEGRAM_SETUP_GUIDE.md](TELEGRAM_SETUP_GUIDE.md) - Telegram 配置
- [QUICK_START.md](QUICK_START.md) - 其他部署方案

祝您成功！ 🎉
