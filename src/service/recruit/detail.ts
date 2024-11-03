import { EndPoint, axiosInstance, axiosAuthInstance } from '..';
import {
	RecruitPostings,
	ApplyInfo,
	ApplyForm,
	PostingComment,
	DeleteComment,
	EditingComment,
} from '../../types';

interface PostingData {
	pageNum: number;
	isLogin: boolean;
}

// !! 개선 필요
export const getPostingData = async ({ pageNum, isLogin }: PostingData) => {
	try {
		if (isLogin) {
			const response = await axiosAuthInstance.get<RecruitPostings>(
				EndPoint.RECRUIT_DETAIL.posting(pageNum)
			);
			return response;
		} else {
			const response = await axiosInstance.get<RecruitPostings>(
				EndPoint.RECRUIT_DETAIL.posting(pageNum)
			);
			return response;
		}
	} catch (error) {
		console.error(error);
	}
};

export const getApplyData = async (id: number) => {
	try {
		const response = await axiosAuthInstance.get<ApplyInfo>(EndPoint.RECRUIT_DETAIL.applyInfo(id));
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const applyRole = async (id: number, data: ApplyForm) => {
	try {
		const response = await axiosAuthInstance.post(EndPoint.RECRUIT_DETAIL.apply(id), data);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const cancelApply = async (pageNum: number) => {
	try {
		const response = await axiosAuthInstance.delete(EndPoint.RECRUIT_DETAIL.apply(pageNum));
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const bookmarkPost = async (id: number) => {
	try {
		const response = await axiosAuthInstance.post(EndPoint.RECRUIT_DETAIL.bookmark(id));
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const bookmarkDelete = async (id: number) => {
	try {
		const response = await axiosAuthInstance.delete(EndPoint.RECRUIT_DETAIL.bookmark(id));
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const closeRecruitPost = async (id: number) => {
	try {
		const response = await axiosAuthInstance.patch(EndPoint.RECRUIT_DETAIL.close(id));
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const postComment = async ({ pageNum, comment }: PostingComment) => {
	try {
		const response = await axiosAuthInstance.post(
			EndPoint.RECRUIT_DETAIL.comment(pageNum),
			comment
		);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const deleteComment = async ({ pageNum, commentId }: DeleteComment) => {
	try {
		const response = await axiosAuthInstance.delete(
			EndPoint.RECRUIT_DETAIL.deleteComment({ pageNum, commentId })
		);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const editComment = async ({ pageNum, comment }: EditingComment) => {
	try {
		const response = await axiosAuthInstance.patch(
			EndPoint.RECRUIT_DETAIL.comment(pageNum),
			comment
		);
		return response;
	} catch (error) {
		console.error(error);
	}
};
