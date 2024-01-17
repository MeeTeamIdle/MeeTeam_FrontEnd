import React, { useState } from 'react';
import S from './Toggle.styled';

const Toggle = () => {
	const [isActive, setIsActive] = useState(false);

	const toggleHandler = () => {
		setIsActive(prev => !prev);
	};

	return (
		<S.ToggleLabel>
			<S.ToggleCheckBox type='checkbox' checked={isActive} onChange={toggleHandler} />
			<S.ToggleSpan checked={isActive} />
		</S.ToggleLabel>
	);
};

export default Toggle;
