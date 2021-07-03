import { createModel } from '@rematch/core';
import { Get } from '../request/request';
import { fetchUserUrl } from '../urls';

const user = createModel()({
	state: {
		user: {},
	},
	reducers: {
		setUser: (state, payload) => {
			return {
				...state,
				user: payload,
			};
		},
	},
	effects: (dispatch) => {
		return {
			async fetchUser({ callback }) {
				try {
					const res = await Get(fetchUserUrl());
					if (res) {
						dispatch.login.setStatus(true);
						dispatch.user.setUser(res);
						if (callback) {
							callback(res);
						}
					}
				} catch (error) {
					console.log(error);
				}
			},
		};
	},
});

export default user;
