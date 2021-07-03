import { Form } from 'antd';
import React, { useState } from 'react';
import { useToggle } from 'react-use';
import LoginForm from './LoginForm';
import Verification from './Verification';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './Login.less';

const { enableTwoStepVerification } = global;

const LoginPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [form] = Form.useForm();
	const [timer, setTimer] = useState(null);
	const [loginInfo, setLoginInfo] = useState({
		usename: '',
		password: '',
	});
	const [visible, toggle] = useToggle(false);

	const login = async () => {
		try {
			const values = await form.validateFields();
			const { verificationCode } = values;
			dispatch.login.login({
				payload: {
					...loginInfo,
					verificationCode,
				},
				callback: () => {
					clearInterval(timer);
					setTimer(null);
					history.push('/');
				},
			});
		} catch (error) {}
	};

	return (
		<div className={styles.main}>
			<LoginForm toggle={toggle} setLoginInfo={setLoginInfo} timer={timer} />
			{enableTwoStepVerification && visible && (
				<Verification form={form} visible={visible} toggle={toggle} okHandle={login} />
			)}
		</div>
	);
};

export default LoginPage;
