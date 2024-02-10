import { Flex } from '@chakra-ui/react';
import Hero from '../Hero';
import Signature from '../../assets/signature.jpg';
export default function Landing(props) {
	return (
		<Flex
			direction="column"
			align="center"
			maxW={{ xl: '1200px' }}
			m="0 auto"
			{...props}
		>
			<Hero
				title="A professional online signature application"
				subtitle="Fast and simple"
				image={Signature}
				ctaText="Sign your first document"
				ctaLink="/pdf"
			/>
		</Flex>
	);
}
