import React from 'react';
import { useIsSmallScreen } from '../../../hooks/useIsSmallScreen';
import './Modal.css';

type ModalProps = {
	onClose: () => void;
	children: React.ReactNode;
	isVisible: boolean;
	positionTop?: number;
};

export const Modal: React.FC<ModalProps> = ({
	onClose,
	children,
	isVisible,
	positionTop,
}) => {
	const isSmallScreen: boolean = useIsSmallScreen();

	return isVisible ? (
		<div>
			<div className="modal-background" onClick={onClose} />
			<div
				className="modal-container"
				style={{
					position: isSmallScreen ? 'fixed' : 'absolute',
					top: positionTop ?? (isSmallScreen ? 60 : 150),
				}}
			>
				{children}
			</div>
			<div onClick={onClose} />
			<div>{children}</div>
		</div>
	) : null;
};
