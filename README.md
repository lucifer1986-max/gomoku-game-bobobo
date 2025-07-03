# 🎮 五子棋游戏

一个现代化的五子棋游戏，支持双人对战和人机对战模式，使用React + TypeScript开发，支持Web、PWA和Android APK多平台。

## ✨ 功能特性

### 🎯 游戏模式
- **双人对战模式**：本地双人轮流下棋
- **人机对战模式**：挑战智能AI对手
  - 简单难度：适合新手
  - 中等难度：有一定挑战性
  - 困难难度：高级AI算法

### 🎨 界面设计
- 精美的木质纹理棋盘
- 3D立体棋子效果
- 流畅的落子动画
- 响应式设计，完美适配移动端

### 🤖 AI算法
- Minimax算法 + Alpha-Beta剪枝
- 智能位置评估
- 多层深度搜索
- 胜负手识别

### 📱 多平台支持
- **Web版本**：直接在浏览器中游玩
- **PWA版本**：可安装到手机主屏幕
- **Android APK**：原生应用体验

## 🚀 快速开始

### 在线体验
访问部署的在线版本即可立即游玩。

### 本地运行
```bash
# 克隆项目
git clone https://github.com/your-username/gomoku-game.git
cd gomoku-game

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 移动端安装

#### PWA版本
1. 在手机浏览器中访问游戏
2. 点击浏览器菜单中的"添加到主屏幕"
3. 像原生应用一样使用

#### Android APK
1. 在[Releases页面](../../releases)下载最新的APK文件
2. 在Android设备上启用"未知来源"安装
3. 安装APK文件

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **移动端**：Capacitor
- **UI样式**：CSS3 + 响应式设计
- **AI算法**：Minimax + Alpha-Beta剪枝
- **部署**：GitHub Actions自动构建

## 📁 项目结构

```
gomoku-game/
├── src/
│   ├── components/          # React组件
│   ├── utils/              # 工具函数和AI算法
│   ├── types/              # TypeScript类型定义
│   └── styles/             # 样式文件
├── android/                # Android项目文件
├── .github/workflows/      # GitHub Actions配置
├── public/                 # 静态资源
└── docs/                   # 文档文件
```

## 🎮 游戏规则

1. **目标**：率先在棋盘上连成5个同色棋子（横、竖、斜任意方向）
2. **下棋**：黑棋先行，双方轮流在棋盘交叉点上放置棋子
3. **胜负**：先连成五子者获胜
4. **悔棋**：支持悔棋功能（人机模式下撤销两步）

## 🔧 开发指南

### 环境要求
- Node.js 16+
- npm 或 yarn

### 开发命令
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览生产版本
npm run lint         # 代码检查
```

### Android开发
```bash
npm run build        # 构建Web应用
npx cap sync android # 同步到Android
npx cap open android # 打开Android Studio
```

## 📱 部署方案

### Web部署
- Netlify
- Vercel
- GitHub Pages

### APK构建
- GitHub Actions自动构建
- 本地Android Studio构建
- 在线构建服务

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看[LICENSE](LICENSE)文件了解详情。

## 🙏 致谢

- React团队提供的优秀框架
- Capacitor团队的跨平台解决方案
- 所有贡献者的支持

---

**享受游戏！** 🎉
