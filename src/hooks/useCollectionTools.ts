import { useMemo } from "react";
import {
  addCollection,
  getAllCollections,
  getAllCollectionsForShows,
  getCollectionsForShow,
  removeCollection,
  toggleCollection,
} from "@utils/collectionUtils";
import useActiveCustomDataList from "./useActiveCustomDataList";

export default function useCollectionTools() {
  const customDataList = useActiveCustomDataList();
  const collections = useMemo(() => {
    return getAllCollections(customDataList);
  }, [customDataList]);
  return useMemo(
    () => ({
      collections,
      addCollection,
      removeCollection,
      toggleCollection,
      getAllCollectionsForShows,
      getCollectionsForShow,
    }),
    [collections]
  );
}
