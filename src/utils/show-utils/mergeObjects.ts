export default function mergeObjects(
  object1: Record<string, unknown>,
  object2: Record<string, unknown>
) {
  return { ...object1, ...object2 };
}
