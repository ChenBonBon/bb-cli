import { init } from '@rematch/core';
import loadingPlugin from '@rematch/loading';
import models from './models';

const store = init({
	models,
	plugins: [loadingPlugin()],
});

export default store;
