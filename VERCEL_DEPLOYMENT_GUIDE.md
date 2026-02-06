# 🚀 Vercel 部署完全指南（包含截图步骤）

## 📖 本指南帮助您

- ✅ 创建 Vercel 账户
- ✅ 部署 dianxinv1 项目
- ✅ 配置环境变量
- ✅ 验证部署成功

---

## 第 1 部分：创建 Vercel 账户

### 步骤 1.1：访问 Vercel

```
打开浏览器，访问：https://vercel.com
```

**您会看到：** Vercel 官网首页，右上角有 "Sign Up" 按钮

### 步骤 1.2：注册账户

点击 **"Sign Up"** → 选择 **"Continue with GitHub"**

```
预期看到：GitHub 登录授权窗口
```

### 步骤 1.3：授权 GitHub 访问

点击 **"Authorize Vercel"** 确认授权

```
预期看到：重定向到 Vercel Dashboard
```

---

## 第 2 部分：部署 dianxinv1 项目

### 步骤 2.1：访问 Dashboard

登录后自动进入 Vercel Dashboard

```
http://vercel.com/dashboard
```

### 步骤 2.2：创建新项目

找到 **"New Project"** 按钮，点击

```
位置：页面右上角
```

### 步骤 2.3：选择 Git 仓库

**预期看到：** GitHub 仓库列表

```
查找：dianxinv1
点击：dianxinv1 仓库名称
```

**如果找不到：**
```
点击 "Import Third-Party Git Repository"
输入：https://github.com/wangz1yu/dianxinv1
```

### 步骤 2.4：配置项目

**预期看到：** Import Project 配置页面

| 字段 | 设置 |
|------|------|
| Project Name | `dianxinv1` （默认） |
| Root Directory | `./`（默认） |
| Framework | **Other** ← 选这个 |
| Build Command | （留空） |
| Install Command | `npm install` |
| Output Directory | `dist` |

> ⚠️ **重要：** Framework 必须选 **"Other"**，因为这不是一个标准的 Next.js 项目

### 步骤 2.5：跳过环境变量（稍后添加）

向下滚动，看到 **"Environment Variables"** 部分

**暂时跳过** - 我们稍后在 Settings 中添加

### 步骤 2.6：点击 Deploy

点击红色 **"Deploy"** 按钮

```
预期看到：
- 部署开始
- 显示 "Building..."
- 进度条
```

### 步骤 2.7：等待部署完成

```
预期时长：3-5 分钟

您会看到：
✓ Build complete
✓ Deployment ready
```

**部署成功后，Vercel 会显示：**
```
Congratulations! 🎉
Your project has been successfully deployed.

Production URL: https://dianxinv1.vercel.app
```

---

## 第 3 部分：配置环境变量

### 步骤 3.1：访问 Settings

部署完成后，在您的项目页面中：

```
点击顶部菜单：Settings
```

### 步骤 3.2：找到 Environment Variables

左边菜单 → 找到 **"Environment Variables"**

```
位置：Settings 页面左侧菜单
```

### 步骤 3.3：添加第一个变量

点击 **"Add new"** 或 **"New Variable"** 按钮

**第一个变量：**
```
Name:        TELEGRAM_BOT_TOKEN
Value:       8212420138:AAFusEPY4Try1ZTEmbb0kKC8ak0esL1A9Zs
Environments: 三个都勾选
  ☑ Production
  ☑ Preview
  ☑ Development
```

点击 **"Save"**

### 步骤 3.4：添加第二个变量

再次点击 **"Add new"** 或 **"New Variable"**

**第二个变量：**
```
Name:        TELEGRAM_CHAT_ID
Value:       5897817017
Environments: 三个都勾选
  ☑ Production
  ☑ Preview
  ☑ Development
```

点击 **"Save"**

### 步骤 3.5：验证变量已保存

返回 Environment Variables 页面，应该看到两个变量：

```
✓ TELEGRAM_BOT_TOKEN    (production, preview, development)
✓ TELEGRAM_CHAT_ID      (production, preview, development)
```

### 步骤 3.6：触发重新部署

```
方式 1：推送代码到 GitHub（自动重新部署）
        git push origin main

方式 2：在 Vercel 中手动重新部署
        在项目页面 → 找到最新的 Deployment
        点击 "Redeploy"
```

---

## 第 4 部分：获取 API URL

### 找到您的 Vercel URL

