type StreamItem = {
  [key: "us" | string]: {
    added: number;
    leaving: number;
    link: string;
  };
};
type StreamInfo = {
  apple?: StreamInfo;
  britbox?: StreamInfo;
  curiosity?: StreamInfo;
  disney?: StreamInfo;
  hbo?: StreamInfo;
  hulu?: StreamInfo;
  netflix?: StreamInfo;
  paramount?: StreamInfo;
  peacock?: StreamInfo;
  prime?: StreamInfo;
  showtime?: StreamInfo;
  starz?: StreamInfo;
};
