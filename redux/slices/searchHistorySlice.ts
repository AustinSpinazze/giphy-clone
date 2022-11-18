/* Redux slice for application Search History */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GIF, SearchHistoryState, SearchResult } from '../../utils/types/types';

const initialState: SearchHistoryState = {
	searchHistoryArray: [],
};

export const searchHistorySlice = createSlice({
	name: 'searchHistory',
	initialState,
	reducers: {
		addSearchResult: (state, action: PayloadAction<SearchResult>) => {
			state.searchHistoryArray.push(action.payload);
		},
	},
});

export const { addSearchResult } = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
