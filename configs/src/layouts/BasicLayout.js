import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import BBSiderMenu from '../components/BBSiderMenu';
import GlobalHeader from '../components/GlobalHeader';
import AsyncComponent from '../components/AsyncComponent';
import routers from '../routers';
import { useSelector } from 'react-redux';
import Logo from '../components/Logo';
import CommonFooter from '../components/CommonFooter';
import styles from './BasicLayout.less';

const { footerColumns, footerContainerStyle } = global;
const { Header, Footer, Sider, Content } = Layout;

const BasicLayout = () => {
	const globalState = useSelector((state) => state.global);
	const { collapsed, mainMenus, topMenus } = globalState;

	return (
		<Layout className={styles.container}>
			<Sider trigger={null} collapsible collapsed={collapsed} width={256}>
				<div className={styles.logoContainer}>{!collapsed && <Logo src={window.logo} />}</div>
				<BBSiderMenu menuList={mainMenus} collapsed={collapsed} />
			</Sider>
			<Layout>
				<Header className={styles.header}>
					<GlobalHeader menuList={topMenus} />
				</Header>
				<Content className={styles.mainContent}>
					<Switch>
						{routers.map((route) => (
							<Route key={route.path} path={route.path} exact>
								<AsyncComponent path={route.path} component={route.component} />
							</Route>
						))}
					</Switch>
				</Content>
				<Footer>
					<CommonFooter columns={footerColumns} containerStyle={footerContainerStyle} />
				</Footer>
			</Layout>
		</Layout>
	);
};

export default BasicLayout;
