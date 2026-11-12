export type RawSearchParams = Record<string, string | string[] | undefined>;

export const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export const many = (value: string | string[] | undefined) =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];
