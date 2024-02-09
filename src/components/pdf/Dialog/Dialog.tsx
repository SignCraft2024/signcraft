import React from 'react';
import { Modal } from '../Modal/Modal';
import { FaTimes } from 'react-icons/fa';

type DialogProps = {
	isVisible: boolean;
	children: React.ReactNode;
	onClose: () => void;
	title?: string;
	noPadding?: boolean;
	backgroundColor?: string;
	positionTop?: number;
};
export const Dialog: React.FC<DialogProps> = ({
	isVisible,
	children,
	onClose,
	title,
	noPadding,
	backgroundColor,
	positionTop,
}) => {
	const styles = {
		header: {
			backgroundColor: 'hsl(218,49%,66%)',
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
		<Modal onClose={onClose} isVisible={isVisible} positionTop={positionTop}>
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
