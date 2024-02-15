import './DraggableSignature.css';
import Draggable from 'react-draggable';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { errorColor, goodColor } from '../../../../../utils/colors';
import React from 'react';

type DraggableSignatureProps = {
	url: string;
	onEnd: (params: any) => void;
	onSet: () => void;
	onCancel: () => void;
};

const DraggableSignature: React.FC<DraggableSignatureProps> = ({
	url,
	onEnd,
	onSet,
	onCancel,
}) => {
	return (
		<Draggable onStop={onEnd}>
			<div id="draggable-signature-container">
				<div id="draggable-signature-controls">
					<button onClick={onSet}>
						<FaCheck color={goodColor} />
					</button>
					<button onClick={onCancel}>
						<FaTimes color={errorColor} />
					</button>
				</div>
				<img src={url} width={200} alt="signature" draggable={false} />
			</div>
		</Draggable>
	);
};

export default DraggableSignature;
