import './Button.css';
import React from 'react';
import useHover from '../../../hooks/useHover';
type ButtonProps = {
	title: string;
	onClick: () => void;
	inverted?: boolean | null;
	fullWidth?: string | null;
	noHover?: boolean;
	id?: string;
	small?: boolean | null;
	disabled?: boolean | null;
	marginRight?: number;
};

export const Button: React.FC<ButtonProps> = ({
	title,
	onClick,
	inverted,
	fullWidth,
	noHover,
	id,
	small,
	disabled,
	marginRight,
}) => {
	const [hoverRef, isHovered] = useHover();

	let initialBg: string = null;
	let hoverBg: string | null = 'black';

	let initialColor = 'black';
	let hoverColor = '#FFF';

	if (inverted) {
		initialBg = 'black';
		hoverBg = null;
		initialColor = '#FFF';
		hoverColor = 'black';
	}

	if (disabled) {
		initialBg = '#ddd';
		hoverBg = '#ddd';
	}

	return (
		<div
			id={id}
			ref={hoverRef}
			style={{
				width: fullWidth ? '100%' : null,
				backgroundColor: isHovered && !noHover ? hoverBg : initialBg,
				color:
					isHovered && !noHover && !disabled
						? hoverColor
						: disabled
							? '#999'
							: initialColor,
				padding: small ? '2px 4px' : '6px 8px',
				fontSize: small ? 14 : null,
				border: `1px solid ${disabled ? '#ddd' : 'black'}`,
				cursor: !disabled ? 'pointer' : null,
				marginRight,
			}}
			onClick={() => {
				if (!disabled) {
					onClick();
				}
			}}
			className="title button-container"
		>
			{title}
		</div>
	);
};
