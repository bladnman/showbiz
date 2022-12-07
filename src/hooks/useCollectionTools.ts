import { useEffect, useMemo, useState } from "react";
import { ShowbizItem } from "../@types";
import useFullShow from "./useFullShow";
import useCollections from "./useCollections";
import useShows from "./useShows";
import { addCollection } from "../store/utils/itemUtils";

export default function useCollectionTools(withShow?: ShowbizItem | null) {
  const shows = useShows();
  const show = useFullShow(withShow);
  const collections = useCollections();

  const [showCollections, setShowCollections] = useState<string[]>();

  useEffect(() => {
    console.log(
      `[🐽](useCollectionTools) 💾 SETTING show?.collections`,
      show?.collections
    );
    setShowCollections(show?.collections ?? []);
  }, [show]);

  return useMemo(
    () => ({
      collections,
      showCollections,
      addCollection,
    }),
    [collections, showCollections, addCollection]
  );
}
