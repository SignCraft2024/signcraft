import { useState } from 'react';
import { Button } from 'react-bootstrap';

import '../../styles/Home.css';
import SignatureHistory from './SignatureHistory';

const HomePage = () => {
	const [signature] = useState('');

	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		console.log('Signature:', signature);
	};

	return (
		<div>
			<h1>SignCraft for your online signature</h1> {}
			<Button onClick={handleSubmit}>Add signature</Button>
			<SignatureHistory userId={0} />
		</div>
	);
};

export default HomePage;
