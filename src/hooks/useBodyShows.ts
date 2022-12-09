import useMegaStore from "../store/MegaStore";

export default function useBodyShows() {
  const shows = useMegaStore((state) => state.bodyShows);
  return shows;
}
