import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ConfigProvider, message } from 'antd';
import { config } from './config';
import Axios from 'axios';
import { getBrowser } from './utils/utils';
import App from './routes/App';
import 'dayjs/locale/zh-cn';
import './index.less';
import './hk.less';
import { Provider } from 'react-redux';
import store from './store';
import zhCN from 'antd/lib/locale/zh_CN';
import zhHK from 'antd/lib/locale/zh_HK';
import enUS from 'antd/lib/locale/en_US';

const { configLanguage, CRMApi } = global;
const axios = Axios.create();

const token = localStorage.getItem(config.csrfTokenName);
const browser = getBrowser('n');
const language = localStorage.getItem(configLanguage) || window.defaultLanguage;

if (browser !== 'chrome' && token === null) {
	const options = {};
	if (language === 'zh-CN') {
		options.title = '提示';
		options.content = '为了更好地使用平台的各项功能，建议您使用Chrome浏览器';
	} else if (language === 'zh-HK') {
		options.title = '提示';
		options.content = '為了更好地使用平台的各項功能，建議您使用Chrome瀏覽器';
	} else {
		options.title = 'Notes';
		options.content =
			'In order to better use the functions of the platform, it is recommended that you use the Chrome browser';
	}
	Modal.warning(options);
}

//设置超时时间： 30分
const timeOut = 30 * 60 * 1000;
let lastTime = new Date().getTime();
let currentTime = new Date().getTime();
let moveFlag = false;

window.onload = () => {
	/* 检测鼠标移动事件 */
	document.addEventListener('mousemove', () => {
		// 更新最后的操作时间
		moveFlag = true;
		lastTime = new Date().getTime();
	});
	document.addEventListener('keydown', () => {
		// 更新最后的操作时间
		moveFlag = true;
		lastTime = new Date().getTime();
	});
	document.addEventListener('keyup', () => {
		// 更新最后的操作时间
		moveFlag = true;
		lastTime = new Date().getTime();
	});
};

const refreshToken = async () => {
	if (moveFlag) {
		// --------------------------------之后等待有了新的refresh token api 之后打开 并且替换 对应的newOperationApi
		if (
			window.location.pathname !== '/user/login' &&
			window.location.pathname !== '/user/register' &&
			window.location.pathname !== '/user/status'
		) {
			const token = localStorage.getItem(config.csrfTokenName);
			axios.defaults.headers.common['Authorization'] = token;

			const response = await axios.get(`${CRMApi}/account/profile`, {});
			if (response) {
				localStorage.setItem(config.csrfTokenName, response.data.newToken);
			}
		}
	}
};

/* 定时器  间隔1分钟，检测是否长时间未操作页面  */
const expiredTime = () => {
	//更新当前时间
	currentTime = new Date().getTime();
	//判断是否超时
	if (currentTime - lastTime > timeOut) {
		// 超时操作
	} else {
		// 没超时 执行refresh token call
		refreshToken();
		moveFlag = false;
	}
};

window.setInterval(expiredTime, 5 * 60 * 1000);

const mountNode = document.getElementById('root');

message.config({
	top: 50,
});

ReactDOM.render(
	<ConfigProvider locale={language === 'zh-CN' ? zhCN : language === 'zh-HK' ? zhHK : enUS}>
		<Provider store={store}>
			<App />
		</Provider>
	</ConfigProvider>,
	mountNode
);
