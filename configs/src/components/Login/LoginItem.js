import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import map from './map';

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type }) {
	return (WrappedComponent) => {
		return class BasicComponent extends Component {
			static contextTypes = {
				form: PropTypes.object,
				updateActive: PropTypes.func,
			};
			constructor(props) {
				super(props);
				this.state = {
					count: 0,
					captcha: '',
					captchaImg: '',
				};
			}
			setCaptchaInfo(res) {
				if (res.captchaImg) {
					this.setState({
						captchaImg: res.captchaImg,
					});
				}
			}

			componentDidMount() {
				if (this.props.getCaptcha) {
					this.props.getCaptcha(this.setCaptchaInfo.bind(this));
				}

				if (this.context.updateActive) {
					this.context.updateActive(this.props.name);
				}
			}

			handleReloadCaptcha() {
				if (this.props.getCaptcha) {
					this.props.getCaptcha(this.setCaptchaInfo.bind(this));
				}
			}

			componentWillUnmount() {
				clearInterval(this.interval);
			}

			render() {
				const { getFieldDecorator } = this.context.form;
				const options = {};
				let otherProps = {};
				const { onChange, defaultValue, rules, name, ...restProps } = this.props;
				options.rules = rules || defaultRules;
				if (onChange) {
					options.onChange = onChange;
				}
				if (defaultValue) {
					options.initialValue = defaultValue;
				}
				otherProps = restProps || otherProps;

				if (type === 'Captcha') {
					const inputProps = omit(otherProps, ['onGetCaptcha']);
					return (
						<FormItem>
							<Row gutter={8}>
								<Col span={16}>
									{getFieldDecorator(
										name,
										options
									)(<WrappedComponent {...defaultProps} {...inputProps} />)}
								</Col>
								<Col span={8}>
									<img
										alt="验证码"
										className={styles.getCaptcha}
										src={'data:image/png;base64,' + this.state.captchaImg}
										onClick={this.handleReloadCaptcha.bind(this)}
									/>
								</Col>
							</Row>
						</FormItem>
					);
				}
				return (
					<FormItem>
						{getFieldDecorator(name, options)(<WrappedComponent {...defaultProps} {...otherProps} />)}
					</FormItem>
				);
			}
		};
	};
}

const LoginItem = {};
Object.keys(map).forEach((item) => {
	LoginItem[item] = generator({
		defaultProps: map[item].props,
		defaultRules: map[item].rules,
		type: item,
	})(map[item].component);
});

export default LoginItem;
