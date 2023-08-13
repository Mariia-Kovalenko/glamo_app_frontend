import * as yup from 'yup';

const PASS = /^(?=.*\d)(?=.*[a-z])(?=.*[!_$&%*/?=+-]).{8,14}$/;

const loginValidationObject = {
	email: yup
		.string()
		.email('Enter a valid email address')
		.required('Email is required'),
	password: yup
		.string()
		.matches(PASS, {
			message:
				'Password should have at least 1 lowercase letter, 1 number, 1 special character',
		})
		.required('Password is required'),
};

export const loginValidationSchema = yup.object().shape(loginValidationObject);

export const registerValidationSchema = yup.object().shape({
	username: yup.string().min(3).max(20).required('Username is required'),
	...loginValidationObject,
});
