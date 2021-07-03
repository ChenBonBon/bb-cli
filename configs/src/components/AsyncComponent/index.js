import loadable from '@loadable/component';

const AsyncComponent = loadable(({ component }) => import(`../../routes/${component}`), {
	cacheKey: ({ path }) => path,
});

export default AsyncComponent;
