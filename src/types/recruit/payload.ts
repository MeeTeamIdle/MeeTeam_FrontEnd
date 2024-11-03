import { Keyword } from '..';
import { Skill } from './response';

export interface ApplyRole {
	name: string;
	score: number;
	universityName: string;
	departmentName: string;
	year: number;
	email: string;
	role: {
		applyRoleId: number;
		name: string;
	};
	message: string | undefined;
}

export interface ApplyForm {
	applyRoleId: number;
	message: string | undefined;
}

export interface RoleForPost {
	roleName?: string;
	roleId: number | null;
	count: number | string | null;
	skillIds: number[];
	skills?: Skill[];
}

export interface InputState {
	pageNum?: number;
	scope: string;
	category: string;
	fieldId: number | null;
	deadline: string | undefined;
	proceedType: string;
	proceedingStart: string | undefined;
	proceedingEnd: string | undefined;
	courseTag: {
		isCourse: boolean;
		courseTagName: string | null;
		courseProfessor: string | null;
	};
	recruitmentRoles: RoleForPost[];
	tags: string[];
	title: string;
	content: string;
}

export interface Role {
	id: number | null;
	role: {
		id: number | null;
		name: string;
	};
	count: string;
	skill: string[];
}

export interface InputUserRoleForm {
	userRoleList: Role[];
	setUserRoleList: (arr: any) => void;
}

export interface InputCourse {
	isChecked: boolean;
	onClickHandler: () => void;
}

export interface RecruitFilter {
	scope: number | null;
	category: number | null;
	field: number | null;
	skill: number[];
	role: number[];
	tag: number[];
	keyword: string | null;
	course: number | null;
	professor: number | null;
}

export interface DetailedInfo {
	type: string;
	closeHandler: () => void;
}

export interface Array {
	skill: Keyword[];
	role: Keyword[];
	tag: Keyword[];
}

export interface FilterData {
	field?: number | null;
	scope?: number | null;
	category?: number | null;
	keyword?: string | null;
	skill?: number[];
	role?: number[];
	tag?: number[];
}

export interface CommentContents {
	content: string;
	isParent: boolean;
	groupNumber?: number;
}

export interface PostingComment {
	pageNum: number;
	comment: CommentContents;
}

export interface GroupContents {
	groupNumber: number;
	groupOrder: number;
}

export interface DeleteComment {
	pageNum: number;
	commentId: number;
	type?: string;
}

export interface EditContents {
	commentId: number;
	content: string;
}

export interface EditingComment {
	pageNum: number;
	comment: EditContents;
}

export interface EditPosting {
	pageNum: number;
	formData: InputState;
}

export interface ApplicantsList {
	pageNum: number;
	applicantIds: number[];
}

export interface ApplicantsLink {
	pageNum: number;
	link: string;
}
