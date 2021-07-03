English | [简体中文](./README-zh_CN.md)

## Branch

The main branch is YiFang currently. The master branch will not be upgraded right now.

## Guidance

1. Clone the repository to local

```bash
    git clone
```

2. Check your local Node.js version, recommend to use node at v14.17.1.

```bash
    node -v
```

3. Install the pnpm package adapt to your local Node.js version.

```bash
    npm install -g pnpm
```

The table below is the support about pnpm and Node.js。

|  Node.js   | pnpm 1 | pnpm 2 | pnpm 3 | pnpm 4 | pnpm 5 | pnpm 6 |
| :--------: | :----: | :----: | :----: | :----: | :----: | :----: |
| Node.js 4  |   ✔️   |   ❌   |   ❌   |   ❌   |   ❌   |   ❌   |
| Node.js 6  |   ✔️   |   ✔️   |   ❌   |   ❌   |   ❌   |   ❌   |
| Node.js 7  |   ✔️   |   ✔️   |   ✔️   |   ❌   |   ❌   |   ❌   |
| Node.js 10 |   ✔️   |   ✔️   |   ✔️   |   ✔️   |   ✔️   |   ❌   |
| Node.js 12 |   ❌   |   ❌   |   ✔️   |   ✔️   |   ✔️   |   ✔️   |
| Node.js 14 |   ❌   |   ❌   |   ✔️   |   ✔️   |   ✔️   |   ✔️   |
| Node.js 16 |   ?    |   ?    |   ?    |   ?    |   ?    |   ✔️   |

4. Install dependencies

```bash
   pnpm install
```

5. Run the project locally

```bash
    npm start
```

6. Build for the production environment

```bash
    npm run build
```
