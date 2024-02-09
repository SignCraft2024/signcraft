import React from 'react';
import { useIsSmallScreen } from '../../../hooks/useIsSmallScreen';
import './Modal.css'

type ModalProps = {
	onClose: () => void;
	children: React.ReactNode;
	isVisible: boolean;
	style?: object;
	positionTop?: number;
};

export const Modal: React.FC<ModalProps> = ({
	onClose,
	children,
	isVisible,
	style,
	positionTop,
}) => {
	const isSmallScreen: boolean = useIsSmallScreen();

	const styles = {
		container: {
			position: isSmallScreen ? 'fixed' : 'absolute',
			borderRadius: 4,
			top: positionTop ?? (isSmallScreen ? 60 : 150),
			left: '50%',
			transform: 'translateX(-50%)',
			width: '94%',
			fontFamily: 'Open Sans',
			zIndex: 10000,
			boxShadow: '0 0px 14px hsla(0, 0%, 0%, 0.2)',
		}
	};

	return isVisible ? (
		<div>
			<div className="modal-background" onClick={onClose} />
			<div
				className="modal-container"
				style={{ ...styles.container, ...style }}
			>
				{children}
			</div>
			<div onClick={onClose} />
			<div>{children}</div>
		</div>
	) : null;
};
