const yaml = require('yamljs');
const fs = require('fs');
const path = require('path');

let jsonObject;
try {
	jsonObject = yaml.parse(fs.readFileSync(path.resolve(__dirname, './i18n.yml'), 'utf-8'));
} catch (e) {
	console.log(e);
}

const objectArray = {};

for (let key in jsonObject) {
	for (let lang in jsonObject[key]) {
		objectArray[lang] = objectArray[lang] || {};
		objectArray[lang][key] = jsonObject[key][lang];
	}
}

if (!fs.existsSync(path.resolve(__dirname, './locales'))) {
	fs.mkdirSync(path.resolve(__dirname, './locales'));
}

// 分别导出成多个不同语言国家的文件
for (let key in objectArray) {
	fs.writeFileSync(path.resolve(__dirname, `./locales/${key}.json`), JSON.stringify(objectArray[key]));
}
