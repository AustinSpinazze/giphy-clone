import { ChangeEvent, useState } from 'react';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import { GIF } from '../utils/types/types';
import { Card, Drawer, SearchBar, Grid } from '../components';
import styles from './styles.module.css';

export const getServerSideProps: GetServerSideProps<{
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [currentSearch, setCurrentSearch] = useState<GIF[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const toggleLoader = (value: boolean) => {
		setLoading(value);
	};

	const updateSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const clearSearchTerm = () => {
		setSearchTerm('');
	};

	const updateSearchGrid = (data: GIF[]) => {
		setTimeout(() => {
			setCurrentSearch(data);
			toggleLoader(false);
		}, 1000);
	};

	const clearSearchGrid = () => {
		setCurrentSearch([]);
		toggleLoader(true);
	};

	return (
		<main className={styles.mainContainer}>
			<Drawer
				updateSearchGrid={updateSearchGrid}
				clearSearchGrid={clearSearchGrid}
				clearSearchTerm={clearSearchTerm}
			/>
			<section className={styles.randomSection}>
				<h2>Welcome to Diamond GIFs</h2>
				<p>
					(Enjoy the random selection of GIFs below or scroll down to
					search for more)
				</p>
				<div className={styles.mouse} />
				{/* <Grid
					gifs={initialRandomGifs}
					Card={Card}
					columns='gridColumnThree'
					loading={loading}
				/> */}
			</section>
			<section className={styles.searchSection}>
				<h2>Search for GIFs</h2>
				<SearchBar
					updateSearchGrid={updateSearchGrid}
					clearSearchGrid={clearSearchGrid}
					searchTerm={searchTerm}
					updateSearchTerm={updateSearchTerm}
				/>
				{currentSearch && (
					<Grid
						gifs={currentSearch}
						Card={Card}
						columns='gridColumnFour'
						loading={loading}
					/>
				)}
			</section>
		</main>
	);
}
