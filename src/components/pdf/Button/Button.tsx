import './Button.css';
import React from 'react';
import useHover from '../../../hooks/useHover';
type ButtonProps = {
	title: string;
	onClick: () => void;
	inverted?: boolean | null;
	fullWidth?: string | null;
	customFillColor?: string | null;
	customWhiteColor?: string | null;
	style?: object | null;
	noHover?: boolean;
	id?: string;
	small?: boolean | null;
	disabled?: boolean | null;
	marginRight?: string;
};

export const Button: React.FC<ButtonProps> = ({
	title,
	onClick,
	inverted,
	fullWidth,
	customFillColor,
	customWhiteColor,
	style,
	noHover,
	id,
	small,
	disabled,
	marginRight,
}) => {
	const [hoverRef, isHovered] = useHover();

	let fillColor: string = customFillColor ?? 'black';
	const whiteColor = customWhiteColor ?? '#FFF';

	let initialBg = null;
	let hoverBg: string | null = fillColor;

	let initialColor = fillColor;
	let hoverColor = whiteColor;

	if (inverted) {
		initialBg = fillColor;
		hoverBg = null;
		initialColor = whiteColor;
		hoverColor = fillColor;
	}

	if (disabled) {
		initialBg = '#ddd';
		hoverBg = '#ddd';
		fillColor = '#ddd';
	}

	const styles = {
		container: {
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: fullWidth ? '100%' : null,
			backgroundColor: isHovered && !noHover ? hoverBg : initialBg,
			color:
				isHovered && !noHover && !disabled
					? hoverColor
					: disabled
						? '#999'
						: initialColor,
			borderRadius: 4,
			padding: small ? '2px 4px' : '6px 8px',
			fontSize: small ? 14 : null,
			border: `1px solid ${fillColor}`,
			cursor: !disabled ? 'pointer' : null,
			userSelect: 'none',
			boxSizing: 'border-box',
			marginRight,
		},
	};

	return (
		<div
			id={id}
			ref={hoverRef}
			style={{ ...styles.container, ...style }}
			onClick={() => {
				if (!disabled) {
					onClick();
				}
			}}
			className="title"
		>
			{title}
		</div>
	);
};
