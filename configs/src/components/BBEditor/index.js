import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './index.less';

export default class BBEditor extends Component {
	constructor(props) {
		super(props);
		let { html } = this.props;

		const contentBlock = htmlToDraft(html);
		if (contentBlock) {
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			this.state = {
				editorState,
			};
		}
	}

	onEditorStateChange(editorState) {
		let { onChange } = this.props;
		this.setState({
			editorState,
		});
		if (typeof onChange === 'function') {
			let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
			onChange(html);
		}
	}

	render() {
		const { editorState } = this.state;
		return (
			<Editor
				editorState={editorState}
				localization={{ locale: 'en' }}
				wrapperClassName={styles.editorWrapper}
				editorClassName={styles.editor}
				toolbarClassName={styles.editorToolbar}
				toolbar={{
					fontFamily: {
						options: [
							'Microsoft YaHei',
							'SimSun',
							'NSimSun',
							'FangSong_GB2312',
							'KaiTi_GB2312',
							'SimHei',
							'Arial',
							'Georgia',
							'Impact',
							'Tahoma',
							'Times New Roman',
							'Verdana',
						],
					},
					image: {
						uploadEnabled: true,
						uploadCallback: function () {
							console.log(666);
						},
					},
				}}
				onEditorStateChange={this.onEditorStateChange.bind(this)}
			/>
		);
	}
}
