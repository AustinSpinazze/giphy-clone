import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DrawerState {
	drawerState: boolean;
}

const initialState: DrawerState = {
	drawerState: false,
};

export const drawerToggleSlice = createSlice({
	name: 'drawerToggle',
	initialState,
	reducers: {
		toggleDrawer: (state, action: PayloadAction<boolean>) => {
			state.drawerState = action.payload;
		},
	},
});

export const { toggleDrawer } = drawerToggleSlice.actions;

export default drawerToggleSlice.reducer;
