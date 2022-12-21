import { ShowbizItem } from "@types";

export default async function fetchStreamlineWatch(show: ShowbizItem) {
  const key = show.isMovie ? `movies/${show.id}` : `shows/${show.id}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "streamlinewatch-streaming-guide.p.rapidapi.com",
    },
  };

  const info = await fetch(
    `https://streamlinewatch-streaming-guide.p.rapidapi.com/${key}?platform=web&region=US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const first = response && response[0];
      return patchStreamlineWatchSourceList(
        first?.sources as StreamlineServerItem[]
      ) as StreamItem[];
    })
    .catch((err) => {
      console.error("Error fetching StreamlineWatch data. Rate limit", err);
      return [];
    });

  return info;
}

type StreamlineServerItem = { source: string; link: string; type: string };

function patchStreamlineWatchSourceList(sources?: StreamlineServerItem[]) {
  if (!sources || sources.length < 1) return [];

  const ourSources: StreamItem[] = [];
  sources.forEach((item) => {
    const serviceDef = StreamLineWatchServices[item.source];
    if (serviceDef?.active) {
      ourSources.push({
        name: serviceDef.name,
        link: item.link,
        type: item.type,
      } as StreamItem);
    }
  });

  return ourSources;
}

const StreamLineWatchServices: Record<
  string,
  { name: string; alias: string[]; active: boolean }
> = {
  // active
  abc_tveverywhere: { alias: ["abc_tveverywhere"], name: "ABC", active: true },
  amazon_prime: { alias: ["amazon_prime"], name: "Amazon Prime", active: true },
  apple_tv: { alias: ["apple_tv"], name: "Apple TV", active: true },
  apple_tv_plus: { alias: ["apple_tv_plus"], name: "Apple TV+", active: true },
  comedy_central_tveverywhere: {
    alias: ["comedy_central_tveverywhere"],
    name: "Comedy Central",
    active: true,
  },
  disney_plus: { alias: ["disney_plus"], name: "Disney+", active: true },
  fox_tveverywhere: { alias: ["fox_tveverywhere"], name: "Fox", active: true },
  hbo_max: { alias: ["hbo_max"], name: "HBO Max", active: true },
  hulu: { alias: ["hulu"], name: "Hulu", active: true },
  netflix: { alias: ["netflix"], name: "Netflix", active: true },
  paramount_plus: {
    alias: ["paramount_plus"],
    name: "Paramount+",
    active: true,
  },
  peacock: { alias: ["peacock"], name: "Peacock Premium", active: true },
  showtime: { alias: ["showtime"], name: "Showtime", active: true },
  // inactive
  abc_free: { alias: ["abc_free"], name: "ABC", active: false },
  adult_swim_free: {
    alias: ["adult_swim_free"],
    name: "Adult Swim",
    active: false,
  },
  adult_swim_tveverywhere: {
    alias: ["adult_swim_tveverywhere"],
    name: "Adult Swim",
    active: false,
  },
  amazon: { alias: ["amazon"], name: "Amazon", active: false },
  cbs_free: { alias: ["cbs_free"], name: "CBS", active: false },
  comedy_central_free: {
    alias: ["comedy_central_free"],
    name: "Comedy Central",
    active: false,
  },
  crackle_free: { alias: ["crackle_free"], name: "Crackle", active: false },
  fox_free: { alias: ["fox_free"], name: "Fox", active: false },
  funimation: { alias: ["funimation"], name: "Funimation", active: false },
  peacock_free: { alias: ["peacock_free"], name: "Peacock", active: false },
  showtime_anytime_tveverywhere: {
    alias: ["showtime_anytime_tveverywhere"],
    name: "Showtime Anytime",
    active: false,
  },
  shudder: { alias: ["shudder"], name: "Shudder", active: false },
  starz: { alias: ["starz"], name: "Starz", active: false },
  tubi_tv_free: { alias: ["tubi_tv_free"], name: "Tubi TV", active: false },
  vrv: { alias: ["vrv"], name: "VRV", active: false },
  vrv_free: { alias: ["vrv_free"], name: "VRV", active: false },
  vudu: { alias: ["vudu"], name: "Vudu", active: false },
  vudu_free: { alias: ["vudu_free"], name: "Vudu", active: false },
  youtube_free: { alias: ["youtube_free"], name: "Youtube", active: false },
};
