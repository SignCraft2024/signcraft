import { object, string } from 'yup';

export const authSchema = object().shape({
	email: string()
		.email('⚠️ Must be a valid Email')
		.required('⚠️ Email is required'),
	password: string()
		.required('⚠️ Password is required')
		.min(10, '⚠️ Min 10 char')
		.max(64, '⚠️ Max 64'),
});
