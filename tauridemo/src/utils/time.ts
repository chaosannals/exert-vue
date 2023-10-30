export function setTimeoutAsync(durationMs: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(null);
            } catch (error) {
                reject(error);
            }
        }, durationMs);
    });
}