export default function extractKey(key: string, fromObject: any): any {
  if (!(key in fromObject)) return null;
  const value = fromObject[key];
  delete fromObject[key];
  return value;
}
