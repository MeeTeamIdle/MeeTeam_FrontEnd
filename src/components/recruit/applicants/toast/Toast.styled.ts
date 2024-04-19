import styled from 'styled-components';

interface ToastProps {
	isOpen: boolean;
}

const ToastContainer = styled.article<ToastProps>`
	position: fixed;
	bottom: 1rem;
	left: 50%;
	display: flex;
	align-items: center;
	width: 48.184rem;
	padding: 2rem;
	transform: translateX(-50%);
	background-color: #8358fc;
	color: #f3f5ff;
	border-radius: 1rem;
	gap: 1.2rem;
	box-sizing: border-box;
	border: 2px solid var(--Purplescale-500, #8358fc);
	box-shadow:
		0px 4px 20px 0px rgba(0, 0, 0, 0.1),
		0px 2px 2px 0px rgba(0, 0, 0, 0.25);
	opacity: ${props => (props.isOpen ? '1' : '0')};
	visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
	transition: opacity 0.2s ease-in-out;

	.body1-medium {
		color: #f3f5ff;
		font-size: 1.6rem;
		letter-spacing: 0.0032rem;
		margin-top: 0.5rem;
	}
`;

const S = { ToastContainer };

export default S;