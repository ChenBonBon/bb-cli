import Axios from 'axios';
import { config } from '../config';
import store from '../store';
import { intl } from '../utils/utils';
import errorCode from './errorCode';
import { message } from 'antd';

const { configLanguage } = global;

const request = Axios.create({
	timeout: 10000,
	withCredentials: false,
});

const logout = () => {
	store.dispatch.login.setStatus(false);
	localStorage.removeItem(config.cookieName);
	localStorage.removeItem(config.csrfTokenName);
};

if (
	localStorage.getItem(configLanguage) &&
	localStorage.getItem(configLanguage) !== null &&
	localStorage.getItem(configLanguage) !== undefined
) {
	request.defaults.headers.common['Accept-Language'] = localStorage.getItem(configLanguage);
}

request.interceptors.request.use((configs) => {
	const token = localStorage.getItem(config.csrfTokenName);
	if (token) {
		configs.headers.common['Authorization'] = token;
	} else {
		logout();
	}

	return configs;
});

request.interceptors.response.use(
	(response) => {
		return Promise.resolve(response.data);
	},
	(error) => {
		if (error.response) {
			const { data, status } = error.response;
			if (status === 401) {
				logout();
				return;
			}
			const { details } = data;
			if (details && details.length > 0) {
				const { code, metadata } = details[0];

				const errorId = errorCode[code].id;
				const errorValue = errorCode[code].value;
				let value = '';

				if (metadata && Object.keys(metadata).length > 0) {
					if (errorValue) {
						value = metadata[errorValue];
					}
				}
				message.error(intl.formatMessage({ id: errorId }, { value }));
			} else {
				message.error(data.message);
			}
		}
	}
);

const { get: Get, post: Post, put: Put, patch: Patch, delete: Delete } = request;

export { Get, Post, Put, Patch, Delete };
