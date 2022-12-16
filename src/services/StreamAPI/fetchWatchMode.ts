import { ShowbizItem } from "@types";
import { getRapidApiKey, getStreamService } from "./utils/streamUtils";

export default async function fetchWatchMode(
  show: ShowbizItem
): Promise<StreamItem[]> {
  const key = show.isMovie ? `movie-${show.id}` : `tv-${show.id}`;

  const options = {
    method: "GET",
    headers: {
      regions: "US",
      "X-RapidAPI-Key": getRapidApiKey(),
      "X-RapidAPI-Host": "watchmode.p.rapidapi.com",
    },
  };

  return await fetch(
    `https://watchmode.p.rapidapi.com/title/${key}/sources/`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.message) {
        console.warn(response);
      }
      return mapResponse(response);
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
}

type ServerItem = {
  source_id: string;
  name: string;
  type:
    | "tv_everywhere"
    | "subscription"
    | "purchase"
    | "free"
    | "rent"
    | "buy"
    | "sub"
    | "free";
  web_url: string;
};

function mapResponse(response: ServerItem[]): StreamItem[] {
  if (!response?.length) return [];

  // get one item per source_id
  let lastSource = "";
  const singleSourceItems = response.filter((item) => {
    if (item.source_id !== lastSource) {
      lastSource = item.source_id;
      return true;
    }
    return false;
  });

  return singleSourceItems
    .map(mapResponseItem)
    .filter((item) => !!item) as StreamItem[];
}

function mapResponseItem(serverItem: ServerItem): StreamItem | null {
  const serviceDef = getStreamService(serverItem.name);
  if (!serviceDef) return null;

  return {
    name: serviceDef.name,
    link: serverItem.web_url,
    type: serverItem.type,
    logo: serviceDef.logo,
  };
}

/**
 * {source_id: 24, name: 'Amazon', type: 'rent', region: 'US', …}
 * {source_id: 24, name: 'Amazon', type: 'rent', region: 'US', …}
 * {source_id: 307, name: 'VUDU', type: 'rent', region: 'US', …}
 * {source_id: 307, name: 'VUDU', type: 'rent', region: 'US', …}
 */
