import { ChangeEvent, useState } from 'react';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import { GIF } from '../utils/types/types';
import { Card, Drawer, SearchBar, Grid, Loader } from '../components';
import styles from './styles.module.css';

/**
 * It fetches three random gifs from the Giphy API and returns them as props to the page
 * @returns An object with a property called props.
 */
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

	/**
	 * The toggleLoader function takes a boolean value and sets the loading state to that value.
	 * @param {boolean} value - boolean - This is the value that controls when the loader is shown.
	 */
	const toggleLoader = (value: boolean) => {
		setLoading(value);
	};

	/**
	 * UpdateSearchTerm is a function that takes the input event from the SearchBar and sets
	 * the searchTerm state
	 * @param event - ChangeEvent<HTMLInputElement>
	 */
	const updateSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	/**
	 * This function is called when the user selects a search history item and clears the search bar value
	 * so they can have a fresh search bar
	 */
	const clearSearchTerm = () => {
		setSearchTerm('');
	};

	/**
	 * When the user searches for a term or selects an item from the searchHistory,
	 * the current grid state is updated and the loader is toggled off.
	 * @param {GIF[]} data - The data that is returned from the API call or from the searchHistory store.
	 */
	const updateSearchGrid = (data: GIF[]) => {
		setTimeout(() => {
			setCurrentSearch(data);
			toggleLoader(false);
		}, 1000);
	};

	/**
	 * It sets the current grid to an empty array and toggles the loader to true
	 */
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
				{initialRandomGifs.length > 0 ? (
					<Grid
						gifs={initialRandomGifs}
						Card={Card}
						columns='gridColumnThree'
					/>
				) : (
					<p>No GIFs found...👎</p>
				)}
			</section>
			<section className={styles.searchSection}>
				<h2>Search for GIFs</h2>
				<SearchBar
					updateSearchGrid={updateSearchGrid}
					clearSearchGrid={clearSearchGrid}
					searchTerm={searchTerm}
					updateSearchTerm={updateSearchTerm}
				/>
				{currentSearch.length > 0 ? (
					<Grid
						gifs={currentSearch}
						Card={Card}
						columns='gridColumnFour'
					/>
				) : loading === true ? (
					<Loader />
				) : (
					<p>No GIFs found...👎</p>
				)}
			</section>
		</main>
	);
}
