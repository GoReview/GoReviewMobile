export async function awaitResOrErr<T>(
	promise: Promise<T>,
	message?: string
): Promise<[data: T | null, error: any | null]> {
	try {
		const data = await promise;
		return [data, null];
	} catch (error) {
		console.error(message, error);
		return [null, error];
	}
}

// usage:
// const [data, error] = await awaitResOrErr(myPromise);
