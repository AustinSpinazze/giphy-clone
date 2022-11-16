import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { addSearchResult } from '../../../redux/slices/searchHistorySlice';
import useDebounce from '../../../hooks/useDebounce';
import styles from './styles.module.css';
import { MultiResponse, SearchResult } from '../../../utils/types/types';

const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debouncedValue = useDebounce<string>(searchTerm, 2000);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ searchTerm: debouncedValue }),
			});
			const results: MultiResponse = await response.json();
			const searchResult: SearchResult = { results, debouncedValue };
			dispatch(addSearchResult(searchResult));
		};

		if (debouncedValue) {
			fetchData();
		}
	}, [debouncedValue, dispatch]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return (
		<input
			className={styles.searchBar}
			onChange={handleChange}
			value={searchTerm}
			placeholder='Search millions of GIFs here...'
		/>
	);
};

export default SearchBar;
