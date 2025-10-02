import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

export const App = () => {
	const [articleConfig, setArticleConfig] =
		useState<Partial<ArticleStateType>>(defaultArticleState);

	const handleApplyFormConfig = (value: Partial<ArticleStateType>) => {
		setArticleConfig(value);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleConfig.fontFamilyOption?.value,
					'--font-size': articleConfig.fontSizeOption?.value,
					'--font-color': articleConfig.fontColor?.value,
					'--container-width': articleConfig.contentWidth?.value,
					'--bg-color': articleConfig.backgroundColor?.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onApply={handleApplyFormConfig}
				defaultState={articleConfig}></ArticleParamsForm>
			<Article />
		</main>
	);
};
