import {
	useQuery,
	useMutation,
	useInfiniteQuery,
	useQueryClient,
	keepPreviousData,
} from '@tanstack/react-query';
import {
	createPortfolio,
	readPortfolio,
	updatePortfolio,
	readInfinitePortfolioList,
	readPaginationPortfolioList,
	deletePortfolio,
} from '../service';

const portfolioKeys = {
	readPortfolio: (portfolioId: string) => ['readPortfolio', portfolioId],
	readInfinitePortfolioList: (size: number) => ['readInfinitePortfolioList', size],
	readPaginationPortfolioList: (size: number) => ['readPaginationPortfolioList', size],
};

/**
 * @description 포트폴리오 조회 API를 호출하는 hook입니다.
 */
export const useReadPortfolio = (portfolioId: string) => {
	return useQuery({
		queryKey: portfolioKeys.readPortfolio(portfolioId),
		queryFn: () => readPortfolio(portfolioId),
		enabled: !!portfolioId,
	});
};

/**
 * @description 포트폴리오 등록 API를 호출하는 hook입니다.
 */
export const useCreatePortfolio = ({ onSuccess }: { onSuccess: (data: string) => void }) => {
	return useMutation({
		mutationFn: createPortfolio,
		onSuccess: data => {
			if (data) {
				onSuccess?.(data);
			}
		},
	});
};

/**
 * @description 포트폴리오 편집 API를 호출하는 hook입니다.
 */
export const useUpdatePortfolio = ({
	onSuccess,
	portfolioId,
}: {
	onSuccess: (data: string) => void;
	portfolioId: string;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updatePortfolio,
		onSuccess: async data => {
			if (data) {
				await queryClient.invalidateQueries({ queryKey: portfolioKeys.readPortfolio(portfolioId) });
				onSuccess?.(data);
			}
		},
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

/**
 * @description 포트폴리오 목록 페이지네이션 조회 API를 호출하는 hook입니다.
 */
export const usePaginationPortfolioList = (size: number, pageParam: number) => {
	return useQuery({
		queryKey: portfolioKeys.readPaginationPortfolioList(size),
		queryFn: () => readPaginationPortfolioList({ size, pageParam }),
		placeholderData: keepPreviousData,
	});
};

/**
 * @description 포트폴리오 삭제 API를 호출하는 hook입니다.
 */
export const useDeletePortfolio = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deletePortfolio,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: portfolioKeys.readPaginationPortfolioList(16) });
		},
	});
};
