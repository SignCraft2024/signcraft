import { FaTimes } from 'react-icons/fa';
import { primary45 } from '../../../../utils/colors';
import { Modal } from './Modal';
import React, { CSSProperties } from 'react';

type DialogProps = {
	isVisible: boolean;
	children: React.ReactNode;
	onClose?: () => void;
	title?: string;
	noPadding?: boolean;
	backgroundColor?: string;
	positionTop?: number;
	style?: CSSProperties;
};

export const Dialog: React.FC<DialogProps> = ({
	isVisible,
	children,
	onClose,
	title,
	noPadding,
	backgroundColor,
	positionTop,
	style,
}) => {
	if (!isVisible) {
		return null;
	}

	const styles = {
		header: {
			backgroundColor: primary45,
			color: '#FFF',
			padding: 8,
			fontSize: 14,
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		body: {
			padding: noPadding ? 0 : 14,
			backgroundColor: backgroundColor ?? '#FFF',
		},
		xIcon: {
			cursor: 'pointer',
		},
	};

	return (
		<Modal
			onClose={onClose}
			isVisible={isVisible}
			positionTop={positionTop}
			style={style}
		>
			<div>
				<div style={styles.header}>
					<div>{title}</div>
					<FaTimes
						color={'#FFF'}
						size={16}
						style={styles.xIcon}
						className={'dialogClose'}
						onClick={onClose}
					/>
				</div>
				<div style={styles.body}>{children}</div>
			</div>
		</Modal>
	);
};
