import { User } from 'firebase/auth';
import { storage } from './firebase';
import {
	StorageError,
	UploadTaskSnapshot,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';

export type UploadDocumentResponse = {
	uploadTaskSnapshot: UploadTaskSnapshot | null;
	downloadUrl: string | null;
};

export const uploadDocument = async (
	currentUser: User,
	file: File,
): Promise<UploadTaskSnapshot | any> => {
	const storageRef = ref(storage, `/files/${currentUser.email}/${file.name}`);
	const uploadTask = uploadBytesResumable(storageRef, file);
	const result: UploadDocumentResponse = {
		uploadTaskSnapshot: null,
		downloadUrl: null,
	};
	uploadTask.on(
		'state_changed',
		(uploadTaskSnapshot: UploadTaskSnapshot) => {
			result.uploadTaskSnapshot = uploadTaskSnapshot;
		},
		(err: StorageError) => {
			Promise.reject(err);
		},
		() => {
			// Download url
			getDownloadURL(uploadTask.snapshot.ref)
				.then((url: string) => {
					result.downloadUrl = url;
					Promise.resolve(result);
				})
				.catch((err) => {
					Promise.reject(err);
				});
		},
	);
};
