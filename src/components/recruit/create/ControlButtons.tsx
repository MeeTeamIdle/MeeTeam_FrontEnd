import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { validState } from '../../../atom';

const ControlButtons = ({ id }: { id?: string }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const validCheck = useRecoilValue(validState);

	const postAvailable = React.useMemo(
		() =>
			validCheck.isCategory &&
			validCheck.isDeadline &&
			validCheck.isProcedure &&
			validCheck.isScope &&
			validCheck.isContent &&
			validCheck.isTitle &&
			validCheck.isRole &&
			validCheck.isContent,
		[validCheck]
	);

	const cancelHandler = async () => {
		if (location.pathname.includes('edit')) {
			navigate(`/recruitment/postings/${id}`);
		} else {
			navigate('/');
		}
	};

	return (
		<section className='container-btns'>
			<button type='button' className='cancel-btn' onClick={cancelHandler}>
				취소
			</button>
			<button
				type='submit'
				className={`submit-btn ${!postAvailable ? 'post-disabled' : ''}`}
				disabled={!postAvailable}
			>
				{location.pathname.includes('edit') ? '저장' : '등록'}
			</button>
		</section>
	);
};

export default React.memo(ControlButtons);
