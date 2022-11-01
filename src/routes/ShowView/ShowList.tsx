import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useShows from "./hooks/useShows";

export default function ShowList() {
  const { items: shows } = useShows();
  return (
    <Box>
      <Box>
        <Typography variant="h3">
          Show list ({import.meta.env.VITE_TMDB_KEY})
        </Typography>
      </Box>
      {shows.map((show) => (
        <Box mb={1}>
          <Card key={show.id}>
            <Typography>{show.data().title}</Typography>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
