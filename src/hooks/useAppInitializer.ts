import { useEffect, useRef, useState } from "react";
import { fetchSavedShows } from "../services/firestore/utils/fire_utils";
import { setBodyShows, setShows } from "../store/utils/itemUtils";

const UseAppInitializer = () => {
  const startedRef = useRef(false); // de-bouncer to make sure fetching saved shows only starts once
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // load all save shows
    async function fetch() {
      const savedShows = await fetchSavedShows();
      setShows(savedShows);
      setBodyShows(savedShows);
      setInitialized(true);
    }

    fetch().catch((er) => console.error("Error when loading saved shows", er));
  }, []);

  return isInitialized;
};

export default UseAppInitializer;
