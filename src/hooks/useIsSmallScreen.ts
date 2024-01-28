import { useWindowSize } from './useWindowSize';

export const useIsSmallScreen = () => {
	const windowSize = useWindowSize();
	return windowSize.width! < 600;
}
