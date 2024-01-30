export function blobToURL(blob: Blob): Promise<string | null> {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = () => {
			const base64data = reader.result as string;
			resolve(base64data);
		};
	});
}
