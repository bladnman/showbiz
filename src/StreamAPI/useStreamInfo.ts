import { useEffect, useState } from "react";
import { ShowbizItem } from "../TMDB/utils/convertToItem";

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
      const fetchedInfo = await fetchStringInfo(show);
      console.log(`🐽 [useStreamInfo] fetchedInfo`, fetchedInfo);
      setInfo(fetchedInfo);
    };
    doFetch();
  }, [show, enabled]);

  return info;
}
async function fetchStringInfo(show: ShowbizItem): Promise<StreamInfo> {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_STREAMING_KEY,
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
