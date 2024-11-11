import React, { useEffect, useMemo, useState } from 'react';
import S from './Progress.styled';

interface Progress {
	denominator: number;
	numerator: number;
}

const Progress = ({ denominator, numerator }: Progress) => {
	const [progressValue, setProgressValue] = useState<number>(0);

	const getProgressWidth = useMemo(() => {
		return Math.floor((numerator / denominator) * 100);
	}, [denominator, numerator]);

	useEffect(() => {
		setProgressValue(getProgressWidth);
	}, [denominator, numerator, getProgressWidth]);

	return (
		<S.ProgressBackground>
			<S.Progress $progression={progressValue} />
		</S.ProgressBackground>
	);
};

export default Progress;
