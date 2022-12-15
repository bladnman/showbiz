import React from "react";
import { ShowbizItem, ShowPropOpt, SxPropOpt } from "@types";
import Tag from "@components/text/Tag";
import { getYearSpanDisplay } from "@services/TMDB/utils/yearUtils";
import { Link, Stack, Typography } from "@mui/material";
import NetworkIcon from "@components/icons/NetworkIcon";
import { replaceFor } from "@utils/MU";

type LinkDef = {
  title: string;
  url: string;
};
export default function DetailsLinkToSites({ show }: ShowPropOpt) {
  if (!show) return null;

  const links: LinkDef[] = [];

  show.homepage && links.push({ title: "Show Page", url: show.homepage });
  links.push({ title: "Google", url: cleanGoogle(show) });
  links.push({ title: "IMDB", url: cleanImdb(show) });
  links.push({ title: "Rotten Tomatoes", url: cleanRt(show) });
  return (
    <Stack direction={"row"} component={"div"} spacing={2}>
      {links.map((link) => (
        <Link key={link.title} target="externalSite" href={link.url}>
          {link.title}
        </Link>
      ))}
    </Stack>
  );
}

function cleanRt(show: ShowbizItem) {
  let cleaned = replaceFor(show.name.toLowerCase(), " ", "_");
  cleaned = cleaned.replace(/[^a-zA-Z0-9_]+/g, "");
  return `https://www.rottentomatoes.com/${
    show.isMovie ? "m" : "tv"
  }/${cleaned}`;
}

function cleanGoogle(show: ShowbizItem) {
  const cleaned = replaceFor(show.name.toLowerCase(), " ", "+");
  return `https://www.google.com/search?q=${cleaned}+${
    show.isMovie ? "movie" : "tv"
  }`;
}

function cleanImdb(show: ShowbizItem) {
  if (show.imdbId) {
    return `https://www.imdb.com/title/${show.imdbId}`;
  }
  const cleaned = replaceFor(show.name.toLowerCase(), " ", "+");
  return `https://www.imdb.com/find?q=${cleaned}`;
}
