export async function readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);
        fileReader.onerror = (e) => reject(e);
        fileReader.readAsArrayBuffer(file);
    });
}