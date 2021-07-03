import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import HeaderDropdown from '../../components/HeaderDropdown';
import styles from './Login.less';

const { configLanguage, defaultLanguage } = global;
const { Item: MenuItem } = Menu;

const LangSelect = () => {
	const [selectedLang, setSelectedLang] = useState(
		localStorage.getItem(configLanguage) ? localStorage.getItem(configLanguage) : defaultLanguage
	);

	const locales = ['zh-CN', 'zh-HK', 'en-US'];
	const languageLabels = {
		'zh-CN': '简体中文',
		'zh-HK': '繁体中文',
		'en-US': 'English',
	};
	const displayLang = {
		'zh-CN': '简',
		'zh-HK': '繁',
		'en-US': 'EN',
	}[selectedLang];

	const changeLang = ({ key }) => {
		setSelectedLang(key);
		localStorage.setItem(configLanguage, key);
		window.location.reload();
	};

	useEffectOnce(() => {
		if (localStorage.getItem(configLanguage) === null) {
			localStorage.setItem(configLanguage, defaultLanguage);
		}
	});

	return (
		<div className={styles.changeLanguage}>
			<div style={{ position: 'absolute', top: 20, right: 30 }}>
				<HeaderDropdown
					style={{ position: 'absolute' }}
					overlay={
						<Menu
							className={styles.menu}
							selectedKeys={selectedLang}
							onClick={(e) => {
								changeLang(e);
							}}
						>
							{locales.map((locale) => {
								return (
									<MenuItem key={locale}>
										<span role="img" aria-label={languageLabels[locale]}></span>{' '}
										{languageLabels[locale]}
									</MenuItem>
								);
							})}
						</Menu>
					}
					placement="bottomRight"
				>
					<span className={classNames('langDropDown', styles.langDropDown)}>
						<GlobalOutlined className={classNames('icon', styles.icon)} />
						{displayLang}
					</span>
				</HeaderDropdown>
			</div>
		</div>
	);
};

export default LangSelect;
