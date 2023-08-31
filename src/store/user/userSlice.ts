import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export enum Role {
	UNSET = '',
	CUSTOMER = 'CUSTOMER',
	MASTER = 'MASTER',
}

export interface IUserState {
	id: string;
	isAuth: boolean;
	username: string;
	role: Role;
	token: string;
	profileImage: string;
}

const initialState: IUserState = {
	id: '',
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
				const { id, isAuth, username, role, token, profileImage } = action.payload;
				state.id = id;
				state.isAuth = isAuth;
				state.role = role;
				state.username = username;
				state.token = token;
				state.profileImage = profileImage;
			},
			prepare: (
				id: string,
				isAuth: boolean,
				username: string,
				role: Role,
				token: string,
				profileImage: string
			) => {
				return { payload: { id, isAuth, username, role, token, profileImage } };
			},
		},
		logoutUser: (state) => {
			state.isAuth = false;
			state.token = '';
			state.username = '';
			state.id = '';
		},
		updateUserProfile: {
			reducer: (state, action: PayloadAction<{ profileImage: string }>) => {
				const { profileImage } = action.payload;
				state.profileImage = profileImage;
			}, 
			prepare: (profileImage: string) => {
				return { payload: { profileImage }}
			}
		}
	},
});

const { actions, reducer } = userSlice;

export default reducer;
export const { authorizeUser, logoutUser, updateUserProfile } = actions;
