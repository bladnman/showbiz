import { Box, CardMedia } from "@mui/material";
import { Movie, Tv } from "../TMDB/types";
import TopCard from "./cards/TopCard";
import SeasonList from "./samples/SeasonList";

type Props = {
  item: Movie | Tv;
};
export default function Details({ item }: Props) {
  if (!item.id) return null;
  if (!item.objectType) return null;

  return (
    <Box>
      {/* <CardMedia component="img" src={item.posterPath} /> */}
      <TopCard item={item} height={"40vh"} expanded={true} maxDescLines={6} />

      <SeasonList show={item} />
    </Box>
  );
}
