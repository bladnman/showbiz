import useMegaStore from "../store/MegaStore";

export default function useShows() {
  const shows = useMegaStore((state) => state.shows);
  return shows;
}
