export const delay = <T>(data: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), 250));

export const stringContains = (text: string, search: string) =>
  text.toLowerCase().indexOf(search) >= 0;

export const filterList = <T, U>(
  search: U,
  data: ReadonlyArray<T>,
  config: {
    filter: (data: T, search: U) => boolean;
  },
): ReadonlyArray<T> => {
  return data.filter((metadata) => {
    return config.filter(metadata, search);
  });
};
