const checkEnterKeyDown = (e: React.KeyboardEvent) => {
	if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
};

export default checkEnterKeyDown;
