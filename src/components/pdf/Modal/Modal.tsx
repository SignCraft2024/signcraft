import React from 'react';
// import { useIsSmallScreen } from '../../../hooks/useIsSmallScreen';

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
	// style,
	// positionTop,
}) => {
	// const isSmallScreen: boolean = useIsSmallScreen();

	// const styles = {
	// 	container: {
	// 		position: isSmallScreen ? 'fixed' : 'absolute',
	// 		backgroundColor: '#FFF',
	// 		border: `1px solid hsl(218,49%,66%)`,
	// 		borderRadius: 4,
	// 		top: positionTop ?? (isSmallScreen ? 60 : 150),
	// 		left: '50%',
	// 		transform: 'translateX(-50%)',
	// 		width: '94%',
	// 		fontFamily: 'Open Sans',
	// 		zIndex: 10000,
	// 		boxShadow: '0 0px 14px hsla(0, 0%, 0%, 0.2)',
	// 	},
	// 	background: {
	// 		position: 'fixed',
	// 		width: '100%',
	// 		height: '100%',
	// 		top: 0,
	// 		left: 0,
	// 		backgroundColor: '#00000033',
	// 		zIndex: 5000,
	// 	},
	// };

	return isVisible ? (
		<div>
			{/* <div style={styles.background} onClick={onClose} /> */}
			{/* <div style={{ ...styles.container, ...style }}>{children}</div> */}
			<div onClick={onClose} />
			<div>{children}</div>
		</div>
	) : null;
};
