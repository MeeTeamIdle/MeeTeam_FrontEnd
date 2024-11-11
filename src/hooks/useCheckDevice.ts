import { useMediaQuery, useTheme } from '@mui/material';

const useCheckDevice = () => {
	const { breakpoints } = useTheme();
	const isMobile = useMediaQuery(breakpoints.down('sm'));

	return { isMobile };
};

export default useCheckDevice;
