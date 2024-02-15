import './DraggableText.css';
import Draggable from 'react-draggable';
import { FaCheck, FaTimes } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from 'react';
import { errorColor, goodColor } from '../../../../../utils/colors';

type DraggableTextProps = {
	onEnd?: (params: any) => void;
	onSet: (params: string) => void;
	onCancel?: () => void;
	initialText?: string | null;
};

const DraggableText: React.FC<DraggableTextProps> = ({
	onEnd,
	onSet,
	onCancel,
	initialText,
}) => {
	const [text, setText] = useState('Text');
	const inputRef = useRef(null);

	useEffect(() => {
		if (initialText) {
			setText(initialText);
		} else {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, []);

	return (
		<Draggable onStop={onEnd}>
			<div id="draggable-text-container">
				<div id="draggable-text-controls">
					<button onClick={() => onSet(text)}>
						<FaCheck color={goodColor} />
					</button>
					<button onClick={onCancel}>
						<FaTimes color={errorColor} />
					</button>
				</div>
				<input
					ref={inputRef}
					id="input-text"
					value={text}
					placeholder={'Text'}
					onChange={(e) => setText(e.target.value)}
				/>
			</div>
		</Draggable>
	);
};

export default DraggableText;
