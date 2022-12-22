export default function styleLineClamp(maxLines?: number | null) {
  if (!maxLines) return {};
  return {
    display: "-webkit-box",
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
}
