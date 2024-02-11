import { Box } from '@chakra-ui/react';
import { FormHTMLAttributes } from 'react';
import PropTypes from 'prop-types';

interface FormBodyProps extends FormHTMLAttributes<HTMLFormElement> {
	// You can add any additional custom props specific to your component
}

export const FormBody: React.FC<FormBodyProps> = ({
	children,
	...restProps
}) => {
	return (
		<form {...restProps}>
			<Box
				py={{ base: '0', sm: '8' }}
				px={{ base: '4', sm: '10' }}
				bg={{ base: 'transparent', sm: 'bg.surface' }}
				boxShadow={{ base: 'none', sm: 'md' }}
				borderRadius={{ base: 'none', sm: 'xl' }}
			>
				{children}
			</Box>
		</form>
	);
};

FormBody.propTypes = {
	children: PropTypes.node.isRequired,
};
