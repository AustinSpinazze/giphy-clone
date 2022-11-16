import { configureStore } from '@reduxjs/toolkit';
import searchHistoryReducer from '../redux/slices/searchHistorySlice';

export const store = configureStore({
	reducer: {
		searchHistory: searchHistoryReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
