import { listAll, ref } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../security/AuthProvider';
import { storage } from '../../firebase/firebase';

export function History() {
	const { currentUser } = useContext(AuthContext);
	const [files, setFiles] = useState([]);

	useEffect(() => {
		const bucketRef = ref(storage, `/files/${currentUser.email}/`);
		listAll(bucketRef)
			.then((res) => {
				const fileItems = res.items;
				setFiles(fileItems);
			})
			.catch((error) => {
				console.error('Error fetching files:', error);
			});
	}, [currentUser]);

	console.log(files[0]);
	return (
		<div>
			<ul>
				{files.map((file) => (
					<li key={file.name}>{file.name}</li>
				))}
			</ul>
		</div>
	);
}
