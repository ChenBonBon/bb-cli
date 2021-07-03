import React, { Component } from 'react';
import E from 'wangeditor';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Upload, Button, Icon } from 'antd';
import styles from './editor.less';

class Editor extends Component {
	editor = null;
	static propTypes = {
		onUpload: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
		initData: PropTypes.node,
		clearEditor: PropTypes.bool,
	};

	static defaultProps = {
		initData: null,
		clearEditor: false,
	};

	state = {
		editorContent: '',
	};

	componentDidMount() {
		const { initData } = this.props;

		const elemMenu = this.refs.editorElemMenu;
		const elemBody = this.refs.editorElemBody;
		this.editor = new E(elemMenu, elemBody);

		// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
		this.editor.customConfig.onchange = (html) => {
			this.setState(
				{
					editorContent: this.editor.txt.html(),
				},
				() => this.props.onChange(this.state.editorContent)
			);
		};
		this.editor.customConfig.lang = {
			设置标题: 'Title',
			正文: 'Paragraph',
			链接: 'Link',
			链接文字: 'Link text',
			文字: 'text',
			上传图片: 'Upload image',
			上传: 'Upload',
			创建: 'Init',
			默认: 'Default',
			字号: 'Size',
			插入: 'Insert',
			对齐方式: 'Alignment',
			靠左: 'Left',
			居中: 'Center',
			靠右: 'Right',
			新浪: 'Sina',
			网络图片: 'Online image',
			字体: 'Font',
			宋体: 'Times New Roman',
			微软雅黑: 'Microsoft Yahei',
			设置列表: 'Settings list',
			有序列表: 'Ordered list',
			无序列表: 'Unordered list',
			// 还可自定添加更多
		};
		this.editor.customConfig.menus = [
			'head', // 标题
			'bold', // 粗体
			'fontSize', // 字号
			'fontName', // 字体
			'italic', // 斜体
			'underline', // 下划线
			'strikeThrough', // 删除线
			// 'foreColor',  // 文字颜色
			// 'backColor',  // 背景颜色
			'link', // 插入链接
			'list', // 列表
			'justify', // 对齐方式
			'quote', // 引用
			'emoticon', // 表情
			'image', // 插入图片
			// 'table',  // 表格
			// 'video',  // 插入视频
			// 'code',  // 插入代码
			// 'undo',  // 撤销
			// 'redo'  // 重复
		];
		this.editor.customConfig.uploadImgShowBase64 = true;

		this.editor.create();

		if (initData) {
			this.editor.txt.html(initData);
		}
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.clearEditor && prevProps.clearEditor !== this.props.clearEditor) {
			this.editor.txt.clear();
		}
	}

	uploadDispatch(option) {
		const callback = (link) => {
			this.editor.txt.append(`<p><a href=${link}>${option.file.name}</a></p>`);
			this.editor.customConfig.onchange();
		};

		let formData = new FormData();

		if (option.data) {
			Object.keys(option.data).map((key) => {
				formData.append(key, option.data[key]);
			});
		}
		formData.append(option.filename, option.file);

		this.props.onUpload(formData, callback);
	}

	setData(data) {
		this.editor.txt.html(data);
	}

	render() {
		const that = this;
		const props = {
			showUploadList: false,
			accept: '.pdf,.jpg,.jpeg,.png, .txt',
			customRequest(option) {
				let reader = new FileReader();
				reader.onload = function (e) {
					let fileBase64 = this.result;
					option.fileBase64 = fileBase64;
					that.uploadDispatch(option);
				};
				reader.readAsDataURL(option.file);
			},
		};

		return (
			<div className={styles.editorContainer}>
				<div className="text-area">
					<div ref="editorElemMenu" className={styles.editorMenu}></div>
					<div ref="editorElemBody" className={styles.editorBody}></div>
				</div>
				<Upload {...props} className={styles.uploadBox}>
					<Button size="small">
						<Icon type="upload" />
						<FormattedMessage id="common.button.upload" />
					</Button>
				</Upload>
			</div>
		);
	}
}

export default Editor;
