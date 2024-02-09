/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSignatureCanvas from 'react-signature-canvas';
import { Dialog } from '../Dialog/Dialog';
import './AddSignDialog.css';
import React, { useRef } from 'react';
import { ConfirmOrCancel } from '../ConfirmOrCancel/ConfirmOrCancel';

type AddSignDialogProps = {
	autoDate: boolean;
	setAutoDate: (params: any) => void;
	onClose: () => void;
	onConfirm: (url: string) => void;
};
export const AddSignDialog: React.FC<AddSignDialogProps> = ({
	autoDate,
	setAutoDate,
	onClose,
	onConfirm,
}) => {
	const signRef = useRef(null);

	return (
		<Dialog isVisible={true} onClose={onClose} title="Add Signature">
			<div>
				<div className="sign-container">
					<div className="sign-block">
						<ReactSignatureCanvas
							velocityFilterWeight={1}
							ref={signRef}
							canvasProps={{
								width: '600',
								height: 200,
								className: 'sigCanvas',
							}}
						/>
					</div>
				</div>
				<div className="instructions-container">
					<div className="instructions">
						<div>
							Auto date/time{' '}
							<input
								type={'checkbox'}
								checked={autoDate}
								onChange={(e) => setAutoDate(e.target.checked)}
							/>
						</div>
						<div>Draw your signature above</div>
					</div>
				</div>

				<ConfirmOrCancel
					onCancel={onClose}
					onConfirm={() => {
						// TODO: a verifier
						const signURL = signRef.current.toDataURL();
						onConfirm(signURL);
					}}
				/>
			</div>
		</Dialog>
	);
};
