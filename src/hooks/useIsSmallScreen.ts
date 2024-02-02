import { useWindowSize } from './useWindowSize';

export const useIsSmallScreen = (): boolean => {
	const windowSize = useWindowSize();
	return windowSize.width! < 600;
};
