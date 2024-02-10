import { Stack, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

interface FormButtonProps {
	isLogin: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ isLogin }) => {
	return (
		<Stack spacing="6">
			{isLogin ? (
				<Button type="submit">Login</Button>
			) : (
				<Button type="submit">Sign in</Button>
			)}
		</Stack>
	);
};

FormButton.propTypes = {
	isLogin: PropTypes.bool.isRequired,
};

export default FormButton;
