const checkEnterKeyDown = (e: React.KeyboardEvent) => {
	if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') e.preventDefault();
};

export default checkEnterKeyDown;
