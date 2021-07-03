import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LoginSubmit from './LoginSubmit';
import { useIntl } from 'react-intl';
import styles from './Login.less';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const { Item: FormItem } = Form;

const LoginForm = ({ loginLoading }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [form] = Form.useForm();
	const intl = useIntl();

	const login = async () => {
		try {
			const values = await form.validateFields();
			dispatch.login.login({
				payload: {
					...values,
				},
				callback: () => {
					history.push('/');
				},
			});
		} catch (errors) {}
	};

	return (
		<Form form={form}>
			<FormItem
				name="username"
				rules={[{ required: true, message: intl.formatMessage({ id: 'common.enter.account' }) }]}
			>
				<Input
					size="large"
					prefix={<UserOutlined className={styles.prefixIcon} />}
					placeholder={intl.formatMessage({ id: 'common.account' })}
					className={styles.loginInput}
				/>
			</FormItem>
			<FormItem
				name="password"
				rules={[{ required: true, message: intl.formatMessage({ id: 'common.enter.password' }) }]}
			>
				<Input
					size="large"
					prefix={<LockOutlined className={styles.prefixIcon} />}
					type="password"
					placeholder={intl.formatMessage({ id: 'common.password' })}
					className={styles.loginInput}
				/>
			</FormItem>
			<LoginSubmit
				className={styles.submit}
				loading={loginLoading}
				onClick={() => {
					login();
				}}
			>
				{intl.formatMessage({ id: 'common.login' })}
			</LoginSubmit>
		</Form>
	);
};

export default LoginForm;
