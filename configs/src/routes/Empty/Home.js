import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { conversionPath } from '../../utils/utils';

const Home = () => {
	const history = useHistory();
	const globalState = useSelector((state) => state.global);
	const { mainMenus } = globalState;

	useEffect(() => {
		if (mainMenus[0]) {
			history.push(conversionPath(mainMenus[0].path));
		}
	}, [mainMenus]);

	return <Fragment></Fragment>;
};

export default Home;
