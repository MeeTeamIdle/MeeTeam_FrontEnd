import React, { type PropsWithChildren } from 'react';

interface TextBox {
	message: string;
}

const TextBox = ({ message, children }: PropsWithChildren<TextBox>) => {
	return (
		<article>
			<span>{message}</span>
			{children}
		</article>
	);
};

export default React.memo(TextBox);
