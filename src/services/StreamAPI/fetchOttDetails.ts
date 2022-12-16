import { ShowbizItem } from "@types";

export default async function fetchOttDetails(show: ShowbizItem) {
  if (!show.imdbId) return {} as StreamItem;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
    },
  };

  return await fetch(
    `https://ott-details.p.rapidapi.com/gettitleDetails?imdbid=${show.imdbId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response.streamingAvailability || ({} as StreamItem);
    })
    .catch((err) => {
      console.error(err);
      return {} as StreamItem;
    });
}
