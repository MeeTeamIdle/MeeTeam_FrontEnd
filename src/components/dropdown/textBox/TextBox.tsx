import React from 'react';

const TextBox = ({ message }: { message: string }) => {
	return (
		<article>
			<span>{message}</span>
		</article>
	);
};

export default React.memo(TextBox);
