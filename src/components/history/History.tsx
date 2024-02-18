import { listAll, ref, StorageReference } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../security/AuthProvider';
import { storage } from '../../firebase/firebase';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from '@chakra-ui/react';

export function History() {
	const { currentUser } = useContext(AuthContext);
	const [files, setFiles] = useState<StorageReference[]>([]);
	const [error, setError] = useState<string | null>(null);

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

	console.log(files[0]);
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
							<Td key={file.name}>{file.name} </Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
