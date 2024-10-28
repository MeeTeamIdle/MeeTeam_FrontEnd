import { EndPoint, axiosInstance, axiosAuthInstance } from '..';
import { ListResult, FilterData } from '../../types';

interface FilterItem {
	filterState: FilterData;
	page: number;
}

export const getPostList = async ({ filterState, page }: FilterItem) => {
	try {
		const response = await axiosInstance.get<ListResult>(EndPoint.RECRUITMENT_BOARD.list, {
			params: {
				skill: filterState.skill,
				role: filterState.role,
				tag: filterState.tag,
				page,
				...filterState,
			},
		});
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const getAuthPostList = async ({ filterState, page }: FilterItem) => {
	try {
		const response = await axiosAuthInstance.get<ListResult>(EndPoint.RECRUITMENT_BOARD.list, {
			params: {
				skill: filterState.skill,
				role: filterState.role,
				tag: filterState.tag,
				page,
				...filterState,
			},
		});
		return response;
	} catch (error) {
		console.error(error);
	}
};
