import { Box } from "@mui/material";
import { useCallback } from "react";
import { useShowImages } from "../TMDB/hooks/useApi";
import { Movie, ShowImageCollection, ShowType, Tv } from "../TMDB/types";
import TopCard from "./cards/TopCard";
import BackdropList from "./samples/BackdropList";
import LogoList from "./samples/LogoList";
import PosterList from "./samples/PosterList";
import SeasonList from "./samples/SeasonList";

type Props = {
  show: Movie | Tv;
};
export default function ShowTester({ show }: Props) {
  if (!show.id) return null;
  if (!show.objectType) return null;

  const [imageCollection, isLoading, error] = useShowImages(
    show.id,
    show.objectType as ShowType,
    {
      includeImageLanguage: ["null", "en"],
    }
  );
  const renderImageLists = useCallback(() => {
    if (!imageCollection) return null;
    return (
      <>
        {imageCollection.backdrops && (
          <BackdropList images={imageCollection.backdrops} />
        )}

        {imageCollection.posters && (
          <PosterList images={imageCollection.posters} />
        )}
        {imageCollection.logos && <LogoList images={imageCollection.logos} />}
      </>
    );
  }, [imageCollection]);

  return (
    <Box>
      <TopCard item={show} height={"40vh"} expanded={true} maxDescLines={6} />

      <SeasonList show={show} />
      {renderImageLists()}
    </Box>
  );
}
