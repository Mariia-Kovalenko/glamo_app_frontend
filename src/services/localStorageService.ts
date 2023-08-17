import { ACCESS_TOKEN } from '../constants';

type UserFromLocal = {
	token: string | null;
};

export class LocalStorageService {
	static saveUserToLocal(token: string): void {
		localStorage.setItem(ACCESS_TOKEN, token);
	}

	static getUserFromLocal(): UserFromLocal {
		return {
			token: localStorage.getItem(ACCESS_TOKEN),
		};
	}

	static removeUserFromLocal(): void {
		if (localStorage.getItem(ACCESS_TOKEN)) {
			localStorage.removeItem(ACCESS_TOKEN);
		}
	}
}
