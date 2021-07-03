import { cnrs } from './contries';
import locales from './locales';

const _ = require('lodash');

function getCountriesAndRegions(language = 'zh-CN') {
	let contriesAndRegions = [];
	let contents = getLocaleContents(language);
	_.map(cnrs, (item) => {
		contriesAndRegions.push({
			...item,
			name: contents[item.code] || '',
		});
	});
	contriesAndRegions = localeSort(contriesAndRegions, language);
	return contriesAndRegions;
}

function getLocaleContents(language) {
	let contents = locales.zh_CN;
	switch (language) {
		case 'zh-CN':
			contents = locales.zh_CN;
			break;
		case 'zh-HK':
			contents = locales.zh_HK;
			break;
		case 'en-US':
			contents = locales.en_US;
			break;
	}
	return contents;
}

function localeSort(list, locale) {
	let res = list.sort((a, b) => {
		return a.name.localeCompare(b.name, locale);
	});
	return res;
}

function getCNRItemByCode(code, language = 'zh-CN') {
	let items = _.filter(cnrs, (item) => {
		return item.code === code;
	});
	if (_.isEmpty(items)) {
		return null;
	}
	let contents = getLocaleContents(language);
	return {
		...items[0],
		name: contents[language] || '',
	};
}

export { getCountriesAndRegions, getCNRItemByCode };
