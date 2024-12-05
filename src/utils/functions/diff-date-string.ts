const [dd, dh, dm, ds] = [24 * 3600 * 1000, 3600 * 1000, 60 * 1000, 1000];
const zeroPadFormat = (n: number, l = 2): string =>
  n.toString().padStart(l, "0");

export const diffDateString = (diffTime: number): string => {
  const diffDay = Math.floor(diffTime / dd);
  diffTime = diffTime - diffDay * dd;
  const diffHour = Math.floor(diffTime / dh);
  diffTime = diffTime - diffHour * dh;
  const diffMin = Math.floor(diffTime / dm);
  diffTime = diffTime - diffMin * dm;
  const diffSec = Math.floor(diffTime / ds);
  diffTime = diffTime - diffSec * ds;
  return `${zeroPadFormat(diffDay)}D ${zeroPadFormat(
    diffHour,
  )}H ${zeroPadFormat(diffMin)}M ${zeroPadFormat(diffSec)}S ${zeroPadFormat(
    diffTime,
    3,
  )}ms`;
};
