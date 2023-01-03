import { useEffect, useRef, useState } from "react";
import {
  fire_fetchBoards,
  fire_fetchCustomDataList,
  fire_fetchSavedShows,
} from "@services/firestore/utils/fire_utils";
import setCustomDataList from "@custom-data-utils/setCustomDataList";
import setShows from "@show-utils/setShows";
import setBodyShows from "@show-utils/setBodyShows";
import setBoards from "@utils/board-utils/setBoards";

const UseAppInitializer = () => {
  const startedRef = useRef(false); // de-bouncer to make sure fetching saved shows only starts once
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // load all save shows
    async function fetch() {
      const savedShows = await fire_fetchSavedShows();
      const customDataList = await fire_fetchCustomDataList();
      const boards = await fire_fetchBoards();
      console.log(`[🐽](useAppInitializer) boards`, boards);

      setShows(savedShows);
      setBodyShows(savedShows);

      setCustomDataList(customDataList);

      setBoards(boards);

      setInitialized(true);
    }

    fetch().catch((er) => console.error("Error when loading saved shows", er));
  }, []);

  return isInitialized;
};

export default UseAppInitializer;
