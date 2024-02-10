import { Button } from 'react-bootstrap';

import '../../styles/Home.css';
import { useNavigate } from 'react-router-dom';
// import SignatureHistory from './SignatureHistory';

const HomePage = () => {
	const navigate = useNavigate();
	const handleSubmit = () => {
		navigate('/pdf');
	};

	return (
		<div>
			<h1>SignCraft for your online signature</h1> {}
			<Button onClick={handleSubmit}>Add signature</Button>
			{/* <SignatureHistory userId={0} /> */}
		</div>
	);
};

export default HomePage;
