import { useCallback, useRef, useState } from 'react';

type HoverCallback = (node: HTMLElement | null) => void;
type HoverState = [HoverCallback, boolean];

export default function useHover(): HoverState {
	const [value, setValue] = useState<boolean>(false);

	const handleMouseOver = useCallback(() => setValue(true), []);
	const handleMouseOut = useCallback(() => setValue(false), []);

	const ref = useRef<HTMLElement | null>();

	const callbackRef: HoverCallback = useCallback(
		(node) => {
			if (ref.current) {
				ref.current.removeEventListener('mouseenter', handleMouseOver);
				ref.current.removeEventListener('mouseleave', handleMouseOut);
			}

			ref.current = node;

			if (ref.current) {
				ref.current.addEventListener('mouseenter', handleMouseOver);
				ref.current.addEventListener('mouseleave', handleMouseOut);
			}
		},
		[handleMouseOver, handleMouseOut],
	);

	return [callbackRef, value];
}
