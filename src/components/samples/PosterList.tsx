import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { ShowType } from "../../TMDB/types";
import { useShowPosters } from "../../TMDB/hooks/useApi";
import LoadingTile from "../LoadingTile";
import NotFoundTile from "../NotFoundTile";
import SampleHeader from "./SampleHeader";

export default function PosterList({
  id,
  type,
}: {
  id: string | number;
  type: ShowType;
}) {
  const [posters, isLoading, error] = useShowPosters(id, type, {
    includeImageLanguage: ["null", "en"],
    page: 1,
  });

  if (isLoading) return <LoadingTile />;
  if (!posters) return <NotFoundTile />;
  if (error) return <NotFoundTile />;

  return (
    <Box>
      <SampleHeader title={"Posters"} total={posters.length} />

      <ImageList cols={4} gap={12} variant="standard">
        {posters.map((item) => (
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
