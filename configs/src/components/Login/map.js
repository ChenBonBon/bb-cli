import React from 'react';
import { Input, Icon } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import styles from './index.less';
import PropTypes from 'prop-types';
import BBIcon from '../BBIcon';

const map = {
	UserName: {
		component: Input,
		props: {
			size: 'large',
			prefix: <Icon type="user" className={styles.prefixIcon} />,
			placeholder: 'account',
		},
		rules: [
			{
				required: true,
				whitespace: true,
				message: <FormattedMessage id="please.enter.account" />,
			},
		],
	},
	Password: {
		component: Input,
		props: {
			size: 'large',
			prefix: <Icon type="lock" className={styles.prefixIcon} />,
			type: 'password',
			placeholder: 'password',
		},
		rules: [
			{
				required: true,
				whitespace: true,
				message: <FormattedMessage id="enter.password" />,
			},
		],
	},
	Captcha: {
		component: Input,
		props: {
			size: 'large',
			prefix: <BBIcon type="verify" className={styles.prefixIcon} />,
			placeholder: '验证码',
		},
		rules: [
			{
				required: true,
				whitespace: true,
				message: '请输入验证码!',
			},
		],
	},
};

export default map;
