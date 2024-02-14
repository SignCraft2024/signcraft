import { Flex } from '@chakra-ui/react';
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
			maxW={{ xl: '1200px' }}
			m="0 auto"
			{...props}
		>
			<Hero
				title="A professional online signature application"
				subtitle="Fast and simple"
				image={Signature}
				ctaText="Sign your first document"
				ctaLink={`${ROUTE_PDF_1}`}
			/>
			{currentUser.email}
		</Flex>
	);
}