```
在 Vercel Dashboard 中：
项目名下方 → Production URL

例如：
https://dianxinv1.vercel.app
```

**记下这个 URL**，因为稍后要在代码中使用

---

## 第 5 部分：验证部署

### 方法 1：检查 Deployments

在项目页面：
```
点击 "Deployments" 标签
找到标记为 "Production" 的部署
应该显示 ✓ Ready
```

### 方法 2：测试 API 端点

```bash
# 在终端运行
curl -X POST https://dianxinv1.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试",
    "phone": "13800000000",
    "email": "test@example.com",
    "company": "测试",
    "message": "测试"
  }'
```

**预期响应：**
```json
{
  "success": true,
  "message": "表单已提交成功"
}
```

### 方法 3：运行测试脚本

```bash
chmod +x scripts/test-telegram-configured.sh
./scripts/test-telegram-configured.sh
```

---

## 🎨 Vercel 页面导航地图

```
Vercel Dashboard
├── Projects
│   └── dianxinv1 (您的项目)
│       ├── Deployments (查看部署状态)
│       ├── Settings
│       │   └── Environment Variables (配置 Token)
│       └── Production URL (复制 API 地址)
│
└── Account (右上角用户菜单)
    ├── Settings
    └── Billing
```

---

## 🚨 常见问题

### Q1：Vercel 部署失败？

**检查：**
1. GitHub 仓库是否已推送所有文件
2. `api/contact.ts` 文件是否存在
3. `vercel.json` 配置是否正确

**解决：**
```bash
# 确保所有文件已提交
git status

# 如果有未提交的更改
git add .
git commit -m "Add Vercel configuration"
git push origin main

# 在 Vercel 中重新部署
# Dashboard → Deployments → 最新部署 → Redeploy
```

### Q2：环境变量不生效？

**检查：**
1. 变量名称是否完全一致（区分大小写）
2. 是否勾选了 Production 环境
3. 是否在保存后重新部署

**解决：**
1. 重新检查变量值
2. 删除变量后重新添加
3. 推送代码到 GitHub 触发重新部署

### Q3：API 端点返回 404？

**检查：**
1. API URL 是否正确（https:// 不是 http://）
2. 部署是否显示 ✓ Ready
3. `/api/contact` 是否存在

**解决：**
```bash
# 测试 API 端点
curl https://dianxinv1.vercel.app/api/contact

# 应该返回 405 Method Not Allowed (因为需要 POST)
# 这表示 API 已部署成功
```

### Q4：提交表单后没有通知？

**检查：**
1. 运行 `./scripts/test-telegram-configured.sh`
2. 检查 Telegram 通知设置
3. 查看 Vercel Logs

**Vercel 查看日志：**
```
Deployments → 选择一个部署 → Logs (查看执行日志)
```

---

## 📋 检查清单

- [ ] 访问 https://vercel.com
- [ ] 用 GitHub 账户注册
- [ ] 导入 dianxinv1 仓库
- [ ] 选择 Framework: Other
- [ ] 点击 Deploy
- [ ] 等待部署完成（5-10 分钟）
- [ ] 进入 Settings → Environment Variables
- [ ] 添加 TELEGRAM_BOT_TOKEN
- [ ] 添加 TELEGRAM_CHAT_ID
- [ ] 记下 Production URL
- [ ] 测试 API 端点
- [ ] 更新 Contact.tsx 中的 API 地址
- [ ] 推送代码到 GitHub
- [ ] 测试表单提交
- [ ] 在 Telegram 收到通知 ✅

---

## 🎯 成功标志

✅ 当您看到以下信息时，说明部署成功：

```
Production URL: https://dianxinv1.vercel.app
Status: ✓ Ready
Deployment: Successful
```

✅ 当您收到以下信息时，说明 Bot 工作正常：

```
Telegram 通知：
📬 新的联系表单提交
[...表单信息...]
```

---

## 🔗 相关链接

- Vercel Documentation: https://vercel.com/docs
- Vercel Functions: https://vercel.com/docs/concepts/functions/serverless-functions
- GitHub Codespaces: https://github.com/features/codespaces

---

## 📞 需要帮助？

1. 查看本文各部分
2. 查看 [ACTION_PLAN.md](ACTION_PLAN.md) 快速步骤
3. 运行 `./scripts/test-telegram-configured.sh` 测试
4. 检查 Vercel 部署日志

祝您部署顺利！ 🎉
