import styled from 'styled-components';

const RecruitManageWrapper = styled.div`
	width: clamp(45%, 96rem, 75%);
	margin: 0 auto;
	display: flex;
	main {
		width: 100%;
	}

	.mobile-bg {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		z-index: 1;
		font-size: 1.5rem;

		color: #151515;
		margin-top: 25rem;
	}
`;

const RecruitManage = styled.article`
	margin-top: 8rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;

	h2 {
		color: #151515;
		font-size: 2.4rem;
		font-weight: 700;
	}

	h3 {
		color: #8e8e8e;
		font-size: 2rem;
		font-style: normal;
		font-weight: 600;
	}

	.body1 {
		color: #373f41;
		text-align: center;
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 1.9rem;
		letter-spacing: 0.0032rem;
	}

	.txt-big {
		color: #f7faff;
		font-size: 1.6rem;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;

		.container-menu {
			width: 100%;
			height: 2.85rem;
			border-bottom: 1px solid #8e8e8e;

			.menu {
				height: 3.6rem;
				padding: 0.85rem 4.4rem;
				box-sizing: border-box;
				border-radius: 0.4rem 0.4rem 0rem 0rem;
				border-top: 1px solid #8e8e8e;
				border-right: 1px solid#8e8e8e;
				border-left: 1px solid #8e8e8e;
				border-bottom: 1px solid #8e8e8e;
				background: #f6f6f6;
				cursor: pointer;
			}

			.active {
				border-top: 1px solid #373f41;
				border-right: 1px solid #373f41;
				border-left: 1px solid #373f41;
				border-bottom: 1px solid #fff;
				background: #fff;
			}
		}

		.container-dropdown {
			display: flex;
			justify-content: flex-end;
			margin-top: 2rem;
			gap: 1.6rem;
		}

		.container-contents {
			margin-top: 3.25rem;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(4, 1fr);
			gap: 3.2rem 3.2rem;
		}
		.container-none {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2rem;
			margin-top: 20.25rem;
			min-height: 54.8rem;
		}
	}

	.container-pagination {
		display: flex;
		justify-content: center;
	}

	.btn-navigate {
		display: flex;
		height: 4.8rem;
		padding: 1.2rem 3.2rem;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		border-radius: 0.6rem;
		background: #5877fc;
	}
`;

const S = {
	RecruitManageWrapper,
	RecruitManage,
};

export default S;
