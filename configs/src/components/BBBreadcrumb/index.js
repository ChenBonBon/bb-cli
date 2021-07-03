import { Breadcrumb } from 'antd';
import classNames from 'classnames';
import React, { createElement } from 'react';
import styles from './index.less';

const BBBreadcrumb = ({ breadcrumbList, breadcrumbSeparator, linkElement }) => {
	if (typeof linkElement === 'undefined') {
		linkElement = 'a';
	}

	return (
		<Breadcrumb className={classNames(styles.breadcrumb, 'breadcrumb')} separator={breadcrumbSeparator}>
			{breadcrumbList.map((item, index) => (
				<Breadcrumb.Item
					key={item.title}
					style={index === 0 ? { fontSize: '18px', fontWeight: 600 } : { fontSize: '14px', fontWeight: 400 }}
				>
					{item.href
						? createElement(
								linkElement,
								{
									[linkElement === 'a' ? 'href' : 'to']: item.href,
								},
								item.title
						  )
						: item.title}
				</Breadcrumb.Item>
			))}
		</Breadcrumb>
	);
};

export default BBBreadcrumb;
