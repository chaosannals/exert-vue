export const delay = async (durationMs: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, durationMs);
    });
};