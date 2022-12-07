import { useEffect, useState } from "react";
import { ShowbizItem } from "../../@types";

export default function useStreamInfo(
  enabled: boolean,
  show?: ShowbizItem | null
): StreamInfo | undefined {
  const [info, setInfo] = useState<StreamInfo>();

  useEffect(() => {
    if (!enabled || !show || info) {
      setInfo(undefined);
      return;
    }

    // time to do the pull
    const doFetch = async () => {
      const fetchedInfo = await fetchStreamInfo(show);
      console.log(`🐽 [useStreamInfo] fetchedInfo`, fetchedInfo);
      const fetchedOTTInfo = await fetchOTTStreamInfo(show);
      console.log(`🐽 [useStreamInfo] fetchedOTTInfo`, fetchedOTTInfo);
      setInfo(fetchedInfo);
    };
    doFetch();
  }, [show, enabled]);

  return info;
}

async function fetchStreamInfo(show: ShowbizItem): Promise<StreamInfo> {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  const tmdb_key = show.isMovie ? `movie/${show.id}` : `tv/${show.id}`;
  const info = await fetch(
    `https://streaming-availability.p.rapidapi.com/get/basic?country=us&tmdb_id=${tmdb_key}&output_language=en`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response.streamingInfo || ({} as StreamInfo);
    })
    .catch((err) => {
      console.error(err);
      return {} as StreamInfo;
    });

  return info;
}

async function fetchOTTStreamInfo(show: ShowbizItem): Promise<StreamInfo> {
  if (!show.imdbId) return {} as StreamInfo;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
    },
  };

  const info = await fetch(
    `https://ott-details.p.rapidapi.com/gettitleDetails?imdbid=${show.imdbId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response.streamingAvailability || ({} as StreamInfo);
    })
    .catch((err) => {
      console.error(err);
      return {} as StreamInfo;
    });

  return info;
}
