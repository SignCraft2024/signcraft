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

	const styles = {
		signContainer: {
			display: 'flex',
			justifyContent: 'center',
		},
		signBlock: {
			display: 'inline-block',
			border: '1px solid hsl(218,49%,66%)',
		},
		instructions: {
			display: 'flex',
			justifyContent: 'space-between',
			textAlign: 'center',
			color: 'hsl(218,49%,66%)',
			marginTop: 8,
			width: 600,
			alignSelf: 'center',
		},
		instructionsContainer: {
			display: 'flex',
			justifyContent: 'center',
		},
	};
	return (
		<Dialog isVisible={true} onClose={onClose} title="Add Signature">
			<div>
				<div style={styles.signContainer}>
					<div style={styles.signBlock}>
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
				<div style={styles.instructionsContainer}>
					<div style={styles.instructions}>
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
