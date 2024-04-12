import React, { useState } from 'react';
import { UnfilledBookmark, FilledBookmark } from '../../../../assets';
import { useSetRecoilState } from 'recoil';
import { applyCancelModalState, applyModalState } from '../../../../atom';

const ApplierFooter = ({ deadline }: { deadline: string }) => {
	const tempApplied = true;
	const [isMarked, setIsMarked] = useState<boolean>(false);
	const setIsModal = useSetRecoilState(applyModalState);
	const setIsCancel = useSetRecoilState(applyCancelModalState);

	const diffDate = Math.ceil(
		(new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	).toString();

	const onClickApply = () => {
		setIsModal(true);
	};

	const onClickCancel = () => {
		setIsCancel(true);
	};
	return (
		<>
			<button type='button' className='btn-bookmark' onClick={() => setIsMarked(prev => !prev)}>
				<img src={!isMarked ? UnfilledBookmark : FilledBookmark} />
				<span>북마크</span>
			</button>
			{tempApplied ? (
				<button type='button' className='apply' onClick={onClickApply}>
					<span>신청하기 {Number(diffDate) < 8 && Number(diffDate) > 0 && `D-${diffDate}`}</span>
				</button>
			) : (
				<button type='button' className='cancel' onClick={onClickCancel}>
					<span>신청취소</span>
				</button>
			)}
		</>
	);
};

export default ApplierFooter;