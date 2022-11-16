import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { shallowEqual, useSelector } from 'react-redux';

import type { RootState } from '../redux/store';
import styles from './styles.module.css';
import { GIF } from '../utils/types/types';
import Grid from '../components/common/Grid/Grid';
import { Card, SearchBar } from '../components';

export const getStaticProps: GetStaticProps<{
	initialRandomGifs: GIF[];
}> = async () => {
	const randomGifMapper: number[] = [0, 1, 2];

	const initialRandomGifs: GIF[] = await Promise.all(
		randomGifMapper.map(async () => {
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=Hello&rating=g`
			);
			const result = await response.json();
			return result.data;
		})
	);

	return {
		props: {
			initialRandomGifs,
		},
	};
};

export default function Home({
	initialRandomGifs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const searchHistory = useSelector(
		(state: RootState) => state.searchHistory.searchHistoryArray
	);

	return (
		<main className={styles.mainContainer}>
			<section className={styles.randomSection}>
				<h2>Welcome to Diamond GIFs</h2>
				<p>
					(Enjoy the random selection of GIFs below or scroll down to
					search for more)
				</p>
				<div className={styles.mouse} />
				<Grid gifs={initialRandomGifs} Card={Card} />
			</section>
			<section className={styles.searchSection}>
				<h2>Search for GIFs</h2>
				<SearchBar />
				{searchHistory.length > 0 ? (
					<Grid
						gifs={
							searchHistory[searchHistory.length - 1].results.data
						}
						Card={Card}
					/>
				) : (
					<p>No GIFs found</p>
				)}
			</section>
		</main>
	);
}
