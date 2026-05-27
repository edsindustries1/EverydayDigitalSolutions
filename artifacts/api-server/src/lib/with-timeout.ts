/**
 * Race a promise against a timeout. Rejects with `timeout: <label>` if the
 * promise hasn't settled within `ms` milliseconds. Use to bound DB queries
 * so a broken database can never hang the request loop.
 */
export function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`timeout: ${label}`)), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (err) => {
        clearTimeout(t);
        reject(err);
      },
    );
  });
}
