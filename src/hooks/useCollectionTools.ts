import { useMemo } from "react";
import useActiveCustomDataList from "./useActiveCustomDataList";
import getAllCollections from "@collection-utils/getAllCollections";
import getAllCollectionsForShows from "@collection-utils/getAllCollectionsForShows";
import getCollectionsForShow from "@collection-utils/getCollectionsForShow";
import addCollection from "@collection-utils/addCollection";
import removeCollection from "@collection-utils/removeCollection";
import toggleCollection from "@collection-utils/toggleCollection";

export default function useCollectionTools() {
  const activeCustomDataList = useActiveCustomDataList();

  const collections = useMemo(() => {
    return getAllCollections(activeCustomDataList);
  }, [activeCustomDataList]);

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
