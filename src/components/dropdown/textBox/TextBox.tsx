import React from 'react';

interface TextBox {
	message: string;
	children?: React.ReactNode;
}

const TextBox = ({ message, children }: TextBox) => {
	return (
		<article>
			<span>{message}</span>
			{children}
		</article>
	);
};

export default React.memo(TextBox);
