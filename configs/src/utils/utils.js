import dayjs from 'dayjs';
import { parse, stringify } from 'qs';
import jwt_decode from 'jwt-decode';
import { config } from '../config';
import en_US from '../i18n/locales/en-US.json';
import zh_CN from '../i18n/locales/zh-CN.json';
import zh_HK from '../i18n/locales/zh-HK.json';
import { IntlProvider } from 'react-intl';

const { configLanguage } = global;

export function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
	let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
}
export function convertDateFormat(date, type) {
	if (type === 'DAY') {
		return date;
	} else if (type === 'MONTH') {
		return date.substr(0, 7);
	} else {
		return date.substr(0, 4);
	}
}
export function secondToDate(msd) {
	var time = msd;
	if (null != time && '' != time) {
		if (time > 60 && time < 60 * 60) {
			time =
				0 +
				'D ' +
				0 +
				'H ' +
				parseInt(time / 60.0) +
				'M ' +
				parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
				'S ';
		} else if (time >= 60 * 60 && time < 60 * 60 * 24) {
			time =
				0 +
				'D ' +
				parseInt(time / 3600.0) +
				'H ' +
				parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
				'M ' +
				parseInt(
					(parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
						parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) *
						60
				) +
				'S ';
		} else if (time >= 60 * 60 * 24) {
			time =
				parseInt(time / 3600.0 / 24) +
				'D ' +
				parseInt((parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) * 24) +
				'H ' +
				parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
				'M ' +
				parseInt(
					(parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
						parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) *
						60
				) +
				'S ';
		} else {
			time = 0 + 'D ' + 0 + 'H ' + 0 + 'M ' + parseInt(time) + 'S ';
		}
	}
	return time;
}
/*获取一个月的天数 */
export function getCountDays() {
	var curDate = new Date();
	var curMonth = curDate.getMonth();
	curDate.setMonth(curMonth + 1);
	curDate.setDate(0);
	return curDate.getDate();
}

export function getEveryDay() {
	var currentTime = new Date().toLocaleDateString();
	var currentDay = currentTime.substr(0, currentTime.lastIndexOf('/') + 1);
	var dayArry = [];
	var day = getCountDays();
	for (var k = 1; k <= day; k++) {
		dayArry.push(currentDay + '' + k);
	}
	return dayArry;
}

export function formatter(data, parentPath = '/') {
	return data.map((item) => {
		let { path } = item;
		if (!isUrl(path)) {
			path = parentPath + item.path;
		}
		const result = {
			...item,
			path,
		};
		if (item.children) {
			result.children = formatter(item.children, `${parentPath}${item.path}/`);
		}
		return result;
	});
}

