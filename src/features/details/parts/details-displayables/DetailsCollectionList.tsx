import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { ShowPropOpt, SxPropOpt } from "@types";
import DetailsImageText from "../DetailsImageText";
import { IMAGE_TEXT_SHADOW } from "@CONST";
import useCollectionTools from "@hooks/useCollectionTools";
import { getCollectionsForShow } from "@utils/collectionUtils";
import useShowCollections from "@hooks/useShowCollections";

export default function DetailsCollectionList({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  const showCollections = useShowCollections(show);
  if (showCollections.length < 1) return null;

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
