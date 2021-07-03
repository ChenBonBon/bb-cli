import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useToggle } from 'react-use';
import CommonFooter from '../components/CommonFooter';
import LoginPage from '../routes/Login/LoginPage';
import { useSelector } from 'react-redux';
import styles from './LoginLayout.less';
import { useEffectOnce } from 'react-use';
import { FormattedMessage } from 'react-intl';
import LangSelect from '../routes/Login/LangSelect';

const { background, footerColumns, footerContainerStyle } = global;

const LoginLayout = () => {
	const [logoError, toggle] = useToggle(false);
	const loginState = useSelector((state) => state.login);
	const { state } = useLocation();
	const [backgroundPath, setBackgroundPath] = useState(null);

	const logoErrorHandle = () => {
		toggle();
	};

	useEffectOnce(() => {
		const img = document.createElement('img');
		const imgErrorHandle = (e) => {
			setBackgroundPath(null);
			window.background = null;
		};
		const imgLoadHandle = (e) => {
			setBackgroundPath(background);
			window.background = background;
		};

		img.src = background;
		img.addEventListener('error', imgErrorHandle);
		img.addEventListener('load', imgLoadHandle);

		return () => {
			img.removeEventListener('error', imgErrorHandle);
			img.removeEventListener('load', imgLoadHandle);
		};
	});

	if (loginState.status) {
		return <Redirect to={state?.from || '/'} />;
	}

	return (
		<div className={styles.container} style={{ backgroundImage: backgroundPath ? `url(${backgroundPath})` : '' }}>
			<div className={styles.content}>
				<div className={styles.top}>
					<div className={styles.header}>
						<Link to="/">
							{logoError ? (
								<div className={styles.logoTransparent}></div>
							) : (
								<img
									style={{ width: 320 }}
									alt="logo"
									className={styles.logo}
									src={loginLogo}
									onError={logoErrorHandle}
								/>
							)}
						</Link>
						<p className={styles.subTitle}>
							<FormattedMessage id="common.system.name" />
						</p>
					</div>
				</div>
				<LoginPage />
				<LangSelect />
			</div>
			<CommonFooter columns={footerColumns} containerStyle={footerContainerStyle} />
		</div>
	);
};

export default LoginLayout;
