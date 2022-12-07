import useMegaStore from "../store/MegaStore";
import useFullShow from "./useFullShow";

export default function useSearchSelectedShow() {
  const searchSelectedItem = useMegaStore((state) => state.searchSelectedItem);
  const fullShow = useFullShow(searchSelectedItem);

  return fullShow;
}
