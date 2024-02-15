import './ConfirmOrCancel.css';
import React from 'react';
import { BigButton } from '../BigButton';

type ConfirmOrCancelProps = {
	onCancel: () => void;
	onConfirm: () => void;
	confirmTitle?: string;
	leftBlock?: React.ReactNode;
	hideCancel?: boolean;
	disabled?: boolean;
};

export const ConfirmOrCancel: React.FC<ConfirmOrCancelProps> = ({
	onCancel,
	onConfirm,
	confirmTitle = 'Confirm',
	leftBlock,
	hideCancel,
	disabled,
}) => {
	return (
		<div id="actions">
			<div>{leftBlock}</div>
			<div>
				{!hideCancel ? (
					<BigButton
						title={'Cancel'}
						style={{ marginRight: 8 }}
						onClick={onCancel}
					/>
				) : null}
				<BigButton
					title={confirmTitle}
					inverted={true}
					onClick={onConfirm}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};
