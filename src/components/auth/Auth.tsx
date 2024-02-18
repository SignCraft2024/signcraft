import { Container, Stack, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { EmailField } from './fields/EmailField';
import { PasswordField } from './fields/PasswordField';
import { FormBody } from './authForm/FormBody';
import FormButton from './authForm/FormButton';
import { FormHeader } from './authForm/FormHeader';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { handleLogin, handleSignIn } from '../../firebase/firebase';
import { authSchema } from '../../utils/yupSchema';
import { ROUTE_HOME } from '../../utils/routes';
import { useState } from 'react';

interface AuthProps {
	isLogin: boolean;
}

interface InputProps {
	email: string;
	password: string;
}

export const Auth: React.FC<AuthProps> = ({ isLogin }) => {
	const [errorMessage, setErrorMessage] = useState<string>('');

	const navigate = useNavigate();

	const loginHandler = (values: InputProps) => {
		handleLogin(values.email, values.password)
			.then((result: UserCredential) => {
				console.log(result);
				navigate(`${ROUTE_HOME}`);
			})
			.catch((error: FirebaseError) => {
				let errorMessage = '';
				if (error.code === 'auth/invalid-credential') {
					errorMessage = 'Email incorrect or wrong password. Please try again.';
				} else {
					errorMessage = error.message;
				}
				setErrorMessage(errorMessage);
			});
	};
	
	const createUserHandler = (values: InputProps) => {
		handleSignIn(values.email, values.password)
			.then((result: UserCredential) => {
				console.log(result);
				navigate(`${ROUTE_HOME}`);
			})
			.catch((error: FirebaseError) => {
				let errorMessage = '';
				if (error.code === 'auth/email-already-in-use') {
					errorMessage = 'Email already used by another account.';
				} else {
					errorMessage = error.message;
				}
				setErrorMessage(errorMessage);
			});
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: authSchema,
		onSubmit: (values) => {
			isLogin ? loginHandler(values) : createUserHandler(values);
		},
	});

	return (
		<Container
			maxW="lg"
			py={{ base: '12', md: '24' }}
			px={{ base: '0', sm: '8' }}
		>
			{errorMessage && (
				<Alert status="error" mb={4}>
					<AlertIcon />
					<AlertDescription>{errorMessage}</AlertDescription>
				</Alert>
			)}
			<Stack spacing="8">
				<FormHeader isLogin={isLogin} />
				<FormBody onSubmit={formik.handleSubmit}>
					<Stack spacing="6">
						<Stack spacing="5">
							<EmailField
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
							{formik.touched.email && formik.errors.email && (
								<span className="error">{formik.errors.email}</span>
							)}
							<PasswordField
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
							{formik.touched.password && formik.errors.password && (
								<span className="error">{formik.errors.password}</span>
							)}
							<span>{error}</span>
						</Stack>
						<FormButton isLogin={isLogin} />
					</Stack>
				</FormBody>
			</Stack>
		</Container>
	);
};

Auth.propTypes = {
	isLogin: PropTypes.bool.isRequired,
};
