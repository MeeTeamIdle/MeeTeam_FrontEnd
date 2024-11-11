import React, { useCallback, useEffect, useRef, useState } from 'react';
import S from './MeeteamTag.styled';
import { useRecoilState } from 'recoil';
import { recruitInputState } from '../../atom';
import { useDebounce, useOutsideClick } from '../../hooks';
import { useQuery } from '@tanstack/react-query';
import { getTagKeyword } from '../../service';
import { Search, XBtn } from '../../assets';
import { Keyword, RecruitTags } from '../../types';
import { TextBox } from '../index';

interface RecruitTagListProps {
	tags: RecruitTags[] | undefined;
}

const MeeteamTag = ({ tags }: RecruitTagListProps) => {
	const [formData, setFormData] = useRecoilState(recruitInputState);
	const [tagItem, setTagItem] = useState<string>('');
	const [tagList, setTagList] = useState<string[]>(formData.tags);
	const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const keywordTag = useDebounce(tagItem, 500);

	const { data, isSuccess, isPending } = useQuery({
		queryKey: ['keywordTag', keywordTag],
		queryFn: () => getTagKeyword(keywordTag),
		enabled: !!tagItem,
	});

	const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const target = event.currentTarget;

		if (target.value.length !== 0 && event.key === 'Enter') {
			event.preventDefault();
			submitTagItem();
		}
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	const onChangeTagItem = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setTagItem(value);

		if (value.length === 0) {
			setIsDropdownVisible(false);
		} else {
			setIsDropdownVisible(true);
		}
	}, []);

	const submitTagItem = () => {
		setTagList(prev => {
			const trimmedTagItem = tagItem.trim();
			if (!prev.includes(trimmedTagItem) && tagList.length < 5) {
				const updatedList = [...prev, trimmedTagItem];
				setFormData(prev => ({ ...prev, tags: updatedList }));
				return updatedList;
			}
			return prev;
		});
		setTagItem('');
		setIsDropdownVisible(false);
	};

	const deleteTagItem = (id: string) => {
		setTagList(prev => {
			const updatedList = prev.filter(elem => elem !== id);
			setFormData(prev => ({ ...prev, tags: updatedList }));
			return updatedList;
		});
	};

	const onClickTagOptions = (selectedTag: string, event: React.MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		if (!tagList.includes(selectedTag) && tagList.length < 5) {
			setTagList(prev => {
				const updatedList = [...prev, selectedTag];
				setFormData(prev => ({ ...prev, tags: updatedList }));
				return updatedList;
			});
			setIsDropdownVisible(false);
			setTagItem('');
		}
	};

	const handleClickOutside = () => {
		setIsDropdownVisible(false);
		setTagItem('');
	};

	useOutsideClick(dropdownRef, isDropdownVisible, handleClickOutside);

	useEffect(() => {
		if (tags) {
			const tagsWithoutId = tags.map(tag => {
				return tag.name;
			});
			setTagList(tagsWithoutId);
			setFormData(prevFormData => ({
				...prevFormData,
				tags: tagsWithoutId,
			}));
		}
	}, [tags, setFormData]);

	return (
		<S.MeeteamTag ref={dropdownRef}>
			<section className='tag__box'>
				<input
					type='text'
					placeholder={'태그는 최대 5개까지 가능합니다.'}
					tabIndex={2}
					disabled={tagList.length < 20 ? false : true}
					onChange={onChangeTagItem}
					value={tagItem}
					onKeyPress={onKeyPress}
					className='tag-input body1-medium'
				/>
				<img src={Search} className='icon-search' alt='검색 아이콘' />
				{isDropdownVisible && (
					<div className='tag-dropdown body1-medium'>
						{isPending ? (
							<TextBox message='검색중입니다...' />
						) : (
							<>
								{data && data.length > 0
									? data.map((tag: Keyword) => (
											<span
												className='body1-medium option'
												key={tag.id}
												onClick={event => onClickTagOptions(tag.name, event)}
											>
												{tag.name}
											</span>
										))
									: isSuccess && (
											<section className='no-result'>
												<span className='body1-medium'>검색 결과가 없습니다.</span>
												<span className='body1-medium'>해당 태그를 새로 생성할까요?</span>
												<section className='container-btn'>
													<span
														className='btn-create txt2'
														onClick={event => onClickTagOptions(tagItem, event)}
													>
														생성하기
													</span>
													<span className='body1-medium'>{tagItem}</span>
												</section>
											</section>
										)}
							</>
						)}
					</div>
				)}
			</section>
			<section className='tags-selected'>
				{formData.tags.map(tagItem => {
					return (
						<div className='tag__item txt2' key={tagItem}>
							<span>{tagItem}</span>
							<button type='button' className='btn-delete' onClick={() => deleteTagItem(tagItem)}>
								<img src={XBtn} alt='취소 아이콘' />
							</button>
						</div>
					);
				})}
			</section>
		</S.MeeteamTag>
	);
};

export default React.memo(MeeteamTag);
