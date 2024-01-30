import './Pdf.css';
import React from 'react';
import Header from './header/Header';

function Pdf() {
	const styles = {
		container: {
			maxWidth: 900,
			margin: '0 auto',
		},
		sigBlock: {
			display: 'inline-block',
			border: '1px solid #000',
		},
		documentBlock: {
			maxWidth: 800,
			margin: '20px auto',
			marginTop: 8,
			border: '1px solid #999',
		},
		controls: {
			maxWidth: 800,
			margin: '0 auto',
			marginTop: 8,
		},
	};

	return (
		<div>
			<Header />
			<div style={styles.container}></div>
		</div>
	);
}

export default Pdf;
