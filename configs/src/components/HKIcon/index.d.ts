import * as React from 'react';
export interface IHKIconProps {
	type: string;
	className?: string;
	title?: string;
	onClick?: React.MouseEventHandler<any>;
	style?: React.CSSProperties;
}

export default class HKIcon extends React.Component<IHKIconProps, any> {}
