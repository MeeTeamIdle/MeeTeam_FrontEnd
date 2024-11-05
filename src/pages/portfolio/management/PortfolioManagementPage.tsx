import React, { useState } from 'react';
import S from './PortfolioManagementPage.styled';
import { Pagination, PortfolioCard, PrimaryBtn, TabMenu } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { usePaginationPortfolioList } from '../../../hooks';

const tabList = ['전체'];

const PortfolioManagementPage = () => {
	const navigate = useNavigate();

	const [pageNumber, setPageNumber] = useState(1);
	const { data: portfolioList, isSuccess } = usePaginationPortfolioList(16, pageNumber);

	return (
		isSuccess && (
			<S.PortfolioManagementLayout>
				<S.PortfolioManagementHeader>
					<h2>포트폴리오</h2>
					<PrimaryBtn
						type='button'
						title='포트폴리오 작성'
						handleClick={() => navigate('/portfolio/edit')}
					/>
				</S.PortfolioManagementHeader>
				<TabMenu tabList={tabList} />
				{portfolioList?.portfolios.length ? (
					<S.PortfolioManagementGrid>
						{portfolioList &&
							portfolioList.portfolios?.map(portfolio => (
								<PortfolioCard key={portfolio.id} {...portfolio} />
							))}
					</S.PortfolioManagementGrid>
				) : (
					<S.PortfolioManagementColumn>아직 작성한 포트폴리오가 없어요</S.PortfolioManagementColumn>
				)}
				<Pagination
					postsNum={portfolioList?.pageInfo.totalContents as number}
					postsPerPage={portfolioList?.pageInfo.size as number}
					currentPage={pageNumber}
					setCurrentPage={setPageNumber}
				/>
			</S.PortfolioManagementLayout>
		)
	);
};

export default PortfolioManagementPage;
