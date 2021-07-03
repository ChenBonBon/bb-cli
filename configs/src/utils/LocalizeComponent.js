/**
 * https://github.com/formatjs/react-intl/issues/983#issuecomment-342314143
 */

import { intlShape } from 'react-intl';

/** @type {intlShape} */
var intl;

/** React component to capture the context.  */
export function IntlCapture(props, context) {
	// Other examples show this access being done in `componentWillMount`.
	// This works just fine.
	intl = context.intl;
	// Done. Just return the children to be rendered.
	return props.children;
}

IntlCapture.contextTypes = {
	intl: intlShape.isRequired,
};

/** This is the wrapper for `intl` where I expose its functionality. */
class _Intl {
	t(message, values) {
		return intl.formatMessage(message, values);
	}
	// ...
	async load(locale) {
		// ... some code to fetch a locale translation file from `/locales/${locale}.json`.
	}
}
const Intl = new _Intl();
export default Intl;
