import { Stack, Heading, Text, Link, Image } from '@chakra-ui/react';
import Logo from '../../../assets/Logo.png';
import PropTypes from 'prop-types';

interface FormHeaderProps {
	isLogin: boolean;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ isLogin }) => {
	return (
		<Stack spacing="6" align="center" justify="center">
			<Image src={Logo} alt="My logo" width={20} rounded={50} />
			<Stack spacing={{ base: '2', md: '3' }} textAlign="center">
				{isLogin ? (
					<Heading size={{ base: 'xs', md: 'sm' }}>
						Log in to your account
					</Heading>
				) : (
					<Heading size={{ base: 'xs', md: 'sm' }}>Create an account</Heading>
				)}
				{isLogin && (
					<Text color="fg.muted">
						Don&apos;t have an account? <Link href="#">Sign up</Link>
					</Text>
				)}
			</Stack>
		</Stack>
	);
};

FormHeader.propTypes = {
	isLogin: PropTypes.bool.isRequired,
};
