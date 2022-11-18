/**
 * The SearchBar component enables the user to be able to search for GIFs from Giphy
 */
import { useState, useEffect, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';

import { addSearchResult } from '../../../redux/slices/searchHistorySlice';
import useDebounce from '../../../hooks/useDebounce';
import styles from './styles.module.css';
import { MultiResponse, SearchResult } from '../../../utils/types/types';

interface SearchBarProps {
	updateSearchGrid: Function;
	clearSearchGrid: Function;
	searchTerm: string;
	updateSearchTerm: Function;
}

const SearchBar = ({
	updateSearchGrid,
	clearSearchGrid,
	searchTerm,
	updateSearchTerm,
}: SearchBarProps) => {
	const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
	const debouncedValue = useDebounce<string>(searchTerm, 2000);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!searchInProgress) {
			if (debouncedValue) {
				fetchData(debouncedValue);
			}
		}
	}, [debouncedValue]);

	const fetchData = async (term: string) => {
		clearSearchGrid();
		const response = await fetch('/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ searchTerm: term }),
		});
		const results: MultiResponse = await response.json();
		const searchResult: SearchResult = { results, term };
		dispatch(addSearchResult(searchResult));
		updateSearchGrid(results.data);
	};

	const updateSearchProgress = (value: boolean) => {
		setSearchInProgress(value);
	};

	const handleImmediateSearch = (event: KeyboardEvent<HTMLInputElement>) => {
		if (searchTerm.length > 0) {
			if (event.key === 'Enter') {
				updateSearchProgress(true);
				fetchData(searchTerm);
				setTimeout(() => {
					updateSearchProgress(false);
				}, 2000);
			}
		}
	};

	return (
		<input
			className={styles.searchBar}
			onChange={(e) => updateSearchTerm(e)}
			value={searchTerm}
			placeholder='Search...'
			onKeyDown={(e) => handleImmediateSearch(e)}
		/>
	);
};

export default SearchBar;
