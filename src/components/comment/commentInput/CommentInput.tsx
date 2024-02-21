import React, { useState } from 'react';
import { Icon } from '../..';
import { CommentInputFunctions } from '../../../types';
import S from './CommentInput.styled';

const CommentInput = ({
	contents,
	addComment,
	onKeyPress,
	onChangeHandler,
	onClickInput,
}: CommentInputFunctions) => {
	const isLogin = true; // 임시 코드

	return (
		<S.CommentInput>
			<div className='user-input'>
				<div className='user-input__icon'>
					<Icon />
				</div>
				<input
					type='text'
					onKeyPress={onKeyPress}
					value={contents}
					onChange={onChangeHandler}
					onClick={onClickInput}
					placeholder={isLogin ? '댓글 추가...' : '로그인이 필요합니다.'}
				/>
				<button type='button' onClick={addComment}>
					댓글 등록
				</button>
			</div>
		</S.CommentInput>
	);
};

export default CommentInput;