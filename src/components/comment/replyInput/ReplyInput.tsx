import React, { useState } from 'react';
import { Icon } from '../..';
import { Comment, CommentInputFunctions } from '../../../types';
import S from './ReplyInput.styled';

let addedCmtId;

const ReplyInput = ({
	contents,
	addComment,
	onKeyPress,
	onChangeHandler,
	onClickInput,
}: CommentInputFunctions) => {
	const isLogin = true; // 임시 코드

	return (
		<S.ReplyInput className='reply-container'>
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
				className='reply-input'
			/>
			<button type='button' onClick={addComment} className='reply-btn'>
				답글
			</button>
		</S.ReplyInput>
	);
};

export default ReplyInput;