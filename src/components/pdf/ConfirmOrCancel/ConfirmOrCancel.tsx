/* eslint-disable @typescript-eslint/no-explicit-any */
import './ConfirmOrCancel.css';
import React from 'react';
import { Button } from '../Button/Button';

export const ConfirmOrCancel: React.FC<{
	onCancel: () => void;
	onConfirm: () => void;
	confirmTitle?: string;
	leftBlock?: any;
	hideCancel?: boolean;
	disabled?: boolean;
}> = ({
	onCancel,
	onConfirm,
	confirmTitle,
	leftBlock,
	hideCancel,
	disabled,
}) => {
	confirmTitle = confirmTitle ?? 'Confirm';
	return (
		<div className="actions">
			<div>{leftBlock}</div>
			<div>
				{!hideCancel && (
					<Button
						title="Cancel"
						onClick={onCancel}
						style={{ marginRight: 8 }}
					/>
				)}
				<Button
					title={confirmTitle}
					onClick={onConfirm}
					inverted={true}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};
