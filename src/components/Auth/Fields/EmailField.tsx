import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const EmailField = forwardRef<HTMLInputElement, InputProps>(
	(props, ref) => {
		return (
			<FormControl>
				<FormLabel htmlFor="email">Email</FormLabel>
				<Input id="email" name="email" type="email" ref={ref} {...props} />
			</FormControl>
		);
	},
);

EmailField.displayName = 'EmailField';
