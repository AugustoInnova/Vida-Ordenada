export const cldVariant = (url: string, w: number) =>
  url.replace(/w_\d+|w_auto/, `w_${w}`);

export const cldSrcSet = (url: string, widths: number[] = [400, 600, 800]) =>
  widths.map((w) => `${cldVariant(url, w)} ${w}w`).join(", ");
