import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { createBrowserHistory } from 'history';
import { IntlProvider } from 'react-intl';
import LoginLayout from '../layouts/LoginLayout';
import AuthorizeRoute from '../components/AuthorizeRoute';
import BasicLayout from '../layouts/BasicLayout';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { getMessages } from '../utils/utils';

const browserHistory = createBrowserHistory();

const App = () => {
	const dispatch = useDispatch();

	useEffectOnce(() => {
		dispatch.user.fetchUser({
			callback: () => {},
		});

		dispatch.global.setMenus([
			{ code: 'home', id: 1, pos: 'main' },
			{ code: 'about', id: 2, pos: 'main' },
			{ code: 'users', id: 3, pos: 'main' },
		]);
	});

	return (
		<IntlProvider messages={getMessages()} locale={navigator.language} defaultLocale={navigator.language}>
			<Router history={browserHistory}>
				<Switch>
					<Route key="/user/login" path="/user/login" exact>
						<LoginLayout />
					</Route>
					<AuthorizeRoute path="/">
						<BasicLayout />
					</AuthorizeRoute>
				</Switch>
			</Router>
		</IntlProvider>
	);
};

export default hot(App);
