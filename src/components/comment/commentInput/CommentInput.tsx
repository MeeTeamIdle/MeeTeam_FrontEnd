import React, { useState } from 'react';
import { ProfileImage } from '../..';
import S from './CommentInput.styled';
import { useComment, useLogin } from '../../../hooks';
import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../atom';
import { readProfileImage } from '../../../service';

const CommentInput = () => {
	const { isLogin } = useLogin();
	const postComment = useComment();
	const { id } = useParams();
	const pageNum = Number(id);
	const [contents, setContents] = useState<string>('');
	const queryClient = useQueryClient();
	const userInfo = useRecoilValue(userState);

	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: () => readProfileImage(),
		enabled: isLogin,
		gcTime: Infinity,
		staleTime: Infinity,
	});

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const addComment = () => {
		if (contents.trim() !== '') {
			const comment = {
				content: contents,
				isParent: true,
			};
			setContents('');
			postComment.mutate(
				{ pageNum, comment },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['detailedPage'] });
					},
				}
			);
		}
	};
	const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContents(event.target.value);
	};

	return (
		<S.CommentInput>
			<form onSubmit={onSubmit}>
				<article className='wrapper'>
					<section className='container-user__icon'>
						<div>
							{userInfo?.userId && (
								<ProfileImage url={user?.imageUrl} userId={userInfo?.userId} size='2.31rem' />
							)}
						</div>
						<span>{userInfo?.nickname}</span>
					</section>
					<section className='container-user__input'>
						<textarea
							value={contents}
							onChange={onChangeHandler}
							maxLength={100}
							placeholder='댓글을 입력해주세요. 댓글의 글자 수는 100자로 제한합니다.'
						/>
					</section>
					<section className='container-length_counter'>
						<span className='body2-medium'>
							{contents.length > 100 ? 100 : contents.length}/100
						</span>
					</section>
					<section className='container-btn'>
						<button type='submit' onClick={addComment} className='submit-btn'>
							등록
						</button>
					</section>
				</article>
			</form>
		</S.CommentInput>
	);
};

export default CommentInput;
