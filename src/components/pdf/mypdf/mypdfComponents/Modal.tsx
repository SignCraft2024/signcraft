import React, { CSSProperties } from 'react';
import { useIsSmallScreen } from '../../../../hooks/useIsSmallScreen';
import { primary45 } from '../../../../utils/colors';

type ModalProps = {
	onClose: () => void;
	children: React.ReactNode;
	isVisible: boolean;
	positionTop?: number;
	style?: CSSProperties;
};

export const Modal: React.FC<ModalProps> = ({
	onClose,
	children,
	isVisible,
	style,
	positionTop,
}) => {
	const isSmallScreen = useIsSmallScreen();

	const styles: Record<string, CSSProperties> = {
		container: {
			position: isSmallScreen ? 'fixed' : 'absolute',
			backgroundColor: '#FFF',
			border: `1px solid ${primary45}`,
			borderRadius: 4,
			top: positionTop ?? (isSmallScreen ? 60 : 150),
			left: '50%',
			transform: 'translateX(-50%)',
			width: '94%',
			fontFamily: 'Open Sans',
			zIndex: 10000,
			boxShadow: '0 0px 14px hsla(0, 0%, 0%, 0.2)',
		},
		background: {
			position: 'fixed',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			backgroundColor: '#00000033',
			zIndex: 5000,
		},
	};

	if (!isVisible) {
		return null;
	}

	return (
		<div>
			<div style={styles.background} onClick={onClose} />
			<div style={{ ...styles.container, ...style }}>{children}</div>
		</div>
	);
};
