// Read More: https://rossbulat.medium.com/typescript-typing-dynamic-objects-and-subsets-with-generics-44ba3988a91a

/**
 * Get only some keys and return the correct key
 */
export type FilterRecord<T, U extends keyof T> = { [K in U]: T[K] };

export function filterRecord<T, U extends keyof T>(obj: T, keys: U[]): FilterRecord<T, U> {
  const result: any = {};
  keys.forEach(key => {
    if (typeof obj[key] !== 'undefined') {
      result[key] = obj[key];
    }
  });
  return result;
}
