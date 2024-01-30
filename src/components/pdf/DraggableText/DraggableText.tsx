import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { FaCheck, FaTimes } from 'react-icons/fa';

type DraggableTextProps = {
	onEnd?: any;
	onSet: (params: string) => void;
	onCancel?: () => void;
	initialText?: string | null;
};

export const DraggableText: React.FC<DraggableTextProps> = ({
	onEnd,
	onSet,
	onCancel,
	initialText,
}) => {
	const [text, setText] = useState<string>('Text');
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
			<div className="draggable-text-container">
				<div className="draggable-text-controls">
					<div className="small-button" onClick={() => onSet(text)}>
						<FaCheck color={'#53c171'} />
					</div>
					<div className="small-button" onClick={onCancel}>
						<FaTimes color={'#ef6565'} />
					</div>
				</div>
				<input
					ref={inputRef}
					className="input"
					value={text}
					placeholder={'Text'}
					onChange={(e) => setText(e.target.value)}
				/>
			</div>
		</Draggable>
	);
};
