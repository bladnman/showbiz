import { Box, Typography, Card } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Movie } from "../../TMDB/TMDB";
import useMegaStore from "../../store/MegaStore";

export default function PopularRoute() {
  const tmdb = useMegaStore((state) => state.tmdb);
  console.log(`🐽 tmdb`, tmdb);

  // const movies = useMemo(async () => {
  //   if (!tmdb) return [];

  //   const results = await tmdb.getMovie(67221);
  //   const movie = results;
  //   // const results = await tmdb.get<any>("search/movie", {
  //   //   query: "The Terminator",
  //   // });
  //   console.log(`🐽 results`, results);

  //   return results;
  // }, [tmdb]);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    if (!tmdb) return;
    const doFetch = async () => {
      const movie = await tmdb.getMovie(67221);
      setMovie(movie);
    };
    doFetch();
  }, [tmdb]);

  console.log(`🐽 movie`, movie);

  if (!movie) return null;
  return (
    <Box>
      <Box>
        <Typography variant="h3">Popular Movies</Typography>
      </Box>
      {/* {movies.map((movie) => ( */}
      <Box mb={1}>
        <Card key={movie.id}>
          <Typography>{movie.title}</Typography>
        </Card>
      </Box>
      {/* ))} */}
    </Box>
  );
}
