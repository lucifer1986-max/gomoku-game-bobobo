# 📚 GitHub设置指南

## 🚀 快速上传到GitHub

### 方法1：使用GitHub网页界面（推荐新手）

1. **访问GitHub**
   - 打开 [github.com](https://github.com)
   - 登录您的账号（没有账号请先注册）

2. **创建新仓库**
   - 点击右上角 "+" → "New repository"
   - 仓库名：`gomoku-game`
   - 描述：`🎮 现代化五子棋游戏 - 支持双人对战和人机对战，Web/PWA/Android多平台`
   - 选择 Public（公开）
   - **不要勾选**任何初始化选项
   - 点击 "Create repository"

3. **连接本地项目**
   ```bash
   # 替换为您的实际仓库URL
   git remote add origin https://github.com/YOUR_USERNAME/gomoku-game.git
   git branch -M main
   git push -u origin main
   ```

### 方法2：使用GitHub CLI（推荐开发者）

```bash
# 安装GitHub CLI: https://cli.github.com/
gh repo create gomoku-game --public --description "🎮 现代化五子棋游戏"
git remote add origin https://github.com/YOUR_USERNAME/gomoku-game.git
git branch -M main
git push -u origin main
```

### 方法3：使用GitHub Desktop（推荐图形界面用户）

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录您的GitHub账号
3. 选择 "Add an Existing Repository from your Hard Drive"
4. 选择项目文件夹
5. 点击 "Publish repository"

## 🔧 连接命令模板

请将以下命令中的 `YOUR_USERNAME` 替换为您的GitHub用户名：

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/gomoku-game.git

# 设置主分支
git branch -M main

# 推送到GitHub
git push -u origin main
```

## ✅ 验证上传成功

上传成功后，您应该能看到：

1. **GitHub仓库页面**显示所有项目文件
2. **Actions标签页**显示正在运行的构建任务
3. **大约5-10分钟后**，Releases页面会出现APK文件

## 🤖 自动构建说明

项目包含GitHub Actions配置，会自动：

- ✅ 构建Web应用
- ✅ 生成Android APK
- ✅ 创建Release发布
- ✅ 上传APK文件供下载

## 🆘 常见问题

### 问题1：权限被拒绝
```bash
# 解决方案：使用个人访问令牌
# 1. GitHub设置 → Developer settings → Personal access tokens
# 2. 生成新令牌，选择repo权限
# 3. 使用令牌作为密码
```

### 问题2：仓库已存在
```bash
# 解决方案：使用不同的仓库名
git remote add origin https://github.com/YOUR_USERNAME/gomoku-game-v2.git
```

### 问题3：推送失败
```bash
# 解决方案：强制推送（谨慎使用）
git push -u origin main --force
```

## 📞 需要帮助？

如果遇到问题：

1. **检查网络连接**
2. **确认GitHub用户名和仓库名正确**
3. **查看错误信息**并搜索解决方案
4. **联系技术支持**

---

**准备好了吗？** 创建GitHub仓库后，告诉我您的仓库URL，我来帮您完成连接！
