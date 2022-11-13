import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from '../redux/store';
import { addSearchResult } from '../redux/slices/searchHistorySlice';
import styles from './styles.module.css';
import { GIF, GIFObject } from '../utils/types/types';

export const getStaticProps: GetStaticProps<{
	initialRandomGifs: GIF[];
}> = async () => {
	const randomGifMapper: number[] = [0, 1, 2];

	const initialRandomGifs: GIF[] = await Promise.all(
		randomGifMapper.map(async () => {
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=Hello&rating=g`
			);
			const data = await response.json();
			return data;
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
		(state: RootState) => state.searchHistory
	);
	const dispatch = useDispatch();

	return (
		<main className={styles.mainContainer}>
			{initialRandomGifs.map(({ data }, index) => {
				return <p key={index}>{data.id}</p>;
			})}
		</main>
	);
}
