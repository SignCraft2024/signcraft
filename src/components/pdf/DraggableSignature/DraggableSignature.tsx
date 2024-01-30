/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Draggable from 'react-draggable';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './DraggableSignature.css'

type DraggableSignatureProps = {
	url: string;
	onEnd: any;
	onSet: () => void;
	onCancel: () => void;
};

export const DraggableSignature: React.FC<DraggableSignatureProps> = ({
	url,
	onEnd,
	onSet,
	onCancel,
}) => {
	return (
		<Draggable onStop={onEnd}>
			<div className="dragable-signature-container">
				<div className="dragable-signature-controls">
					<div className="small-button" onClick={onSet}>
						<FaCheck color={'#53c171'} />
					</div>
					<div className="small-button" onClick={onCancel}>
						<FaTimes color={'#ef6565'} />
					</div>
				</div>
				<img
					src={url}
					width={200}
					className="img"
					alt="img"
					draggable={false}
				/>
			</div>
		</Draggable>
	);
};
