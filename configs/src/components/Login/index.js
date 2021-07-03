import React, { Component, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { Form, Tabs, Menu, Icon } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';
import HeaderDropdown from '../HeaderDropdown';
import Intl from '../../utils/LocalizeComponent';
import styles from './index.less';

const { configLanguage, defaultLanguage } = global;

const Login = ({ children, className, defaultActiveKey, onTabChange, onSubmit }) => {
	const [type, setType] = useState(defaultActiveKey);
	const [tabs, setTabs] = useState([]);
	const [active, setActive] = useState({});
	const [selectedLang, setSelectedLang] = useState(
		localStorage.getItem(configLanguage) ? localStorage.getItem(configLanguage) : defaultLanguage
	);
	const [form] = Form.useForm();

	const TabChildren = [];
	const otherChildren = [];

	React.Children.forEach(children, (item) => {
		if (!item) {
			return;
		}
		if (item.type.__ANT_PRO_LOGIN_TAB) {
			TabChildren.push(item);
		} else {
			otherChildren.push(item);
		}
	});

	const changeLang = ({ key }) => {
		setSelectedLang(key);
		localStorage.setItem(configLanguage, key);
		window.location.reload();
	};

	const onSwitch = (type) => {
		setType(type);
		onTabChange(type);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const activeFileds = active[type];
		form.validateFields(activeFileds, { force: true }, (err, values) => {
			onSubmit(err, values);
		});
	};

	const LangMenu = () => {
		return (
			<Menu
				className={styles.menu}
				selectedKeys={selectedLang}
				onClick={() => {
					changeLang();
				}}
			>
				{locales.map((locale) => {
					return (
						<Menu.Item key={locale}>
							<span role="img" aria-label={languageLabels[locale]}></span> {languageLabels[locale]}
						</Menu.Item>
					);
				})}
			</Menu>
		);
	};

	return (
		<div className={classNames(className, styles.changeLanguage)}>
			<div style={{ position: 'absolute', top: 20, right: 30 }}>
				<HeaderDropdown style={{ position: 'absolute' }} overlay={LangMenu} placement="bottomRight">
					<span className={classNames('langDropDown', styles.langDropDown)}>
						<Icon
							type="global"
							title={Intl.t({ id: 'common.lang' })}
							className={classNames('icon', styles.icon)}
						/>
						{displayLang}
					</span>
				</HeaderDropdown>
			</div>
			<div className={classNames(className, styles.login)}>
				<Form
					onSubmit={() => {
						handleSubmit();
					}}
				>
					{tabs.length ? (
						<div>
							<Tabs
								animated={false}
								className={styles.tabs}
								activeKey={type}
								onChange={() => {
									onSwitch();
								}}
							>
								{TabChildren}
							</Tabs>
							{otherChildren}
						</div>
					) : (
						[...children]
					)}
				</Form>
			</div>
		</div>
	);
};

export default Login;
