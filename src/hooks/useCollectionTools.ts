import { useMemo } from "react";
import useActiveCustomDataList from "./useActiveCustomDataList";
import getAllCollections from "@collection-utils/getAllCollections";
import getAllCollectionsForShows from "@collection-utils/getAllCollectionsForShows";
import getCollectionsForShow from "@collection-utils/getCollectionsForShow";
import addCollectionToShow from "@collection-utils/addCollectionToShow";
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
      addCollection: addCollectionToShow,
      removeCollection,
      toggleCollection,
      getAllCollectionsForShows,
      getCollectionsForShow,
    }),
    [collections]
  );
}
