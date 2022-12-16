import React from "react";
import { ShowbizItem, ShowPropOpt } from "@types";
import { Box } from "@mui/material";
import { replaceFor } from "@utils/MU";
import {
  GoogleIcon,
  HomeIcon,
  ImdbIcon,
  RottenTomatoesIcon,
} from "@/images/AppIcons";
import IconPod from "@components/IconPod";

type LinkDef = {
  title: string;
  url: string;
};
export default function DetailsLinkToSites({ show }: ShowPropOpt) {
  if (!show) return null;

  const size = 25;
  return (
    <Box>
      <IconPod>
        {show.homepage && (
          <HomeIcon
            width={size}
            height={size}
            link={show.homepage}
            target={"externalSite"}
          />
        )}
        <GoogleIcon
          width={size}
          height={size}
          link={cleanGoogle(show)}
          target={"externalSite"}
        />
        <ImdbIcon
          width={size}
          height={size}
          link={cleanImdb(show)}
          target={"externalSite"}
        />
        <RottenTomatoesIcon
          width={size}
          height={size}
          link={cleanRt(show)}
          target={"externalSite"}
        />
      </IconPod>
    </Box>
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
