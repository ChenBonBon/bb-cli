import React from 'react';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import { useIntl } from 'react-intl';
import styles from './Login.less';
import BBIcon from '../../components/BBIcon';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

const { Item: FormItem } = Form;

const Verification = ({ login: { username }, form, visible, toggle, okHandle, fetchLoading }) => {
	const dispatch = useDispatch();
	const intl = useIntl();
	const [timer, setTimer] = useState(null);
	const [sended, setSended] = useState(false);
	const [buttonText, setButtonText] = useState(intl.formatMessage({ id: 'sending.code' }));

	const fetchCode = () => {
		dispatch.login.sendVerificationCode({
			username,
			callback: (res) => {
				setSended(true);

				let count = 60;
				const timer = setInterval(() => {
					if (count > 1) {
						count--;
						setButtonText(`${count}s`);
					} else {
						setButtonText(intl.formatMessage({ id: 'resend.code' }));
						clearInterval(timer);
						setTimer(null);
					}
				}, 1000);

				setTimer(timer);
				message.success(intl.formatMessage({ id: 'send.success' }));
			},
		});
	};

	useEffect(() => {
		if (visible && !timer && username) {
			setSended(false);
			fetchCode();
		}
	}, [visible, username]);

	return (
		<Modal
			title={intl.formatMessage({ id: 'verification.code' })}
			destroyOnClose={true}
			visible={visible}
			onCancel={() => {
				toggle();
			}}
			footer={
				<div className={styles.modalFooter}>
					<Button
						disabled={
							!sended ||
							!form.getFieldValue('verificationCode') ||
							form.getFieldValue('verificationCode').length === 0
						}
						type="primary"
						onClick={() => {
							okHandle();
						}}
						className={styles.modalFooterBtn}
					>
						{intl.formatMessage({ id: 'common.button.submit' })}
					</Button>
					<Button
						onClick={() => {
							toggle();
						}}
					>
						{intl.formatMessage({ id: 'common.button.cancel' })}
					</Button>
				</div>
			}
			maskClosable={false}
		>
			<div className={styles.modalContent}>
				<div className={styles.modalText}>
					{intl.formatMessage({ id: 'login.two.step.verification.message' })}
				</div>
				<Form form={form} className={styles.modalForm}>
					<FormItem
						name="verificationCode"
						rules={[
							{
								required: true,
								message: intl.formatMessage({ id: 'please.enter.verification.code' }),
							},
						]}
					>
						<Row>
							<Col span={16}>
								<Input
									maxLength={6}
									size="large"
									prefix={
										<BBIcon
											type="ic_vc"
											className={styles.itemOwner}
											style={{ color: '#A3A3A3', fontSize: 16 }}
										/>
									}
									placeholder={intl.formatMessage({ id: 'verification.code' })}
								/>
							</Col>
							<Col span={8}>
								<Button
									className={styles.buttonStyle}
									onClick={() => {
										fetchCode();
									}}
									loading={fetchLoading}
								>
									{buttonText}
								</Button>
							</Col>
						</Row>
					</FormItem>
				</Form>
			</div>
		</Modal>
	);
};

export default connect(({ loading, login }) => ({
	login,
	fetchLoading: loading.effects.login.sendVerificationCode || false,
}))(Verification);