export function getUserMenu() {
	let token;
	token = localStorage.getItem(config.csrfTokenName);

	let decodeName;
	let userRole;

	if (token) {
		decodeName = jwt_decode(token);
		userRole = JSON.parse(decodeName.bauthUser).roles;
	}
	const menuArray = [
		{
			name: 'dashboard.menu',
			icon: 'hk-Dashboard',
			path: 'dashboard',
			key: 'dashboard',
		},
		{
			name: 'org.list',
			icon: 'hk-organizational',
			path: 'orgs',
			key: 'orgs',
		},
		{
			name: 'bb-user',
			icon: 'hk-user',
			path: 'users',
			key: 'users',
			children: [
				{
					name: 'user.list',
					path: 'list',
					key: 'list',
				},
				{
					name: 'user.audit',
					path: 'audit',
					key: 'audit',
				},
			],
		},
		// {
		//   name: 'bb-market',
		//   icon: 'hk-services',
		//   path: 'fuwu',
		// },
		{
			name: 'bb.tickets',
			icon: 'hk-tickets',
			path: 'tickets',
			key: 'tickets',
		},
		{
			name: 'bb.cms',
			icon: 'hk-content',
			path: 'cms',
			key: 'cms',
			children: [
				{
					name: 'bb.cms.catelog',
					path: 'catelog',
					key: 'catelog',
				},
				{
					name: 'bb.cms.banner',
					path: 'banner',
					key: 'banner',
				},
				{
					name: 'bb.cms.featured.dataset',
					path: 'dataset',
					key: 'dataset',
				},
				{
					name: 'bb.cms.post',
					path: 'contents',
					key: 'contents',
				},
				{
					name: 'bb.cms.docs',
					path: 'documents',
					key: 'documents',
				},
				{
					name: 'bb.cms.aboutUs',
					path: 'about_us',
					key: 'about_us',
				},
				{
					name: 'bb.cms.footer',
					path: 'footer',
					key: 'footer',
				},
			],
		},
		// {
		//   name: 'bb.maintance.list',
		//   icon: 'hk-weihu',
		//   path: 'maintance',
		// },
		{
			name: 'daas.manage',
			icon: 'hk-resources',
			path: 'daas',
			key: 'daas',
		},
		{
			name: 'federal.manage',
			icon: 'hk-resources',
			path: 'federal',
			key: 'federal',
		},
		{
			name: 'bb.order.service',
			icon: 'hk-fuwu',
			path: 'orderService',
			key: 'orderService',
		},
		{
			name: 'bb.appointment',
			icon: 'hk-fuwu',
			path: 'appointment',
			key: 'appointment',
		},
		{
			name: 'op.account.management',
			icon: 'hk-fuwu',
			path: 'opAccount',
			key: 'opAccount',
		},
	];

	if (window.publicCloudFlag) {
		menuArray.push({
			name: 'bb.bills',
			icon: 'hk-services',
			path: 'bills',
			key: 'bills',
		});
	}

	//假设目前三种角色的权限，后续调整对应的key
	const adminUser = [
		'dashboard',
		'orgs',
		'users',
		'list',
		'audit',
		'tickets',
		'cms',
		'catelog',
		'banner',
		'dataset',
		'contents',
		'documents',
		'about_us',
		'footer',
		'daas',
		'federal',
		'orderService',
		'appointment',
		'bills',
		'opAccount',
		'opAccount',
	];
	const operatorUser = [
		'orgs',
		'users',
		'list',
		'audit',
		'tickets',
		'cms',
		'catelog',
		'banner',
		'dataset',
		'contents',
		'documents',
		'about_us',
		'footer',
		'federal',
	];
	const auditUser = [
		'orgs',
		'users',
		'list',
		'audit',
		'tickets',
		'cms',
		'catelog',
		'banner',
		'dataset',
		'contents',
		'documents',
		'about_us',
		'footer',
		'federal',
		'orderService',
		'appointment',
		'opAccount',
	];

	let concatArray = [];
	let menuData = [];

	if (userRole && userRole.length > 0) {
		if (userRole.indexOf('admin') !== -1) {
			concatArray = concatArray.concat(adminUser);
		}
		if (userRole.indexOf('operator') !== -1) {
			concatArray = concatArray.concat(operatorUser);
		}
		if (userRole.indexOf('audit') !== -1) {
			concatArray = concatArray.concat(auditUser);
		}

		menuArray.map((item) => {
			//查看menu有没有chilren

			if (item.children) {
				let childrenArray = [];

				item.children.map((childrenItem) => {
					if (concatArray.indexOf(childrenItem.key) !== -1) {
						childrenArray.push({
							key: childrenItem.key,
							name: childrenItem.name,
							path: childrenItem.path,
						});
					}
				});

				menuData.push({
					icon: item.icon,
					key: item.key,
					name: item.name,
					path: item.path,
					children: childrenArray,
				});
			} else {
				if (concatArray.indexOf(item.key) !== -1) {
					menuData.push({
						icon: item.icon,
						key: item.key,
						name: item.name,
						path: item.path,
					});
				}
			}
		});
	} else {
		menuData = menuArray;
	}
	let result = formatter(menuData);
	return result;
}

export function getPageQuery() {
	return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
	const search = stringify(query);
	if (search.length) {
		return `${path}?${search}`;
	}
	return path;
}

