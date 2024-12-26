import styled from 'styled-components';

interface OptionStyle {
	$label?: string;
	$style?: string;
}

const OptionList = styled.ul<OptionStyle>`
	position: absolute;
	width: 100%;
	z-index: 5;
	top: ${props => (props.$label ? '7.9rem' : '5.4rem')};
	${props => props.$style}

	display: flex;
	flex-direction: column;
	row-gap: 1.2rem;
	max-height: 16.9rem;
	padding: 1.2rem 1.6rem;

	border-radius: 1rem;
	border: 1px solid var(--Form-border-default, #e3e3e3);
	background: var(--Form-fill-others, #fff);

	/* form_shadow */
	box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);

	/* 스크롤바 스타일링 */
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 1.8rem;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #e3e3e3;
		border-radius: 1rem;
		background-clip: padding-box;
		border: 0.5rem solid transparent;
	}
`;

const OptionItem = styled.li`
	color: var(--Form-txtIcon-default, #8e8e8e);
	cursor: pointer;

	/* Body/body1/medium */

	font-size: 1.6rem;
	font-style: normal;
	font-weight: 500;
	line-height: 1.9rem; /* 118.75% */
	letter-spacing: 0.0032rem;

	&:hover {
		color: var(--Form-txtIcon-focus, #373f41);
	}
`;

const S = { OptionList, OptionItem };

export default S;
