import {
	listAll,
	ref,
	StorageReference,
	getDownloadURL,
} from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../security/AuthProvider';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Button,
} from '@chakra-ui/react';
import { storage } from '../../firebase/firebase';

export function History() {
	const { currentUser } = useContext(AuthContext);
	const [files, setFiles] = useState<StorageReference[]>([]);
	const [error, setError] = useState<string | null>(null);

	const openInNewTab = (url) => {
		window.open(url, '_blank', 'noreferrer');
	};

	const download = (path: string) => {
		getDownloadURL(ref(storage, path))
			.then((url) => {
				openInNewTab(url);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		const bucketRef = ref(storage, `/files/${currentUser.email}/`);
		listAll(bucketRef)
			.then((res) => {
				const fileItems = res.items;
				setFiles(fileItems);
			})
			.catch((error) => {
				console.error('Error fetching files:', error);
				setError('Error fetching files: ' + error.message);
			});
	}, [currentUser]);

	return (
		<TableContainer>
			{error && <div>Une erreur est survenue lors de la récupération des fichiers: {error}</div>}
			<Table variant="simple">
				<TableCaption>History</TableCaption>
				<Thead>
					<Tr>
						<Th>File</Th>
					</Tr>
				</Thead>
				<Tbody>
					{files.map((file) => (
						<Tr key={file.name}>
							<Td>{file.name} </Td>
							<Td>
								<Button onClick={() => download(file.fullPath)}>
									Download
								</Button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
