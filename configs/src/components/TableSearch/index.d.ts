import React = require('react');

interface ITableSearchProps {
	/** Search外层className **/
	containerClass: string | string[];
	/** Search组件className **/
	searchClass: string | string[];
	/** Search组件placeholder **/
	placeholder: string | false;
	/** Search组件onSearch方法，入参为input框的value **/
	onSearch: (value: string) => void;
	/** 是否在blur时search，默认为false，设置为true时默认debounce delay为250ms **/
	searchOnBlur: boolean;
	/** 是否在change时search，默认为false，设置为true时默认debounce delay为250ms **/
	searchOnChange: boolean | number;
}

export default class TableSearch extends React.Component<ITableSearchProps, any> {}
