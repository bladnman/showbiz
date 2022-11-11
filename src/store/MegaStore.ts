import create from "zustand";
import { devtools } from "zustand/middleware";
import TMDB from "../TMDB/TMDB";

export interface MegaStore {
  isLocalDev: boolean;
  appName: string;
  tmdb: TMDB;
  searchQuery: string;
  searchType: string;
}

const IS_LOCAL_DEV = false;

const useMegaStore = create<MegaStore>()(
  devtools(
    () =>
      ({
        isLocalDev: IS_LOCAL_DEV,
        appName: "Showbiz",
        tmdb: new TMDB(
          import.meta.env.VITE_TMDB_KEY,
          "en",
          IS_LOCAL_DEV,
          `http://localhost:${import.meta.env.VITE_DEV_SERVER_PORT}`
        ),
      } as MegaStore)
  )
);
//@ts-expect-error -- for development externalizing the store
window["useMegaStore"] = useMegaStore;
console.warn(
  "The store is externalized for development mode under the name 'useMegaStore' here."
);

export default useMegaStore;
