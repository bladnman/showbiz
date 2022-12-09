import { useMemo } from "react";
import {
  addCollection,
  removeCollection,
  toggleCollection,
} from "../store/utils/itemUtils";
import useShowTools from "./useShowTools";
import useCollections from "./useCollections";

export default function useCollectionTools() {
  const { shows } = useShowTools();
  const collections = useCollections(shows);

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
