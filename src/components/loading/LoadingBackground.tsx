import React from 'react';

import { CircularProgress } from '@mui/material';
import S from './LoadingBackground.styled';

const LoadingBackground = () => {
	return (
		<S.LoadingBackground>
			<CircularProgress />
		</S.LoadingBackground>
	);
};

export default LoadingBackground;