export function arrayBufferToBase64(buffer) {
	var binary = '';
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

export function base64toBlob(base64, mime) {
	let bstr = atob(base64);
	let n = bstr.length;
	let u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}

export function fixedZero(val) {
	return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
	const now = new Date();
	const oneDay = 1000 * 60 * 60 * 24;

	if (type === 'today') {
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);
		return [dayjs(now), dayjs(now.getTime() + (oneDay - 1000))];
	}

	if (type === 'week') {
		let day = now.getDay();
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);

		if (day === 0) {
			day = 6;
		} else {
			day -= 1;
		}

		const beginTime = now.getTime() - day * oneDay;

		return [dayjs(beginTime), dayjs(beginTime + (7 * oneDay - 1000))];
	}

	if (type === 'month') {
		const year = now.getFullYear();
		const month = now.getMonth();
		const nextDate = dayjs(now).add(1, 'months');
		const nextYear = nextDate.year();
		const nextMonth = nextDate.month();

		return [
			dayjs(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
			dayjs(dayjs(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
		];
	}

	if (type === 'year') {
		const year = now.getFullYear();

		return [dayjs(`${year}-01-01 00:00:00`), dayjs(`${year}-12-31 23:59:59`)];
	}
}

export function getPlainNode(nodeList, parentPath = '') {
	const arr = [];
	nodeList.forEach((node) => {
		const item = node;
		item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
		item.exact = true;
		if (item.children && !item.component) {
			arr.push(...getPlainNode(item.children, item.path));
		} else {
			if (item.children && item.component) {
				item.exact = false;
			}
			arr.push(item);
		}
	});
	return arr;
}

export function digitUppercase(n) {
	const fraction = ['角', '分'];
	const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	const unit = [
		['元', '万', '亿'],
		['', '拾', '佰', '仟'],
	];
	let num = Math.abs(n);
	let s = '';
	fraction.forEach((item, index) => {
		s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '');
	});
	s = s || '整';
	num = Math.floor(num);
	for (let i = 0; i < unit[0].length && num > 0; i += 1) {
		let p = '';
		for (let j = 0; j < unit[1].length && num > 0; j += 1) {
			p = digit[num % 10] + unit[1][j] + p;
			num = Math.floor(num / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	}

	return s
		.replace(/(零.)*零元/, '元')
		.replace(/(零.)+/g, '零')
		.replace(/^整$/, '零元整');
}

function getRelation(str1, str2) {
	if (str1 === str2) {
		console.warn('Two path are equal!'); // eslint-disable-line
	}
	const arr1 = str1.split('/');
	const arr2 = str2.split('/');
	if (arr2.every((item, index) => item === arr1[index])) {
		return 1;
	} else if (arr1.every((item, index) => item === arr2[index])) {
		return 2;
	}
	return 3;
}

function getRenderArr(routes) {
	let renderArr = [];
	renderArr.push(routes[0]);
	for (let i = 1; i < routes.length; i += 1) {
		let isAdd = false;
		// 是否包含
		isAdd = renderArr.every((item) => getRelation(item, routes[i]) === 3);
		// 去重
		renderArr = renderArr.filter((item) => getRelation(item, routes[i]) !== 1);
		if (isAdd) {
			renderArr.push(routes[i]);
		}
	}
	return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
	let routes = Object.keys(routerData).filter((routePath) => routePath.indexOf(path) === 0 && routePath !== path);
	// Replace path to '' eg. path='user' /user/name => name
	routes = routes.map((item) => item.replace(path, ''));
	// Get the route to be rendered to remove the deep rendering
	const renderArr = getRenderArr(routes);
	// Conversion and stitching parameters
	const renderRoutes = renderArr.map((item) => {
		const exact = !routes.some((route) => route !== item && getRelation(route, item) === 1);
		return {
			exact,
			...routerData[`${path}${item}`],
			key: `${path}${item}`,
			path: `${path}${item}`,
		};
	});
	return renderRoutes;
}

/* eslint no-useless-escape:0 */
const reg =
	/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
	return reg.test(path);
}

export function getDomain() {
	let { hostname } = window.location;
	// 判断是否为ip
	let rgxIp = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/gi;
	if (rgxIp.test(hostname)) {
		return null;
	}

	if (hostname.includes('.')) {
		const hostArr = hostname.split('.');
		const domainLen = window.domainLength || 2;
		let domain = `.${hostArr.slice(hostArr.length - domainLen).join('.')}`;

		return domain;
	} else {
		return null;
	}
}

export function changeTheme(theme) {
	const themeStyles = {
		normal: {
			'@border-radius-base': '18px',
		},
		detail: {
			'@border-radius-base': '2px',
			'@btn-border-radius-base': '18px',
		},
	};
	if (!themeStyles[theme]) {
		theme = 'normal';
	}
	window.less.modifyVars(themeStyles[theme]);
}

export function matchHtmlReg(str) {
	let reg = /<\/?.+?\/?>/g;
	let brReg = /(<p><br><\/p>){1,}/gi;

	return str
		.replace(brReg, ' ')
		.replace(reg, '')
		.replace(/\&nbsp;/g, '')
		.replace(/\&lt;/g, '')
		.replace(/\&gt;/g, '')
		.replace(/\&amp;/g, '')
		.replace(/\&quot;/g, '')
		.replace(/\&copy;/g, '');
}

export function getFileSize(fileByte) {
	var fileSizeByte = fileByte;
	var fileSizeMsg = '';
	if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + ' KB';
	else if (fileSizeByte == 1048576) fileSizeMsg = ' 1MB';
	else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
		fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + ' MB';
	else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = ' 1GB';
	else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
		fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
	else if (fileSizeByte > 1073741824 && fileSizeByte == 1099511627776) fileSizeMsg = ' 1TB';
	else if (fileSizeByte > 1099511627776 && fileSizeByte < 1099511627776 * 1024)
		fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024 * 1024)).toFixed(2) + ' TB';
	else fileSizeMsg = ' More than 1PB';
	return fileSizeMsg;
}

