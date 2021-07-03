import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import styles from './index.less';

const { footerLinkone, footerLinktwo, footerTitleone, footerTitletwo } = global;

export default ({ className, links, copyright, terms }) => {
	const clsString = classNames(styles.globalFooter, className);
	return (
		<div className={clsString}>
			{links && (
				<div className={styles.links}>
					{links.map((link) => (
						<a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
							{link.title}
						</a>
					))}
				</div>
			)}
			{
				<div
					style={{ justifyContent: 'center', display: 'flex' }}
					className={`${styles.copyright} fotterCopyright`}
				>
					{footerLinkone && footerLinkone !== '' ? (
						<a href={footerLinkone && footerLinkone !== '' ? footerLinkone : undefined} target="_blank">
							<div style={{ marginRight: 10 }}>{footerTitleone}</div>
						</a>
					) : (
						<div style={{ marginRight: 10 }}>{footerTitleone}</div>
					)}
					{footerLinktwo && footerLinktwo !== '' ? (
						<a href={footerLinktwo && footerLinktwo !== '' ? footerLinktwo : undefined} target="_blank">
							<div style={{ marginRight: 10 }}>{footerTitletwo}</div>
						</a>
					) : (
						<div style={{ marginRight: 10 }}>{footerTitletwo}</div>
					)}
				</div>
			}
			{copyright && (
				<div
					style={{ justifyContent: 'center', display: 'flex' }}
					className={`${styles.copyright} fotterCopyright`}
				>
					{terms && (
						<a style={{ marginRight: 10 }} href={terms} target="_blank">
							<div>
								<FormattedMessage id="terms.condition.translate" />
							</div>
						</a>
					)}
					<div>{copyright}</div>
				</div>
			)}
		</div>
	);
};
