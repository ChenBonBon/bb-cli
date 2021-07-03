import { createModel } from '@rematch/core';
import { config } from '../config';
import { Post } from '../request/request';
import { loginUrl } from '../urls';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const login = createModel()({
	state: {
		status: false,
		username: '',
	},
	reducers: {
		setStatus: (state, status) => {
			return {
				...state,
				status,
			};
		},
		setUsername: (state, username) => {
			return {
				...state,
				username,
			};
		},
	},
	effects: (dispatch) => {
		return {
			async login({ payload, callback }) {
				try {
					const loginRes = await Post(loginUrl(), payload);
					if (loginRes) {
						if (loginRes.resetPasswordToken) {
							history.push(`/user/resetPassword?token=${loginRes.resetPasswordToken}`);
							return;
						}
						if (loginRes.token) {
							const token = loginRes.token;
							localStorage.setItem(config.csrfTokenName, token);
							dispatch.login.setStatus(true);
							dispatch.user.fetchUser({});
						}

						if (callback) {
							callback();
						}
					}
				} catch (error) {
					console.error(error);
				}
			},
			logout() {
				dispatch.login.setStatus(false);
				localStorage.removeItem(config.cookieName);
				localStorage.removeItem(config.csrfTokenName);
				history.push('/user/login');
			},
		};
	},
});

export default login;
