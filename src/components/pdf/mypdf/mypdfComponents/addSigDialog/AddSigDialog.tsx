import './AddSigDialog.css';
import { Dialog } from '../Dialog';
import SignatureCanvas from 'react-signature-canvas';
import { ConfirmOrCancel } from '../ConfirmOrCancel';
import React, { useRef } from 'react';

type AddSignDialogProps = {
	autoDate: boolean;
	setAutoDate: (params: boolean) => void;
	onClose: () => void;
	onConfirm: (url: string) => void;
};

export const AddSigDialog: React.FC<AddSignDialogProps> = ({
	onConfirm,
	onClose,
	autoDate,
	setAutoDate,
}) => {
	const sigRef = useRef(null);

	return (
		<Dialog isVisible={true} title={'Add signature'}>
			<div>
				<div id="sig-container">
					<div id="sig-block">
						<SignatureCanvas
							velocityFilterWeight={1}
							ref={sigRef}
							canvasProps={{
								width: 600,
								height: 200,
								className: 'sigCanvas',
							}}
						/>
					</div>
				</div>
				<div id="instructions-container">
					<div id="instructions">
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
						const sigURL = sigRef.current.toDataURL();
						onConfirm(sigURL);
					}}
				/>
			</div>
		</Dialog>
	);
};
