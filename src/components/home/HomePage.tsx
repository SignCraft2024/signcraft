import { Flex, Text, Button } from '@chakra-ui/react';
import Hero from '../Hero';
import Signature from '../../assets/signature.jpg';
import { ROUTE_PDF_1 } from '../../utils/routes';
import { useContext } from 'react';
import { AuthContext } from '../../security/AuthProvider';

export default function Landing(props) {
	const { currentUser } = useContext(AuthContext);

	return (
		<Flex
			direction="column"
			align="center"
			p={30}
			minH="50vh"
			maxH="75vh"
			bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
			{...props}
		>
			<Hero
				title="A professional online signature application"
				subtitle="Fast and simple"
				image={Signature}
				ctaText="Sign your first document"
				ctaLink={ROUTE_PDF_1}
			/>
			<Flex
				direction="column"
				align="center"
				justify="center"
				bg="white"
				borderRadius="md"
				boxShadow="md"
				w="100%"
				h={20}
			>
				{currentUser.email ? (
					<Text fontSize="s" fontWeight="bold">
						Welcome {currentUser.email}!
					</Text>
				) : (
					<Button
						as="a"
						href="/login"
						colorScheme="teal"
						variant="solid"
						mb={4}
					>
						Log in to get started
					</Button>
				)}
				</Flex>
		</Flex>
	);
}