export default async function to(promise: Promise<any>): Promise<any[]> {
    try {
        const data = await promise;
        return [null, data];
    }
    catch (err) {
        return [err];
    }
 }