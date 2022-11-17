import create from "zustand";
import { devtools } from "zustand/middleware";
import TMDB from "../TMDB/TMDB";
import { ShowbizItem } from "../TMDB/utils/convertToItem";

export interface MegaStore {
  isLocalDev: boolean;
  appName: string;
  tmdb: TMDB;
  searchQuery: string | null;
  searchType: string | null;
  detailItem: ShowbizItem | null;
}

const IS_LOCAL_DEV = true;

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
        searchQuery: null,
        searchType: null,
      } as MegaStore)
  )
);
//@ts-expect-error -- for development externalizing the store
window["useMegaStore"] = useMegaStore;
console.warn(
  "The store is externalized for development mode under the name 'useMegaStore' here."
);

export default useMegaStore;
