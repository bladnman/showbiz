import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { ShowType } from "../../TMDB/types";
import { useShowLogos } from "../../TMDB/hooks/useApi";
import LoadingTile from "../LoadingTile";
import NotFoundTile from "../NotFoundTile";
import SampleHeader from "./SampleHeader";

export default function LogoList({
  id,
  type,
}: {
  id: string | number;
  type: ShowType;
}) {
  const [logos, isLoading, error] = useShowLogos(id, type, {
    includeImageLanguage: ["null", "en"],
  });

  if (isLoading) return <LoadingTile />;
  if (!logos) return <NotFoundTile />;
  if (error) return <NotFoundTile />;

  return (
    <Box>
      <SampleHeader title={"Logos"} total={logos.length} />

      <ImageList cols={3} gap={12} variant="standard">
        {logos.map((item) => (
          <ImageListItem key={item.filePath}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.filePath}`}
              loading="lazy"
            />
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
