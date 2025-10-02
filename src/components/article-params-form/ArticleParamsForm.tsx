import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, SyntheticEvent, useRef } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	OptionType,
	fontColors,
	defaultArticleState,
	ArticleStateType,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideFromClose } from 'components/article-params-form/hooks/useOutsideFormClose';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	onApply: (value: Partial<ArticleStateType>) => void;
	defaultState: Partial<ArticleStateType>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onApply, defaultState } = props;
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
	const [articleState, setArticleState] =
		useState<Partial<ArticleStateType>>(defaultState);
	const formRef = useRef<HTMLElement | null>(null);

	const handleFormIsOpenToggle = () => {
		setFormIsOpen(!formIsOpen);
	};

	const handleFontSelect = (option: OptionType) => {
		setArticleState({
			...articleState,
			fontFamilyOption: option,
		});
	};

	const handleFontSizeSelect = (option: OptionType) => {
		setArticleState({
			...articleState,
			fontSizeOption: option,
		});
	};

	const handleFontColorSelect = (option: OptionType) => {
		setArticleState({
			...articleState,
			fontColor: option,
		});
	};

	const handleBgColorSelect = (option: OptionType) => {
		setArticleState({
			...articleState,
			backgroundColor: option,
		});
	};

	const handleContentWidthSelect = (option: OptionType) => {
		setArticleState({
			...articleState,
			contentWidth: option,
		});
	};

	const handeApplyingChanges = (evt?: SyntheticEvent) => {
		evt?.preventDefault();

		onApply(articleState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);

		onApply(articleState);
	};

	const handleEscKeyClose = () => {
		setFormIsOpen(false);
	};

	useOutsideFromClose({
		formIsOpen: formIsOpen,
		rootRef: formRef,
		onChange: setFormIsOpen,
		onClose: handleEscKeyClose,
	});

	return (
		<>
			<ArrowButton isOpen={formIsOpen} onClick={handleFormIsOpenToggle} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handeApplyingChanges}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontSelect}></Select>
					<RadioGroup
						name={'размер шрифта'}
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						title={'размер шрифта'}
						onChange={handleFontSizeSelect}
					/>
					<Select
						title={'цвет шрифта'}
						selected={articleState.fontColor}
						options={fontColors}
						onChange={handleFontColorSelect}></Select>
					<Separator />
					<Select
						title={'цвет фона'}
						selected={articleState.backgroundColor}
						options={backgroundColors}
						onChange={handleBgColorSelect}></Select>
					<Select
						title={'ширина контейнера'}
						selected={articleState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthSelect}></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handeApplyingChanges}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
