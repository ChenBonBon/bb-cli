[English](./README.md) | 简体中文

XDP CRM 管理平台

## Branch

目前主分支为 YiFang 分支，master 分支暂不进行更新

## 食用指南

1. 克隆仓库到本地

```bash
    git clone
```

2. 检查系统当前 node 版本，建议使用 node v14.17.1 版本

```bash
    node -v
```

3. 安装对应 node 版本的 pnpm 包

```bash
    npm install -g pnpm
```

以下是各版本 pnpm 与各版本 Node.js 之间的支持表格。

|  Node.js   | pnpm 1 | pnpm 2 | pnpm 3 | pnpm 4 | pnpm 5 | pnpm 6 |
| :--------: | :----: | :----: | :----: | :----: | :----: | :----: |
| Node.js 4  |   ✔️   |   ❌   |   ❌   |   ❌   |   ❌   |   ❌   |
| Node.js 6  |   ✔️   |   ✔️   |   ❌   |   ❌   |   ❌   |   ❌   |
| Node.js 7  |   ✔️   |   ✔️   |   ✔️   |   ❌   |   ❌   |   ❌   |
| Node.js 10 |   ✔️   |   ✔️   |   ✔️   |   ✔️   |   ✔️   |   ❌   |
| Node.js 12 |   ❌   |   ❌   |   ✔️   |   ✔️   |   ✔️   |   ✔️   |
| Node.js 14 |   ❌   |   ❌   |   ✔️   |   ✔️   |   ✔️   |   ✔️   |
| Node.js 16 |   ?    |   ?    |   ?    |   ?    |   ?    |   ✔️   |

4. 安装依赖

```bash
    pnpm install
```

5. 本地运行项目

```bash
    npm start
```

6. 生产环境构建

```bash
    npm run build
```
