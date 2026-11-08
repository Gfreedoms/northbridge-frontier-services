// next/image's `unoptimized: true` mode does not reliably prepend
// `basePath` to the rendered <img src> under static export (verified:
// JS/CSS chunks get the basePath via assetPrefix, but image src does not).
// So every image path in this app is built from this constant instead of
// relying on next/image to do it automatically.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path) {
  return `${basePath}${path}`;
}
