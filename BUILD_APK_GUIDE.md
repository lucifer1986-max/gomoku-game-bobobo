# 五子棋游戏 APK 构建指南

## 📱 项目已配置完成

您的五子棋游戏已经完全配置好了Capacitor移动端支持，包括：

✅ **已完成的配置：**
- Capacitor环境配置
- Android平台支持
- 移动端UI优化
- 触摸交互优化
- Web应用构建完成
- Android项目文件生成

## 🛠️ 构建APK的方法

### 方法一：本地构建（推荐）

#### 1. 安装必要环境
```bash
# 安装Java JDK 11或更高版本
# 下载地址：https://adoptium.net/

# 安装Android Studio
# 下载地址：https://developer.android.com/studio

# 配置环境变量
# JAVA_HOME: Java安装路径
# ANDROID_HOME: Android SDK路径
```

#### 2. 构建APK
```bash
# 在项目根目录执行
cd android
./gradlew assembleDebug

# Windows用户使用
gradlew.bat assembleDebug
```

#### 3. 获取APK文件
构建完成后，APK文件位置：
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### 方法二：在线构建服务

#### 使用Capacitor Live Updates
```bash
# 安装Ionic CLI
npm install -g @ionic/cli

# 使用Appflow构建
ionic capacitor build android --prod
```

#### 使用GitHub Actions
项目中已包含GitHub Actions配置，推送到GitHub后自动构建。

### 方法三：使用Android Studio

1. 打开Android Studio
2. 选择 "Open an existing Android Studio project"
3. 选择项目中的 `android` 文件夹
4. 等待项目同步完成
5. 点击 Build → Build Bundle(s) / APK(s) → Build APK(s)

## 📋 构建前检查清单

- [ ] Java JDK 11+ 已安装
- [ ] Android Studio 已安装
- [ ] Android SDK 已配置
- [ ] 环境变量已设置
- [ ] 项目依赖已安装 (`npm install`)
- [ ] Web应用已构建 (`npm run build`)
- [ ] Capacitor已同步 (`npx cap sync android`)

## 🚀 快速开始（无需Android Studio）

如果您没有Android开发环境，可以：

1. **使用在线构建服务**：
   - Ionic Appflow
   - GitHub Actions
   - Netlify Build

2. **使用PWA版本**：
   - 直接在手机浏览器中访问
   - 添加到主屏幕作为应用使用

3. **请求构建服务**：
   - 将项目上传到GitHub
   - 使用免费的CI/CD服务构建

## 📱 APK安装说明

构建完成后：
1. 将APK文件传输到Android设备
2. 在设备上启用"未知来源"安装
3. 点击APK文件进行安装
4. 享受游戏！

## 🔧 故障排除

### 常见问题：
1. **Java版本问题**：确保使用JDK 11或更高版本
2. **Android SDK问题**：确保SDK路径正确配置
3. **权限问题**：确保有足够的磁盘空间和权限
4. **网络问题**：构建过程需要下载依赖，确保网络连接正常

### 获取帮助：
- 查看构建日志获取详细错误信息
- 访问Capacitor官方文档
- 在GitHub Issues中寻求帮助

## 📞 联系支持

如果您需要帮助构建APK，请提供：
- 操作系统版本
- 错误日志
- 构建环境信息

---

**注意**：首次构建可能需要较长时间，因为需要下载Android构建工具和依赖。
