import { Divider, Dropdown, Menu } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import BBIcon from '../BBIcon';
import styles from './index.less';
import userImage from '../../../public/images/user.png';
import { useDispatch, useSelector } from 'react-redux';
import BBBreadcrumb from '../BBBreadcrumb';
import { Link } from 'react-router-dom';
import { formatter } from '../../utils/utils';

const GlobalHeader = ({ menuList }) => {
	const dispatch = useDispatch();
	const { globalState, userState } = useSelector((state) => ({ globalState: state.global, userState: state.user }));

	const logout = () => {
		dispatch.login.logout();
	};
	const menu = (
		<Menu className={styles.menu} selectedKeys={[]} onClick={() => {}}>
			{menuList &&
				formatter(menuList).map((item) => {
					if (typeof item.key === 'undefined') {
						return null;
					}
					return (
						<Menu.Item key={item.key}>
							<Link className={styles.menuItem} to={item.path}>
								<BBIcon type={item.icon} style={{ marginRight: 10 }} />
								<FormattedMessage id={item.name} />
							</Link>
						</Menu.Item>
					);
				})}
			{menuList && menuList.length > 0 && <Menu.Divider />}
			<Menu.Item key="logout" onClick={logout}>
				<BBIcon type="h_logout" style={{ marginRight: 10 }} />
				<FormattedMessage id="common.logout" />
			</Menu.Item>
		</Menu>
	);

	const triggerHandle = () => {
		const { collapsed } = globalState;
		dispatch.global.setCollapsed(!collapsed);
	};

	return (
		<div className={classNames(styles.header, 'globalHeader_header')}>
			<BBIcon className={classNames(styles.trigger, 'trigger')} type="menu" onClick={triggerHandle} />
			<BBBreadcrumb breadcrumbList={globalState.breadcrumbList} breadcrumbSeparator="/" linkElement={Link} />
			<div className={classNames(styles.right, 'globalHeader_right')}>
				<Dropdown overlay={menu}>
					<div className={classNames(styles.account, 'globalHeader_account')}>
						<span className={styles.userName}>{userState.user.username}</span>
						<BBIcon type="triangle-down" className={styles.userTrigger} />
						<Divider className={styles.divider} type="vertical" key="line" />
						<img className={classNames(styles.avatar, 'globalHeader_avatar')} src={userImage} />
					</div>
				</Dropdown>
			</div>
		</div>
	);
};

export default GlobalHeader;
