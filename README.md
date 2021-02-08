# bb-cli

## 使用指南

1. 全局安装 bb-cli

```
    npm i -g bb-cli
```

或

```
    yarn global add bb-cli
```

2. 在你想要创建项目的位置执行

```
    bb-cli
```

## 选项

-   name

    指定项目名称，默认为 Basebit

-   version

    指定项目版本号，默认为 1.0.0

-   description

    指定项目描述，默认为空

-   main

    指定项目入口，默认为 index.js

-   keywords

    指定 package.json 中的 keywords，默认为空

-   author

    指定项目作者，默认为空

## 依赖列表

### devDependencies

```
{
	"@babel/core": "^7.12.10",
	"@babel/plugin-proposal-class-properties": "^7.12.1",
	"@babel/plugin-proposal-decorators": "^7.12.12",
	"@babel/plugin-proposal-function-bind": "^7.12.1",
	"@babel/plugin-proposal-optional-chaining": "^7.12.7",
	"@babel/plugin-transform-async-to-generator": "^7.12.1",
	"@babel/plugin-transform-runtime": "^7.12.10",
	"@babel/preset-env": "^7.12.11",
	"@babel/preset-react": "^7.12.10",
	"@babel/runtime": "^7.12.5",
	"@hot-loader/react-dom": "^16.8.6",
	"@webassemblyjs/ast": "^1.3.1",
	"@webassemblyjs/wasm-edit": "^1.3.1",
	"babel-eslint": "^10.1.0",
	"babel-loader": "^8.2.2",
	"babel-plugin-dva-hmr": "^0.4.2",
	"babel-plugin-dynamic-import-node-sync": "^2.0.1",
	"babel-plugin-import": "^1.13.3",
	"babel-plugin-module-resolver": "^4.1.0",
	"babel-plugin-transform-remove-console": "^6.9.4",
	"body-parser": "^1.18.3",
	"chalk": "^4.1.0",
	"clean-webpack-plugin": "^0.1.19",
	"copy-webpack-plugin": "^4.5.1",
	"core-js": "^3.8.2",
	"cross-env": "^5.1.1",
	"cross-port-killer": "^1.0.1",
	"css-hot-loader": "^1.4.4",
	"css-loader": "^0.28.11",
	"cssnano": "^3.10.0",
	"eslint": "^4.19.1",
	"eslint-config-airbnb": "^16.1.0",
	"eslint-plugin-babel": "^4.0.0",
	"eslint-plugin-compat": "^2.2.0",
	"eslint-plugin-import": "^2.8.0",
	"eslint-plugin-jsx-a11y": "^6.0.3",
	"eslint-plugin-markdown": "^1.0.0-beta.6",
	"eslint-plugin-react": "^7.7.0",
	"file-loader": "^1.1.11",
	"friendly-errors-webpack-plugin": "^1.7.0",
	"happypack": "^5.0.0-beta.4",
	"hard-source-webpack-plugin": "^0.8.0",
	"html-webpack-plugin": "^4.0.0-beta.5",
	"less": "^3.0.4",
	"less-loader": "^4.1.0",
	"mini-css-extract-plugin": "^0.4.1",
	"mockjs": "^1.0.1-beta3",
	"optimize-css-assets-webpack-plugin": "^4.0.1",
	"portfinder": "^1.0.28",
	"prettier": "^2.2.1",
	"progress-bar-webpack-plugin": "^2.1.0",
	"react-hot-loader": "^4.8.4",
	"redbox-react": "^1.5.0",
	"redux-devtools": "^3.4.1",
	"redux-devtools-dock-monitor": "^1.1.3",
	"redux-devtools-log-monitor": "^1.4.0",
	"regenerator-runtime": "^0.11.1",
	"sass-loader": "^7.0.1",
	"style-loader": "^0.21.0",
	"stylelint": "^9.2.0",
	"stylelint-config-standard": "^18.2.0",
	"terser-webpack-plugin": "^4.2.3",
	"url-loader": "^1.0.1",
	"webpack": "^4.8.1",
	"webpack-bundle-analyzer": "^2.13.1",
	"webpack-cli": "^3.1.1",
	"webpack-dev-server": "^3.1.4",
	"webpack-merge": "^5.7.3"
}
```

### dependencies

```
{
	"antd": "^3.3.0",
	"antd-password-input-strength": "^1.1.1",
	"axios": "^0.20.0",
	"classnames": "^2.2.5",
	"dva": "^2.1.0",
	"dva-loading": "^1.0.4",
	"jquery": "^3.3.1",
	"js-base64": "^2.6.4",
	"jwt-decode": "^3.1.1",
	"lodash": "^4.17.4",
	"lodash-decorators": "^4.4.1",
	"long": "^4.0.0",
	"moment": "^2.19.1",
	"prop-types": "^15.5.10",
	"qs": "^6.5.0",
	"react": "^16.8.0",
	"react-dom": "^16.8.0"
}
```

目前只提供最基本的项目依赖及配置，用于旧项目从 roadhog 向 webpack4 迁移。未来版本将提供更多可定制化需求。
