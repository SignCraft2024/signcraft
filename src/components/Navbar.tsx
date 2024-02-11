import { Link } from 'react-router-dom';
import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';
import Logo from '../assets/logo.png';
import { logOut } from '../firebase/firebase';
import PropTypes from 'prop-types';

const MenuItem = (props) => {
	const { children, isLast, to = '/', ...rest } = props;
	return (
		<Text
			mb={{ base: isLast ? 0 : 8, sm: 0 }}
			mr={{ base: 0, sm: isLast ? 0 : 8 }}
			display="block"
			{...rest}
		>
			<Link to={to}>{children}</Link>
		</Text>
	);
};

const Navbar = (props) => {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			mb={4}
			p={8}
			bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
			{...props}
		>
			<Flex align="center">
				<Link to={'/'}>
					<Image src={Logo} height={50} rounded={50} />
				</Link>
			</Flex>

			<Box flexBasis={{ base: '100%', md: 'auto' }}>
				<Flex
					align={['center', 'center', 'center', 'center']}
					justify={['center', 'space-between', 'flex-end', 'flex-end']}
					direction={['column', 'row', 'row', 'row']}
					pt={[4, 4, 0, 0]}
				>
					<MenuItem to="/">Home</MenuItem>
					<MenuItem to="/pdf">PDF </MenuItem>
					<MenuItem>
						<Button
							onClick={() => logOut()}
							size="sm"
							rounded="md"
							_hover={{
								bg: [
									'primary.100',
									'primary.100',
									'primary.600',
									'primary.600',
								],
							}}
						>
							Logout
						</Button>
					</MenuItem>
				</Flex>
			</Box>
		</Flex>
	);
};

MenuItem.propTypes = {
	children: PropTypes.node,
	isLast: PropTypes.any,
	to: PropTypes.string,
};

export default Navbar;