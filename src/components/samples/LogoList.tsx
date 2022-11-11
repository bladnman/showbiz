import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useBaseImageUrl } from "../../TMDB/hooks/useApi";
import { ShowImage } from "../../TMDB/types";
import SampleHeader from "./SampleHeader";

export default function LogoList({ images }: { images?: ShowImage[] | null }) {
  const baseImgUrl = useBaseImageUrl();

  if (!images) return null;
  if (images.length < 1) return null;

  return (
    <Box>
      <SampleHeader title={"Logos"} total={images.length} />

      <ImageList cols={3} gap={12} variant="standard">
        {images.map((item) => (
          <ImageListItem key={item.filePath}>
            <img src={`${baseImgUrl}${item.filePath}`} loading="lazy" />
            <ImageListItemBar
              title={item.voteAverage}
              subtitle={`Votes: ${item.voteCount}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
