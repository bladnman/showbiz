import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopCard from "../../components/cards/TopCard";
import LoadingTile from "../../components/LoadingTile";
import NotFoundTile from "../../components/NotFoundTile";
import SearchField from "../../components/SearchField";
import useMegaStore from "../../store/MegaStore";
import { setDetailItem } from "../../store/utils/itemUtils";
import { setSearchQuery, setSearchType } from "../../store/utils/searchUtils";
import { useSearch } from "../../TMDB/hooks/useApi";
import { Movie, Person, Tv } from "../../TMDB/types";

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
  const navigate = useNavigate();

  const onClick = (item: Movie | Tv | Person) => {
    setDetailItem(item);
  };

  if (isLoading) return <LoadingTile />;
  if (!shows || !shows.length || !searchQuery) return <NotFoundTile />;
  if (error) return <NotFoundTile />;
  return (
    <Box>
      <Grid container spacing={2}>
        {shows.map((show) => (
          <Grid item xs={4} sm={3} md={3} key={show.id}>
            <TopCard item={show} onClick={onClick} height={"20vh"} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
