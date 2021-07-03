const { CRMApi } = global;

export const urlGenerator = (url, params) => {
	const paramArr = [];
	if (typeof params === 'undefined') {
		params = {};
	}

	for (let key in params) {
		let values = '';
		if (params[key] instanceof Array) {
			values = params[key].map((item) => encodeURIComponent(decodeURIComponent(item)));
		} else {
			values = encodeURIComponent(decodeURIComponent(params[key]));
		}

		if (values instanceof Array) {
			values.forEach((value) => {
				if (value !== '') {
					paramArr.push(`${key}=${value}`);
				}
			});
		} else if (values !== '') {
			paramArr.push(`${key}=${values}`);
		}
	}

	const paramStr = paramArr.join('&');
	let result = url;
	if (paramStr !== '') {
		result = `${result}?${paramStr}`;
	}

	return result;
};

// login
export function loginUrl() {
	return urlGenerator(`${CRMApi}/login`);
}

// account
export function fetchUserUrl() {
	return urlGenerator(`${CRMApi}/account/profile`);
}
