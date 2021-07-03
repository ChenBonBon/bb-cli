import { createModel } from '@rematch/core';
import { mainMenuMap, topMenuMap } from '../menus';

const global = createModel()({
	state: {
		collapsed: false,
		mainMenus: [],
		topMenus: [],
		breadcrumbList: [],
	},
	reducers: {
		setCollapsed: (state, payload) => {
			return {
				...state,
				collapsed: payload,
			};
		},
		setMenus: (state, payload) => {
			const menuObj = {};
			const topMenuObj = {};

			(payload || []).forEach((menu, index) => {
				const { code, parent_code, pos } = menu;
				if (pos === 'main') {
					const menuDetail = { ...mainMenuMap[code], index };
					if (parent_code) {
						const parent = menuObj[parent_code];
						if (parent) {
							const { index, key, name, path } = menuDetail;
							if (parent.children) {
								parent.children.push({ index, key, name, path });
							} else {
								parent.children = [{ index, key, name, path }];
							}
						} else {
							menuObj[code] = {
								...mainMenuMap[parent_code],
								...menuDetail,
								path: `${mainMenuMap[parent_code].path}/${menuDetail.path}`,
							};
						}
					} else {
						menuObj[code] = menuDetail;
					}
				} else {
					const topMenuDetail = { ...topMenuMap[code], index };
					topMenuObj[code] = topMenuDetail;
				}
			});

			const mainMenus = Object.values(menuObj).sort((a, b) => {
				return a.index - b.index;
			});

			const topMenus = Object.values(topMenuObj).sort((a, b) => {
				return a.index - b.index;
			});

			return {
				...state,
				mainMenus,
				topMenus,
			};
		},
		setBreadcrumbList: (state, breadcrumbList) => {
			return {
				...state,
				breadcrumbList,
			};
		},
	},
	effects: (dispatch) => ({}),
});

export default global;
