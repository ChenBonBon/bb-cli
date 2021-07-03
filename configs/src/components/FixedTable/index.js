import React from 'react';
import { Table } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './index.less';

const FixedTable = ({ classnames, columns, data, pagination, loading, header, withTabs, ...rest }) => {
	const [isEmpty, setIsEmpty] = useState(true);

	useEffect(() => {
		if (data instanceof Array && data.length > 0) {
			setIsEmpty(false);
		}

		return () => {
			setIsEmpty(true);
		};
	}, [data]);
	return (
		<Fragment>
			{header && <div className={styles.header}>{header}</div>}
			<Table
				className={classNames(styles.fixedTable, {
					[`${styles.noData}`]: isEmpty,
					[`${styles.withTabs}`]: withTabs,
					[`${classnames}`]: classnames,
				})}
				columns={columns}
				dataSource={data}
				pagination={
					pagination
						? { showQuickJumper: true, showSizeChanger: true, position: ['bottomCenter'], ...pagination }
						: false
				}
				scroll={{ y: true, scrollToFirstRowOnChange: true }}
				loading={loading}
				{...rest}
			></Table>
		</Fragment>
	);
};

export default FixedTable;
