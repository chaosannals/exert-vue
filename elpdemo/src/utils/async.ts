export const delay = async (durationMs: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, durationMs);
    });
};

export const countdown = async (
    onTick: (remainMs: number) => any,
    durationMs: number,
    intervalMs: number=1000,
) => {
    for (let tick = durationMs; tick >= 0; tick -= intervalMs) {
        await delay(intervalMs);
        await onTick(tick);
        console.log(tick)
    }
}