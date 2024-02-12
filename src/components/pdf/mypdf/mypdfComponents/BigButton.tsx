import React, { CSSProperties } from "react";
import useHover from "../../../../hooks/useHover";
import { primary45 } from "../../../../utils/colors";

type ButtonProps = {
	title: string;
	onClick: () => void;
	inverted?: boolean | null;
	fullWidth?: string | null;
	customFillColor?: string | null;
	customWhiteColor?: string | null;
	style?: CSSProperties;
	noHover?: boolean;
	id?: string;
	small?: boolean | null;
	disabled?: boolean | null;
	marginRight?: number;
};

export const BigButton: React.FC<ButtonProps> = ({
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

	let fillColor = customFillColor || primary45;
	const whiteColor = customWhiteColor || '#FFF';

	let initialBg = null;
	let hoverBg = fillColor;

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

	const getColor = (): string => {
    if (isHovered && !noHover && !disabled)
			return hoverColor;
		else if (disabled)
			return '#999';
		else
			return initialColor;
		}

	const styles: Record<string, CSSProperties> = {
		container: {
			display: 'inline-flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: fullWidth ? '100%' : null,
			backgroundColor: isHovered && !noHover ? hoverBg : initialBg,
			color: getColor(),
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
		<button
			id={id}
			ref={hoverRef}
			style={{ ...styles.container, ...style }}
			onClick={() => {
				if (!disabled) {
					onClick();
				}
			}}
		>
			{title}
		</button>
	);
}
