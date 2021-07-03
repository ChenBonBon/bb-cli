import * as React from 'react';

export interface ICommonFooterColumn {
	rows: Array<ICommonFooterRow>;
	style?: React.CSSProperties;
}

export interface ICommonFooterRow {
	type: 'link' | 'image' | 'text' | 'copyright';
	value?: string;
	src?: string;
	href?: string;
	code?: string;
	alt?: string;
	style?: React.CSSProperties;
}

export interface ICommonFooterProps {
	columns: Array<ICommonFooterColumn>;
	style?: React.CSSProperties;
}

export default class CommonFooter extends React.Component<ICommonFooterProps, any> {}
