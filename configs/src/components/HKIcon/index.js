import React from 'react';
import classNames from 'classnames';

export default function HKIcon({ className, type, title, onClick, style }) {
	const clsString = classNames(
		{
			hkicon: true,
			[`hkicon-${type}`]: true,
		},
		className
	);
	return <i className={clsString} style={style} title={title} onClick={onClick} />;
}
