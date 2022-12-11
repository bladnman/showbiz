import React from "react";
import { Rating } from "@mui/material";

const ItemRating = (props: { rating?: number | null }) => {
  const { rating, ...otherProps } = props;
  if (!rating) return null;

  return (
    <Rating
      name="read-only"
      value={rating}
      readOnly
      precision={0.25}
      size="small"
      {...otherProps}
    />
  );
};
export default ItemRating;
