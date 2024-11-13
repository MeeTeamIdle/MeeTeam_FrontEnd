import React, { useEffect, useState } from 'react';
import S from './SchoolCertificationPage.styled';
import { GoBack, Input, PrimaryBtn } from '../../../components';
import { SCHOOL_CERTIFICATION_DATA } from '../..';
import {
	useCertificateSchool,
	useReadUniversityList,
	useReadDepartmentList,
	useDebounce,
	useCheckDevice,
} from '../../../hooks';
import { ComboBox } from '../../../components';
import { useForm, SubmitHandler, Path } from 'react-hook-form';
import { Department } from '../../../types';
import secureLocalStorage from 'react-secure-storage';

interface FormValues {
	year: string;
	university: string;
	department: string;
	email: string;
}

const SchoolCertificationPage = () => {
	const [next, setNext] = useState(false);
	const [submitEmail, setSubmitEmail] = useState(false);
	const [domain, setDomain] = useState<string>();
	const [universityId, setUniversityId] = useState<string>();

	const nextHandler = (e: React.MouseEvent) => {
		// 학과 리스트 넘겨줄 때 domain 만 따로 넘겨주는 거 변경 요청 시도
		e.preventDefault();
		setDomain(
			universityList?.find(university => university.universityName === getValues('university'))
				?.universityDomain
		);
		setUniversityId(
			universityList?.find(university => university.universityName === getValues('university'))
				?.universityId
		);
		setNext(prev => !prev);
	};

	useEffect(() => {
		sessionStorage?.university && readDepartmentList();
	}, [sessionStorage?.university]);

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		watch,
		formState: { isValid }, // 제거하면 watch 가 적용이 안되는 이슈 존재
	} = useForm<FormValues>();

	const checkCertificationInSuccess = () => {
		setSubmitEmail(() => true);
	};

	const { mutate } = useCertificateSchool({ onSuccess: checkCertificationInSuccess });

	const certificateHandler: SubmitHandler<FormValues> = data => {
		mutate({
			platformId: secureLocalStorage.getItem('PLATFORM_ID') as string,
			year: data.year,
			universityId: universityId,
			departmentId: departmentList?.find(
				department => department.departmentName === getValues('department')
			)?.departmentId,
			emailId: data.email,
		});
	};

	const { data: universityList, refetch: readUniversityList } = useReadUniversityList();
	const { data: departmentList, refetch: readDepartmentList } = useReadDepartmentList(
		universityId as string
	);

	useEffect(() => {
		readUniversityList();
	}, []);

	useEffect(() => {
		domain && readDepartmentList();
	}, [domain]);

	const optionList = (name: string) => {
		if (name === 'year') {
			const currentYear = new Date().getFullYear();
			return Array.from({ length: currentYear - 1970 + 1 }, (_, index) => ({
				name: (currentYear - index).toString(),
			}));
		}
		if (name === 'university') {
			return universityList?.map(university => ({
				id: university.universityId,
				name: university.universityName,
			}));
		} else if (name === 'department') {
			return departmentList?.map((department: Department) => ({
				id: department.departmentId,
				name: department.departmentName,
			}));
		}
	};

	const autoCompleteOptionList = (name: string) => {
		return optionList(name)
			?.filter(option => option.name.includes(watch(name as Path<FormValues>)))
			.sort();
	};

	const checkExistYear = optionList('year')?.find(
		(year: { name: string }) => year.name === getValues('year')
	);
	const checkExistUniversity = universityList?.find(
		university => university.universityName === getValues('university')
	);
	const checkExistDepartment = departmentList?.find(
		(department: Department) => department.departmentName === getValues('department')
	);

	const [nextDisable, setNextDisable] = useState(true);
	const [submitDisable, setDisableSubmit] = useState(true);

	const year = useDebounce(watch('year'));
	const university = useDebounce(watch('university'));
	const department = useDebounce(watch('department'));
	const email = useDebounce(watch('email'));

	useEffect(() => {
		setNextDisable(!checkExistYear || !checkExistUniversity);
	}, [year, university]);

	useEffect(() => {
		setDisableSubmit(!checkExistDepartment || !getValues('email') || !isValid);
	}, [department, email]);

	/// 반응형
	const { isMobile } = useCheckDevice();

	return (
		<S.SchoolCertificationLayout $isMobile={isMobile}>
			<header className='account__header'>
				<h1>{`학교 인증하고,\n밋팀을 만나보세요!`}</h1>
				{next && (
					<GoBack clickHandler={e => nextHandler(e)} style='left: -15.98rem; top: -5.53rem; ' />
				)}
			</header>
			<S.SchoolCertificationPageForm
				onSubmit={handleSubmit(certificateHandler)}
				$submitEmail={submitEmail}
			>
				<div className='account__form-column'>
					{SCHOOL_CERTIFICATION_DATA.map(
						({ isNext, name, ...props }) =>
							isNext === next && (
								<S.SchoolCertificationRow key={name}>
									{name !== 'email' ? (
										<ComboBox
											register={register}
											setValue={setValue}
											getValues={getValues}
											optionList={autoCompleteOptionList(name)}
											name={name}
											{...props}
										/>
									) : (
										<>
											<Input register={register} name={name} {...props} />
											<S.SchoolCertificationEmailDomain>{`@ ${domain}`}</S.SchoolCertificationEmailDomain>
										</>
									)}
								</S.SchoolCertificationRow>
							)
					)}
				</div>
				{submitEmail && (
					<S.SchoolCertificationMark>인증 이메일이 발송되었습니다.</S.SchoolCertificationMark>
				)}
				<div>
					<PrimaryBtn
						title={next ? '인증하기' : '다음'}
						type={next ? 'submit' : 'button'}
						handleClick={e => !next && nextHandler(e)}
						disabled={next ? submitDisable : nextDisable}
					/>
				</div>
			</S.SchoolCertificationPageForm>
		</S.SchoolCertificationLayout>
	);
};

export default SchoolCertificationPage;
