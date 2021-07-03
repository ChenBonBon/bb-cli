import { Fragment, useState } from 'react';
import {
	Form,
	Select,
	Radio,
	Input,
	DatePicker,
	Row,
	Col,
	Button,
	Slider,
	InputNumber,
	Icon,
	Upload,
	Tooltip,
} from 'antd';
import moment from 'moment';
import { getCountriesAndRegions } from '../../utils/countriesAndRegions';
import Intl from '../../utils/LocalizeComponent';
import classNames from 'classnames';
import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const countriesAndRegions = getCountriesAndRegions(localStorage.getItem(configLanguage) || 'zh-CN');

const FormItems = ({ form, formItem }) => {
	const {
		key,
		type,
		value,
		placeholder,
		rules,
		label,
		options,
		maxLength,
		showTime,
		format,
		max,
		min,
		step,
		accept,
		beforeUploadHandle,
		removeHandle,
		downloadHandle,
		disabled,
		rechargeHandle,
		deductHandle,
		disabledDate,
		children,
		fullWidth,
		prefix,
		suffix,
	} = formItem;
	const props = {
		initialValue: '',
		validateFirst: true,
	};

	if (value) {
		if (type === 'datepicker') {
			props.initialValue = moment(value);
		} else if (type === 'rangepicker') {
			props.initialValue = [moment(value[0]), moment(value[1])];
		} else {
			props.initialValue = value;
		}
	} else {
		if (type === 'select' || type === 'datepicker' || type === 'rangepicker') {
			props.initialValue = value;
		}
	}

	if (rules) {
		props.rules = rules.map((rule) => {
			if (rule.code) {
				rule.message = Intl.t({ id: rule.code });
			}
			return rule;
		});
	}

	let item = null;
	switch (type) {
		case 'input':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(
						key,
						props
					)(<Input placeholder={placeholder ? Intl.t({ id: placeholder }) : ''} disabled={disabled} />)}
				</FormItem>
			);
			break;
		case 'number':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(
						key,
						props
					)(
						<InputNumber
							className={classNames(styles.creditInput, { [styles.fullWidth]: fullWidth })}
							step={step}
							min={min}
							max={max}
							formatter={(value) => {
								return prefix ? `${prefix}${value}` : suffix ? `${value}${suffix}` : value;
							}}
							parser={(value) => {
								return prefix ? value.replace(prefix, '') : suffix ? value.replace(suffix, '') : value;
							}}
						/>
					)}
				</FormItem>
			);
			break;
		case 'radio':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(
						key,
						props
					)(
						<RadioGroup disabled={disabled}>
							{options.map((option) => {
								const { value, title } = option;
								return (
									<Radio value={value} key={value} disabled={option.disabled}>
										{Intl.t({ id: title })}
									</Radio>
								);
							})}
						</RadioGroup>
					)}
				</FormItem>
			);
			break;
		case 'radioInput':
			const RadioInput = ({ value, onChange }) => {
				return (
					<Fragment>
						<Radio.Group
							defaultValue={value.radioValue}
							onChange={(e) => {
								onChange({ radioValue: e.target.value, inputValue: 1 });
							}}
						>
							{options.map((option) => {
								const { value, title } = option;
								return (
									<Radio value={value} key={value} disabled={option.disabled}>
										{Intl.t({ id: title })}
									</Radio>
								);
							})}
						</Radio.Group>

						{value.radioValue && (
							<InputNumber
								defaultValue={value.inputValue || 1}
								min={min}
								onChange={(v) => {
									onChange({ ...value, inputValue: v });
								}}
							/>
						)}
					</Fragment>
				);
			};
			item = (
				<FormItem label={Intl.t({ id: label })}>{form.getFieldDecorator(key, props)(<RadioInput />)}</FormItem>
			);
			break;
		case 'select':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(
						key,
						props
					)(
						<Select disabled={disabled} placeholder={placeholder ? Intl.t({ id: placeholder }) : ''}>
							{options.map((option) => {
								const { value, title, code } = option;
								return (
									<Option value={value} key={value}>
										{title || Intl.t({ id: code })}
									</Option>
								);
							})}
						</Select>
					)}
				</FormItem>
			);
			break;
		case 'region':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(
						key,
						props
					)(
						<Select placeholder={placeholder ? Intl.t({ id: placeholder }) : ''}>
							{countriesAndRegions.map((region) => {
								const { code, name } = region;
								return (
									<Option value={code} key={code}>
										{name}
									</Option>
								);
							})}
						</Select>
					)}
				</FormItem>
			);
			break;
		case 'datepicker':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(
						key,
						props
					)(<DatePicker disabledDate={disabledDate} style={{ width: '100%' }}></DatePicker>)}
				</FormItem>
			);
			break;
		case 'rangepicker':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(
						key,
						props
					)(
						<RangePicker
							className={styles.rangePicker}
							showTime={showTime}
							format={format}
							disabledDate={disabledDate}
							placeholder={[
								Intl.t({
									id: placeholder[0],
								}),
								Intl.t({ id: placeholder[1] }),
							]}
						/>
					)}
				</FormItem>
			);
			break;
		case 'mobile':
			const { region, mobile } = props.initialValue;
			const prefixSelector = form.getFieldDecorator('region', {
				initialValue: region,
			})(
				<Select
					className={styles.adminRegion}
					optionLabelProp="label"
					dropdownClassName={styles.phoneCodeDropdown}
				>
					{countriesAndRegions.map((region) => (
						<Option
							value={region.code}
							label={region.phone}
							key={region.code}
						>{`${region.name} (${region.phone})`}</Option>
					))}
				</Select>
			);
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(key, {
						getValueFromEvent: (event) => {
							return event.target.value.replace(/\D/g, '');
						},
						initialValue: mobile,
						rules,
					})(
						<Input
							className={styles.phoneInputContainer}
							addonBefore={prefixSelector}
							placeholder={placeholder ? Intl.t({ id: placeholder }) : ''}
						/>
					)}
				</FormItem>
			);
			break;
		case 'upload':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					<Upload
						className={styles.uploader}
						accept={accept}
						fileList={value}
						multiple={true}
						beforeUpload={(file, fileList) => {
							if (beforeUploadHandle) {
								beforeUploadHandle(file, fileList);
							}
							return false;
						}}
						onRemove={(file) => {
							if (removeHandle) {
								removeHandle(file);
							}
							return true;
						}}
						onPreview={(file) => {
							if (downloadHandle) {
								downloadHandle(file);
							}
						}}
						disabled={disabled}
					>
						{accept && (
							<Tooltip
								title={Intl.t(
									{ id: 'uploader.accept.tooltip' },
									{
										accept: (() => {
											const accepts = accept.split(',');
											const acceptSet = new Set();
											accepts.forEach((item) => {
												acceptSet.add(item.toLowerCase());
											});
											return Array.from(acceptSet).join(',');
										})(),
									}
								)}
							>
								<Button
									type="primary"
									ghost
									block
									className={styles.uploadBtn}
									style={{ display: disabled ? 'none' : 'block' }}
								>
									<Icon type="upload" />
									{placeholder ? Intl.t({ id: placeholder }) : ''}
								</Button>
							</Tooltip>
						)}
						{!accept && (
							<Button
								type="primary"
								ghost
								block
								className={styles.uploadBtn}
								style={{ display: disabled ? 'none' : 'block' }}
							>
								<Icon type="upload" />
								{placeholder ? Intl.t({ id: placeholder }) : ''}
							</Button>
						)}
					</Upload>
				</FormItem>
			);
			break;
		case 'textarea':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(
						key,
						props
					)(
						<TextArea
							maxLength={maxLength}
							placeholder={placeholder ? Intl.t({ id: placeholder }) : ''}
							disabled={disabled}
						/>
					)}
				</FormItem>
			);
			break;
		case 'quota':
			const Quota = (props) => {
				const { id, step, min, max, value } = props;
				const [inputValue, setInputValue] = useState(value);
				const onChangeSilder = (value) => {
					var reg = /^[0-9]*$/;
					if (reg.test(value)) {
						setInputValue(value ? value : props.value);
					}
				};
				return (
					<Row>
						<Col span={19}>
							<Slider
								step={step}
								min={min}
								max={max}
								onChange={(value) => onChangeSilder(value)}
								onAfterChange={(value) => {
									form.setFieldsValue({
										[id]: value,
									});
								}}
								value={inputValue}
							/>
						</Col>
						<Col span={24}>
							<InputNumber
								style={{ width: '100%' }}
								step={step}
								min={min}
								max={max}
								formatter={(value) => `${value}G`}
								parser={(value) => value.replace('G', '')}
								className={styles.numberInput}
								onChange={(value) => {
									var reg = /^[0-9]*$/;
									if (reg.test(value)) {
										setInputValue(value ? value : props.value);
										form.setFieldsValue({
											[id]: value,
										});
									}
								}}
								value={inputValue}
							/>
						</Col>
					</Row>
				);
			};
			item = (
				<FormItem label={Intl.t({ id: label })}>
					{form.getFieldDecorator(key, props)(<Quota step={step} min={min} max={max} />)}
				</FormItem>
			);
			break;
		case 'balance':
			item = (
				<FormItem label={Intl.t({ id: label })}>
					<Row>
						<Col span={9}>
							{form.getFieldDecorator(
								key,
								props
							)(
								<InputNumber
									className={classNames(styles.creditInput, styles.fullWidth)}
									step={step}
									disabled={disabled}
									formatter={(value) => `${parseFloat(value).toFixed(2)}元`}
								/>
							)}
						</Col>
						<Col span={15}>
							<div className={styles.creditBtns}>
								<Button type="primary" onClick={rechargeHandle}>
									{Intl.t({ id: 'bb.bills.recharge' })}
								</Button>
								<Button onClick={deductHandle}>{Intl.t({ id: 'bb.bills.deduct' })}</Button>
							</div>
						</Col>
					</Row>
				</FormItem>
			);
			break;
		case 'title':
			item = <FormItem label={Intl.t({ id: label })} className={styles.formTitle} colon={false}></FormItem>;
			break;
		case 'custom':
			item = (
				<FormItem label={Intl.t({ id: label })} colon={false}>
					{children}
				</FormItem>
			);
			break;
		default:
			break;
	}
	return item;
};

export default FormItems;
