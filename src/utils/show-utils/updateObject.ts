export default function updateObject(
  targetObject: Record<string, unknown>,
  fromObject: Record<string, unknown>
) {
  if (!targetObject || !fromObject) return targetObject;

  for (const [key, value] of Object.entries(fromObject)) {
    targetObject[key] = value;
  }
  return targetObject;
}
