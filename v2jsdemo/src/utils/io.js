export async function readAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (e) => reject(e);
        fileReader.readAsArrayBuffer(file);
    });
}