import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, SyntheticEvent } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	OptionType,
	fontColors,
	defaultArticleState,
	ArticleStateType,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	onApply: (value: Partial<ArticleStateType>) => void;
};
export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isFormOpen, setFormIsOpen] = useState(false);
	const [config, setConfig] =
		useState<Partial<ArticleStateType>>(defaultArticleState);
	const { onApply } = props;

	const handleFormIsOpenToggle = () => {
		setFormIsOpen(!isFormOpen);
	};

	const handleFontSelect = (option: OptionType) => {
		setConfig({
			...config,
			fontFamilyOption: option,
		});
	};

	const handleFontColorSelect = (option: OptionType) => {
		setConfig({
			...config,
			fontColor: option,
		});
	};

	const handleFontSizeSelect = (option: OptionType) => {
		setConfig({
			...config,
			fontSizeOption: option,
		});
	};

	const handeApplyingChanges = (evt?: SyntheticEvent) => {
		evt?.preventDefault();

		onApply(config);
	};

	const handleReset = () => {
		setConfig(defaultArticleState);

		onApply(config);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleFormIsOpenToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						placeholder={'Выберите шрифт'}
						selected={config.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontSelect}></Select>
					<RadioGroup
						name={'размер шрифта'}
						options={fontSizeOptions}
						selected={config.fontSizeOption}
						title={'размер шрифта'}
						onChange={handleFontSizeSelect}
					/>
					<Select
						title={'цвет шрифта'}
						placeholder={'Выберите цвет шрифта'}
						selected={config.fontColor}
						options={fontColors}
						onChange={handleFontColorSelect}></Select>
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
