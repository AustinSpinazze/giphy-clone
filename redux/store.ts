import { configureStore } from '@reduxjs/toolkit';
import searchHistoryReducer from '../redux/slices/searchHistorySlice';
import drawerToggleReducer from './slices/drawerToggleSlice';

/* Creating a store with the reducers. */
export const store = configureStore({
	reducer: {
		searchHistory: searchHistoryReducer,
		drawerToggle: drawerToggleReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
