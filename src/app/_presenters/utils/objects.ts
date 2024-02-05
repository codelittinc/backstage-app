export function mergeObjects<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  const result = { ...obj1 } as T & U;

  Object.keys(obj2).forEach((key) => {
    const value = (obj2 as any)[key];
    if (value !== undefined && value !== null) {
      (result as any)[key] = value;
    }
  });
  return result;
}