export function formatHours(ms) {
	const hours = Math.floor(ms / (3600 * 1000));
	//计算相差分钟数
	const leave1 = ms % (3600 * 1000); //计算小时数后剩余的毫秒数
	const minutes = Math.floor(leave1 / (60 * 1000));
	//计算相差秒数
	const leave3 = leave1 % (60 * 1000); //计算分钟数后剩余的毫秒数
	const seconds = Math.round(leave3 / 1000);

	if (hours) {
		return { hours, minutes, seconds };
	} else {
		if (minutes) {
			return { minutes, seconds };
		} else {
			return { seconds };
		}
	}
}

export function checkPower(key, configs) {
	const powers = window.powers || {};
	if (typeof powers === 'undefined' || typeof configs !== 'string') {
		return false;
	}
	const configArr = configs.split('.');
	let config = powers;
	for (let index = 0; index < configArr.length; index++) {
		if (config[configArr[index]]) {
			config = config[configArr[index]];
		} else {
			return false;
		}
	}

	if (config && config.allowList && config.allowList.indexOf(key) > -1) {
		return true;
	} else {
		return false;
	}
}

export function getPowerValue(key, configs, props) {
	const powers = window.powers || {};
	if (typeof powers === 'undefined' || typeof configs !== 'string') {
		return undefined;
	}
	const configArr = configs.split('.');
	let config = window.powers;
	for (let index = 0; index < configArr.length; index++) {
		if (config[configArr[index]]) {
			config = config[configArr[index]];
		} else {
			return undefined;
		}
	}

	if (config && config.actionList && Object.keys(config.actionList).indexOf(key) > -1) {
		if (typeof props === 'undefined' || props === '') {
			return config.actionList[key];
		} else {
			if (config.actionList[key][props]) {
				return config.actionList[key][props];
			}
		}
	} else {
		return undefined;
	}
}

export function convertUUID(uuid) {
	if (typeof uuid !== 'string') {
		console.error('UUID is invalid.');
		return false;
	}

	const length = uuid.length;
	if (length === 32) {
		const a = uuid.substr(0, 8);
		const b = uuid.substr(8, 4);
		const c = uuid.substr(12, 4);
		const d = uuid.substr(16, 4);
		const e = uuid.substr(20, 12);
		return `${a}-${b}-${c}-${d}-${e}`.toLocaleLowerCase();
	} else if (length === 36) {
		return uuid.replaceAll('-', '').toLocaleLowerCase();
	} else {
		console.error('UUID format is invalid.');
		return false;
	}
}

export function convertNameToCode(name, prefix, suffix) {
	const formatedName = name.replaceAll('_', '.');
	let code = '';
	if (prefix && prefix.length > 0) {
		code = `${prefix}.`;
	}
	code = `${code}${formatedName}`;
	if (suffix && suffix.length > 0) {
		code = `${code}.${suffix}`;
	}
	return code;
}

export function getBrowser(n) {
	var ua = navigator.userAgent.toLowerCase(),
		s,
		name = '',
		ver = 0;
	//探测浏览器
	(s = ua.match(/msie ([\d.]+)/))
		? _set('ie', _toFixedVersion(s[1]))
		: (s = ua.match(/firefox\/([\d.]+)/))
		? _set('firefox', _toFixedVersion(s[1]))
		: (s = ua.match(/chrome\/([\d.]+)/))
		? _set('chrome', _toFixedVersion(s[1]))
		: (s = ua.match(/opera.([\d.]+)/))
		? _set('opera', _toFixedVersion(s[1]))
		: (s = ua.match(/version\/([\d.]+).*safari/))
		? _set('safari', _toFixedVersion(s[1]))
		: 0;

	function _toFixedVersion(ver, floatLength) {
		ver = ('' + ver).replace(/_/g, '.');
		floatLength = floatLength || 1;
		ver = String(ver).split('.');
		ver = ver[0] + '.' + (ver[1] || '0');
		ver = Number(ver).toFixed(floatLength);
		return ver;
	}
	function _set(bname, bver) {
		name = bname;
		ver = bver;
	}

	return n == 'n' ? name : n == 'v' ? ver : name + ver;
}

export function conversionPath(path) {
	if (path && path.indexOf('http') === 0) {
		return path;
	} else {
		return `/${path || ''}`.replace(/\/+/g, '/');
	}
}

export const getMessages = () => {
	const language = localStorage.getItem(configLanguage) || window.defaultLanguage;
	switch (language) {
		case 'zh-CN':
			return zh_CN;
		case 'zh-HK':
			return zh_HK;
		default:
			return en_US;
	}
};

export const intl = (() => {
	const intlProvider = new IntlProvider({
		defaultLocale: navigator.language,
		locale: navigator.language,
		messages: getMessages(),
	});

	const { intl } = intlProvider.state;

	return intl;
})();
