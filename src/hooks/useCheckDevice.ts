import { useMediaQuery, useTheme } from '@mui/material';

const useCheckDevice = () => {
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down('sm'));
	const isTablet = useMediaQuery(breakpoints.between('sm', 'md'));

	return { isMobile, isTablet };
};

export default useCheckDevice;
