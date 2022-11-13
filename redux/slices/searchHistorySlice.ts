import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GIF } from '../../utils/types/types';

export interface SearchHistoryState {
	searchHistory: SearchResult[];
}

export interface SearchResult {
	[key: string]: GIF;
}

const initialState: SearchHistoryState = {
	searchHistory: [],
};

export const searchHistorySlice = createSlice({
	name: 'searchHistory',
	initialState,
	reducers: {
		addSearchResult: (state, action: PayloadAction<SearchResult>) => {
			state.searchHistory.push(action.payload);
		},
	},
});

export const { addSearchResult } = searchHistorySlice.actions;

export default searchHistorySlice.reducer;
