import React from "react";
import { Box } from "@mui/material";
import { ShowbizItem, ShowPropOpt, SxPropOpt } from "@types";
import DetailsImageText from "../DetailsImageText";
import { IMAGE_TEXT_SHADOW } from "@CONST";
import useShowCollections from "@hooks/useShowCollections";
import useShowTools from "@hooks/useShowTools";

export default function DetailsCollectionList({
  show,
  sx,
}: { show: ShowbizItem } & SxPropOpt) {
  const showCollections = useShowCollections(show);
  const { isShowSaved } = useShowTools();
  const isSaved = isShowSaved(show);
  if (!isSaved || showCollections.length < 1) return null;

  return (
    <Box sx={{ ...sx }}>
      {showCollections.map((collection: string) => (
        <CollectionItem text={collection} key={collection} />
      ))}
    </Box>
  );
}

function CollectionItem({ text }: { text: string }) {
  return (
    <DetailsImageText
      sx={{
        paddingRight: 2,
        textShadow: IMAGE_TEXT_SHADOW,
      }}
      text={text}
    />
  );
}
