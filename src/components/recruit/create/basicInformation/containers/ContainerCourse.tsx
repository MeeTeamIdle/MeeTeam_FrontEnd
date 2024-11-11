import React, { useState, useRef, useCallback } from 'react';
import S from '../BasicInformation.styled';
import { useQuery } from '@tanstack/react-query';
import { useDebounce, useOutsideClick } from '../../../../../hooks';
import { getCourseKeyword, getProfessorKeyword } from '../../../../../service';
import { useRecoilState } from 'recoil';
import { recruitInputState } from '../../../../../atom';
import { Keyword } from '../../../../../types';
import { TextBox } from '../../../../index';

interface ContainerCourseProps {
	course?: string | null;
	professor?: string | null;
}

const ContainerCourse = ({ course, professor }: ContainerCourseProps) => {
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const [formData, setFormData] = useRecoilState(recruitInputState);
	const [isChecked, setIsChecked] = useState<boolean>(formData.courseTag.isCourse);
	const [name, setName] = useState({
		course: course ?? '',
		professor: professor ?? '',
	});
	const [dropdown, setDropdown] = useState({
		course: false,
		professor: false,
	});
	const keywordCourse = useDebounce(name.course, 500);
	const keywordProfessor = useDebounce(name.professor, 500);
	const { data: dataCourse, isPending: isPendingCourse } = useQuery({
		queryKey: ['searchCourse', keywordCourse],
		queryFn: () => getCourseKeyword(keywordCourse ?? ''),
		enabled: !!keywordCourse,
		staleTime: Infinity,
		gcTime: Infinity,
	});
	const { data: dataProfessor, isPending: isPendingProfessor } = useQuery({
		queryKey: ['searchProfessor', keywordProfessor],
		queryFn: () => getProfessorKeyword(keywordProfessor ?? ''),
		enabled: !!keywordProfessor,
		staleTime: Infinity,
		gcTime: Infinity,
	});

	const onChangeCourse = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const keyword = event.target.value;
		setName(prev => ({ ...prev, course: keyword }));
		setDropdown({ course: keyword.length > 0, professor: false });

		if (keyword.length === 0) {
			setDropdown({ course: false, professor: false });
		}
	}, []);

	const onChangeProfessor = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const keyword = event.target.value;
		setName(prev => ({ ...prev, professor: keyword }));
		setDropdown({ course: false, professor: true });

		if (keyword.length === 0) {
			setDropdown({ course: false, professor: false });
		}
	}, []);

	const onClickCheckbox = () => {
		setIsChecked(prev => !prev);
		setFormData(prev => ({
			...prev,
			courseTag: { ...prev.courseTag, isCourse: true },
		}));
		setDropdown({ course: false, professor: false });
	};

	const onClickCourse = (event: React.MouseEvent<HTMLSpanElement>) => {
		const { innerText } = event.target as HTMLElement;
		setName(prev => ({ ...prev, course: innerText }));
		setFormData(prev => ({
			...prev,
			courseTag: { ...prev.courseTag, courseTagName: innerText },
		}));
		setDropdown(prev => ({ ...prev, course: false }));
	};

	const onClickProfessor = (event: React.MouseEvent<HTMLSpanElement>) => {
		const { innerText } = event.target as HTMLElement;
		setName(prev => ({ ...prev, professor: innerText }));
		setFormData(prev => ({
			...prev,
			courseTag: { ...prev.courseTag, courseProfessor: innerText },
		}));
		setDropdown(prev => ({ ...prev, professor: false }));
	};

	const onKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	useOutsideClick(dropdownRef, dropdown.course, () =>
		setDropdown(prev => ({ ...prev, course: false }))
	);
	useOutsideClick(dropdownRef, dropdown.professor, () =>
		setDropdown(prev => ({ ...prev, professor: false }))
	);

	return (
		<S.ContainerCourse $isChecked={isChecked} ref={dropdownRef}>
			<span className='input-subtitle'>수업</span>
			<section className='intro'>
				<span className='description'>수업이신 경우 오른쪽의 “수업” 체크박스를 눌러주세요.</span>
				<section className='container-checkbox'>
					<input type='checkbox' id='course' onClick={onClickCheckbox} checked={isChecked} />
					<label className='course-label' htmlFor='course'>
						수업
					</label>
				</section>
			</section>
			<section className='wrapper-inputs'>
				<section className='container-inputs'>
					<input
						type='text'
						placeholder='수업명'
						value={name.course}
						disabled={!isChecked ? true : false}
						onChange={onChangeCourse}
						onKeyDown={onKeyDown}
						onFocus={() => setDropdown({ course: false, professor: false })}
					/>
					{dropdown.course && (
						<section className='dropdown'>
							{isPendingCourse ? (
								<TextBox message='검색중입니다...' />
							) : dataCourse && dataCourse.length > 0 ? (
								dataCourse.map((keyword: Keyword) => (
									<span key={keyword.id} onClick={onClickCourse} className='option'>
										{keyword.name}
									</span>
								))
							) : (
								<section className='no-result'>
									<TextBox message='검색 결과가 없습니다.' />
									<span className='body1-medium'>해당 수업을 새로 추가할까요?</span>
									<section className='container-btn'>
										<span
											className='btn-create txt2'
											onClick={() => setDropdown({ course: false, professor: false })}
										>
											추가하기
										</span>
										<span className='body1-medium'>{keywordProfessor}</span>
									</section>
								</section>
							)}
						</section>
					)}
				</section>
				<section className='container-inputs'>
					<input
						type='text'
						placeholder='교수명'
						value={name.professor}
						disabled={!isChecked ? true : false}
						onChange={onChangeProfessor}
						onKeyDown={onKeyDown}
						onFocus={() => setDropdown({ course: false, professor: false })}
					/>
					{dropdown.professor && (
						<section className='dropdown'>
							{isPendingProfessor ? (
								<TextBox message='검색중입니다...' />
							) : dataProfessor && dataProfessor.length > 0 ? (
								dataProfessor.map((keyword: Keyword) => (
									<span key={keyword.id} onClick={onClickProfessor} className='option'>
										{keyword.name}
									</span>
								))
							) : (
								<section className='no-result'>
									<TextBox message='검색 결과가 없습니다.' />
									<span className='body1-medium'>해당 교수님을 새로 추가할까요?</span>
									<section className='container-btn'>
										<span
											className='btn-create txt2'
											onClick={() => setDropdown({ course: false, professor: false })}
										>
											추가하기
										</span>
										<span className='body1-medium'>{keywordProfessor}</span>
									</section>
								</section>
							)}
						</section>
					)}
				</section>
			</section>
		</S.ContainerCourse>
	);
};

export default React.memo(ContainerCourse);
