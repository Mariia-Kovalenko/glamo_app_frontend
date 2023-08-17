import axios from 'axios';
import { API_URL, AUTH, LOGIN, REGISTER, RESET_PASS, USERS } from '../constants';


export enum Role {
	MASTER = 'MASTER',
	CUSTOMER = 'CUSTOMER',
}

export class AuthService {
	static login(email: string, password: string) {
		return axios.post(API_URL + AUTH + LOGIN, {
			email,
			password,
		});
	}

	static register(
		username: string,
		email: string,
		password: string,
		role: Role
	) {
		return axios.post(API_URL + AUTH + REGISTER, {
			username,
			email,
			password,
			role,
		});
	}

	static resetPassword(email: string) {
		return axios.post(API_URL + AUTH + RESET_PASS, {
			email
		});
	}
}

export class UsersService {
	static getMasters(
		token: string,
		myLocation: { lat: string | number; lng: string | number },
		radius: number,
		services: string[]
	) {
		return axios.post(
			API_URL + USERS + 'masters/near',
			{
				lat: myLocation.lat,
				lng: myLocation.lng,
				radius: radius,
				serviceTypes: services,
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);
	}

	static getMasterById(id: string, token: string) {
		return axios.get(API_URL + USERS + 'masters/' + id, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	}

	static getProfileInfo(token: string) {
		return axios.get(API_URL + USERS + 'me', {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	}
}

export class ServicesListService {
	static getServices() {
		return axios.get(API_URL + 'service-types');
	}
}
