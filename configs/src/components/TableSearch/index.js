import React, { useState, useRef, useReducer } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';
import { useDebounce } from 'react-use';
import styles from './index.less';
import BBIcon from '../BBIcon';
import { useIntl } from 'react-intl';

const { Search } = Input;

const TableSearch = ({ containerClass, searchClass, placeholder, onSearch, searchOnBlur, searchOnChange, ...rest }) => {
	const intl = useIntl();
	const [state, setState] = useState('');
	const [count, dispatch] = useReducer((state) => {
		return state + 1;
	}, 0);
	const mountedRef = useRef(false);
	let containerClassStr = '';
	let searchClassStr = '';
	let delay = 250;

	if (containerClass instanceof Array) {
		containerClassStr = containerClass.join(',');
	} else if (typeof containerClass === 'string') {
		containerClassStr = containerClass;
	}

	if (searchClass instanceof Array) {
		searchClassStr = searchClass.join(',');
	} else if (typeof searchClass === 'string') {
		searchClassStr = searchClass;
	}

	if (typeof placeholder !== 'string') {
		placeholder = intl.formatMessage({ id: 'common.please.input' });
	}

	if (typeof searchOnChange === 'number') {
		delay = searchOnChange;
	}

	useDebounce(
		() => {
			if (mountedRef.current) {
				onSearch(state);
				return false;
			}

			mountedRef.current = true;
		},
		delay,
		[state, count]
	);

	return (
		<div className={classNames(styles.tableSearch, containerClassStr)}>
			<Search
				className={classNames(styles.tableSearchInput, 'tableSearchInput', searchClassStr)}
				placeholder={placeholder}
				onSearch={() => {
					if (typeof onSearch !== 'function') {
						console.error('TableSearch: onSearch is invalid.');
						return false;
					}
					dispatch();
				}}
				onBlur={() => {
					if (searchOnBlur) {
						dispatch();
					}
				}}
				onChange={(e) => {
					const value = e.currentTarget.value;
					if (!!searchOnChange) {
						setState(value);
					}
				}}
				{...rest}
			/>
		</div>
	);
};

export default TableSearch;
