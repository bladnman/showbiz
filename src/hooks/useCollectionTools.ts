import { useMemo } from "react";
import {
  addCollection,
  getAllCollections,
  removeCollection,
  toggleCollection,
} from "../store/utils/itemUtils";
import useShowTools from "./useShowTools";

export default function useCollectionTools() {
  const { shows } = useShowTools();

  const collections = useMemo(() => {
    return getAllCollections(shows);
  }, [shows]);

  return useMemo(
    () => ({
      collections,
      addCollection,
      removeCollection,
      toggleCollection,
    }),
    [collections]
  );
}
