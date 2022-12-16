import { ShowbizItem } from "@types";

export default async function fetchStreamAvailability(show: ShowbizItem) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  const tmdb_key = show.isMovie ? `movie/${show.id}` : `tv/${show.id}`;
  return await fetch(
    `https://streaming-availability.p.rapidapi.com/get/basic?country=us&tmdb_id=${tmdb_key}&output_language=en`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response.streamingInfo || ({} as StreamItem);
    })
    .catch((err) => {
      console.error(err);
      return {} as StreamItem;
    });
}
