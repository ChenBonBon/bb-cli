import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { FormattedMessage } from 'react-intl';
import BBIcon from '../BBIcon';
import { urlToList } from '../utils/pathTools';
import styles from './index.less';
import classNames from 'classnames';
import { conversionPath, formatter } from '../../utils/utils';

const { Item: MenuItem, SubMenu } = Menu;
const BBSiderMenu = ({ menuList, collapsed }) => {
	const [openKeys, setOpenKeys] = useState([]);
	const [flatMenuKeys, setFlatMenuKeys] = useState([]);
	const [hoverKey, setHoverKey] = useState('');

	const getIcon = (icon) => {
		if (typeof icon === 'string' && icon.indexOf('http') === 0) {
			return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
		}
		if (typeof icon === 'string') {
			return <BBIcon type={icon} className="bb-menu-icon" />;
		}
		return '';
	};

	const getDefaultCollapsedSubMenus = () => {
		const { pathname } = location;
		return urlToList(pathname)
			.map((item) => {
				return getMeunMatcheys(item)[0];
			})
			.filter((item) => item);
	};

	const getMeunMatcheys = (path) => {
		return flatMenuKeys.filter((item) => {
			return pathToRegexp(item).test(path);
		});
	};

	const getFlatMenuKeys = (menus) => {
		let keys = [];
		menus.forEach((item) => {
			if (item.children) {
				keys = keys.concat(getFlatMenuKeys(item.children));
			}
			keys.push(item.path);
		});

		return keys;
	};

	const getSelectedMenuKeys = () => {
		const { pathname } = location;
		return urlToList(pathname).map((itemPath) => getMeunMatcheys(itemPath).pop());
	};

	useEffect(() => {
		setFlatMenuKeys(getFlatMenuKeys(formatter(menuList)));
	}, [menuList]);

	useEffect(() => {
		setOpenKeys(getDefaultCollapsedSubMenus());
	}, [flatMenuKeys]);

	let selectedKeys = getSelectedMenuKeys();
	if (!selectedKeys.length) {
		selectedKeys = [openKeys[openKeys.length - 1]];
	}

	return (
		<Menu mode="inline" openKeys={openKeys} selectedKeys={selectedKeys} className={styles.siderMenu}>
			{formatter(menuList).map((menu) => {
				const { name, path, icon, selectedIcon, children } = menu;
				if (children && children.length > 0) {
					return (
						<SubMenu
							key={path}
							icon={getIcon(icon)}
							title={<FormattedMessage id={name} />}
							className={classNames(styles.menuItem, { [styles.collapsed]: collapsed })}
							onTitleClick={({ key }) => {
								setOpenKeys([...openKeys, key]);
							}}
						>
							{children.map((child) => {
								const { path, name } = child;
								return (
									<MenuItem key={path}>
										<Link to={conversionPath(path)}>
											<div>
												<FormattedMessage id={name} />
											</div>
										</Link>
									</MenuItem>
								);
							})}
						</SubMenu>
					);
				}
				return (
					<MenuItem
						key={path}
						onMouseOver={() => {
							setHoverKey(path);
						}}
						onMouseOut={() => {
							setHoverKey('');
						}}
						onClick={() => {
							setOpenKeys([...openKeys, path]);
						}}
					>
						<Link to={conversionPath(path)}>
							<div
								className={classNames(styles.menuItem, {
									[styles.collapsed]: collapsed,
								})}
							>
								{hoverKey === path || selectedKeys[selectedKeys.length - 1] === path
									? getIcon(selectedIcon)
									: getIcon(icon)}
								<FormattedMessage id={name} />
							</div>
						</Link>
					</MenuItem>
				);
			})}
		</Menu>
	);
};

export default BBSiderMenu;
