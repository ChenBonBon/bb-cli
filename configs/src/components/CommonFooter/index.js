import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { CopyrightOutlined } from '@ant-design/icons';
import styles from './index.less';

const DEFAULT_COLUMNS = [
	{
		rows: [
			{ type: 'link', value: '沪ICP备16013332号', href: 'http://www.miit.gov.cn/', style: {} },
			{ type: 'link', code: 'terms.condition.translate', href: 'https://xdp.basebit.me/home/privacy', style: {} },
		],
		style: {},
	},
	{
		rows: [
			{ type: 'text', value: '沪公网安备31010502003244号', style: {} },
			{ type: 'copyright', style: {} },
		],
		style: {},
	},
];

const DEFAULT_CONTAINER_STYLE = { padding: '20px 35%' };

const CommonFooter = ({ containerStyle, columns }) => {
	const _columns = columns || DEFAULT_COLUMNS;
	const _containerStyle = containerStyle || DEFAULT_CONTAINER_STYLE;
	return (
		<div className={classNames(styles.container, 'commonFooterContainer')} style={_containerStyle}>
			{_columns.map((column, columnIndex) => {
				const { rows, style: columnStyle } = column;
				return (
					<div key={columnIndex} className="commonFooterColumn" styles={columnStyle}>
						{rows.map((row, rowIndex) => {
							const { type, value, href, src, alt, code, style: rowStyle, target } = row;
							if (type === 'text') {
								return (
									<div key={rowIndex} className="commonFooterRowText" style={rowStyle}>
										{value}
									</div>
								);
							} else if (type === 'image') {
								return (
									<a
										key={rowIndex}
										className="commonFooterRowImageLink"
										href={href}
										target={target}
										style={rowStyle}
									>
										<img className="commonFooterRowImage" src={src} alt={alt} />
									</a>
								);
							} else if (type === 'link') {
								return (
									<div key={rowIndex}>
										<a className="commonFooterRowLink" href={href} target={target} style={rowStyle}>
											{value || (code && <FormattedMessage id={code} />)}
										</a>
									</div>
								);
							} else if (type === 'copyright') {
								return (
									<div key={rowIndex} className="commonFooterRowCopyright" style={rowStyle}>
										<FormattedMessage
											id="common.copyright"
											values={{ icon: <CopyrightOutlined />, value: value || '2021 Basebit' }}
										/>
									</div>
								);
							}
						})}
					</div>
				);
			})}
		</div>
	);
};

export default CommonFooter;
