export function mergeObjects<T extends object, U extends object>(
  defaultObject: T,
  currentObject: U
): T & U {
  const result = { ...defaultObject } as T & U;

  Object.keys(currentObject).forEach((key) => {
    const value = (currentObject as any)[key];
    if (value !== undefined && value !== null) {
      (result as any)[key] = value;
    }
  });
  return result;
}
