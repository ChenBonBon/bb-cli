import React from 'react';
import { Button, Form } from 'antd';
import classNames from 'classnames';
import styles from './Login.less';

const FormItem = Form.Item;

const LoginSubmit = ({ className, ...rest }) => {
	const clsString = classNames(styles.submit, className);
	return <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />;
};

export default LoginSubmit;
