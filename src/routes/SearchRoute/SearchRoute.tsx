import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingTile from "../../components/LoadingTile";
import NotFoundTile from "../../components/NotFoundTile";
import TopCard from "../../components/cards/TopCard";
import SearchField from "../../components/SearchField";
import useMegaStore from "../../store/MegaStore";
import { setSearchQuery, setSearchType } from "../../store/utils/searchUtils";
import { useSearch } from "../../TMDB/hooks/useApi";

export default function SearchRoute() {
  // set search values on load
  const { query, type } = useParams();
  useEffect(() => {
    setSearchQuery(query);
    setSearchType(type);
  }, []);

  const searchQuery = useMegaStore((state) => state.searchQuery);
  const searchType = useMegaStore((state) => state.searchType);

  // update url and page title
  useEffect(() => {
    window.history.replaceState(
      null,
      `Search: ${searchType} ${searchQuery}`,
      `/search/${searchQuery}`
    );
  }, [searchQuery, searchType]);

  return (
    <Box>
      <Box>
        <SearchField />
      </Box>

      <SearchResultList />
    </Box>
  );
}

function SearchResultList() {
  const searchQuery = useMegaStore((state) => state.searchQuery);
  const searchType = useMegaStore((state) => state.searchType);
  const [shows, isLoading, error] = useSearch(searchQuery, {
    type: searchType,
  });
  if (isLoading) return <LoadingTile />;
  if (!shows || !shows.length || !searchQuery) return <NotFoundTile />;
  if (error) return <NotFoundTile />;
  return (
    <Box>
      <Grid container spacing={3}>
        {shows.map((show) => (
          <Grid item key={show.id}>
            <TopCard item={show} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
