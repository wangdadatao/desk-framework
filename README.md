# Desk Framework

一个基于 Tauri + Vue 3 的现代桌面应用开发框架，集成了多种实用功能，让桌面应用开发变得简单高效。

![Desk Framework 截图](./screenshots/preview.png)

## ✨ 功能特点

- 🖥️ **跨平台支持**：基于 Tauri，支持 Windows、macOS 和 Linux
- 🎨 **现代 UI**：使用 Tailwind CSS 构建的美观界面
- 🌙 **暗色模式**：支持浅色、深色和跟随系统的主题切换
- 🌐 **国际化**：内置中英文支持，易于扩展
- 🧩 **组件库**：丰富的预置 UI 组件
- 📊 **示例页面**：内置仪表盘、用户管理等示例页面
- 🔄 **状态管理**：集成 Pinia 进行状态管理
- 🛠️ **开发工具**：内置项目初始化工具

## 🚀 快速开始

### 先决条件

- [Node.js](https://nodejs.org/) (推荐 16.x 或更高版本)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri 开发环境](https://tauri.app/v1/guides/getting-started/prerequisites)

### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/desk-framework.git
cd desk-framework

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run tauri
```

### 构建

```bash
# 为当前平台构建
npm run tauri:build

# 为 Windows 构建
npm run tauri:build:win

# 为 macOS 构建
npm run tauri:build:mac
```

## 🔄 创建新项目

使用内置的项目初始化脚本快速创建一个新项目：

```bash
# 交互式创建
npm run init

# 或直接指定参数
npm run init "我的应用" "这是一个很棒的应用" "开发者名称" "com.example.myapp"
```

## 📁 项目结构
