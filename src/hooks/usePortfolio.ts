import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { readPortfolio, readInfinitePortfolioList } from '../service';

const portfolioKeys = {
	readPortfolio: (portfolioId: string) => ['readPortfolio', portfolioId],
	readInfinitePortfolioList: (size: number) => ['readInfinitePortfolioList', size],
};

/**
 * @description 포트폴리오 조회 API를 호출하는 hook입니다.
 */
export const useReadPortfolio = (portfolioId: string) => {
	return useQuery({
		queryKey: portfolioKeys.readPortfolio(portfolioId),
		queryFn: () => readPortfolio(portfolioId),
	});
};

/**
 * @description 포트폴리오 목록 무한스크롤 조회 API를 호출하는 hook입니다.
 */
export const useReadInfinitePortfolioList = (size: number) => {
	return useInfiniteQuery({
		queryKey: portfolioKeys.readInfinitePortfolioList(size),
		queryFn: ({ pageParam }) => readInfinitePortfolioList({ size, pageParam }),
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			if (lastPage?.pageInfo.hasNextPage) {
				return lastPage?.pageInfo.page + 1;
			} else return undefined;
		},
	});
};
