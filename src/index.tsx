import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleConfig, setArticleConfig] =
		useState<Partial<ArticleStateType>>(defaultArticleState);

	const handleApplyFormConfig = (value: Partial<ArticleStateType>) => {
		setArticleConfig(value);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleConfig.fontFamilyOption?.value,
					'--font-size': articleConfig.fontSizeOption?.value,
					'--font-color': articleConfig.fontColor?.value,
					'--container-width': articleConfig.contentWidth?.value,
					'--bg-color': articleConfig.backgroundColor?.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApplyFormConfig}></ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
