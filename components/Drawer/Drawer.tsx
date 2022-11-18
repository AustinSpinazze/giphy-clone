/**
 * The Drawer component displays the search history of the user
 */
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from '../../redux/store';
import styles from './styles.module.css';
import { toggleDrawer } from '../../redux/slices/drawerToggleSlice';
import { GIF } from '../../utils/types/types';
import closeIcon from '../../public/close-outline.svg';

interface DrawerProps {
	updateSearchGrid: Function;
	clearSearchGrid: Function;
	clearSearchTerm: Function;
}

const Drawer = ({
	updateSearchGrid,
	clearSearchGrid,
	clearSearchTerm,
}: DrawerProps) => {
	const searchHistory = useSelector(
		(state: RootState) => state.searchHistory.searchHistoryArray
	);
	const drawerState = useSelector(
		(state: RootState) => state.drawerToggle.drawerState
	);

	const dispatch = useDispatch();

	const selectSearchItem = (data: GIF[]) => {
		clearSearchTerm();
		clearSearchGrid();
		updateSearchGrid(data);
	};

	return (
		<div
			className={`${styles.overlay} ${
				drawerState ? styles.show : styles.hide
			}`}
			onClick={() => dispatch(toggleDrawer(false))}
			onKeyDown={(e) => {
				if (e.key === 'Escape') {
					dispatch(toggleDrawer(false));
				}
			}}
		>
			<div
				className={`${styles.drawer} ${
					drawerState ? styles.show : styles.hide
				}`}
			>
				<Image
					src={closeIcon}
					alt='Close Icon'
					width={35}
					height={35}
					className={styles.close}
					onClick={() => dispatch(toggleDrawer(false))}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							dispatch(toggleDrawer(false));
						}
					}}
				/>
				<h2 className={styles.drawerTitle}>Search History</h2>
				{searchHistory.length > 0 ? (
					<ul
						className={`${styles.searchHistoryList} ${
							drawerState ? styles.drawerOpen : null
						}`}
					>
						{searchHistory.map((searchResult, index) => (
							<li
								key={index}
								className={styles.searchHistoryItem}
								onClick={() =>
									selectSearchItem(searchResult.results.data)
								}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										selectSearchItem(
											searchResult.results.data
										);
									}
								}}
							>
								<h3>{searchResult.term}</h3>
								<img
									src={
										searchResult.results.data[0].images
											.original.webp
									}
									alt={searchResult.results.data[0].title}
									className={styles.gif}
								/>
							</li>
						))}
					</ul>
				) : (
					<p>Search history empty 😭</p>
				)}
			</div>
		</div>
	);
};

export default Drawer;
