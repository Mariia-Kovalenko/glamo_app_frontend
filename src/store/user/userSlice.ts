import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export enum Role {
	UNSET = '',
	CUSTOMER = 'CUSTOMER',
	MASTER = 'MASTER',
}

export interface IUserState {
	isAuth: boolean;
	username: string;
	role: Role;
	token: string;
	profileImage: string;
}

const initialState: IUserState = {
	isAuth: false,
	role: Role.UNSET,
	username: '',
	token: '',
	profileImage: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		authorizeUser: {
			reducer: (state, action: PayloadAction<IUserState>) => {
				const { isAuth, username, role, token, profileImage } = action.payload;
				state.isAuth = isAuth;
				state.role = role;
				state.username = username;
				state.token = token;
				state.profileImage = profileImage;
			},
			prepare: (
				isAuth: boolean,
				username: string,
				role: Role,
				token: string,
				profileImage: string
			) => {
				return { payload: { isAuth, username, role, token, profileImage } };
			},
		},
		logoutUser: (state) => {
			state.isAuth = false;
			state.token = '';
			state.username = '';
		},
	},
});

const { actions, reducer } = userSlice;

export default reducer;
export const { authorizeUser, logoutUser } = actions;
