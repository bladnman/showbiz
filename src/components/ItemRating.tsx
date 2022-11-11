import { Rating } from "@mui/material";

const ItemRating = ({ rating }: { rating?: number | null }) => {
  if (!rating) return null;

  return (
    <Rating
      name="read-only"
      value={rating}
      readOnly
      precision={0.25}
      size="small"
    />
  );
};
export default ItemRating;
