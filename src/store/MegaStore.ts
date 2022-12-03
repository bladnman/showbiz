import create from "zustand";
import { devtools } from "zustand/middleware";
import TMDB from "../services/TMDB/TMDB";
import { ShowbizItem } from "../services/TMDB/utils/convertToItem";
import { DRAWER_WIDTH_OPEN } from "./const";

export interface MegaStore {
  isLocalDev: boolean;
  appName: string;
  tmdb: TMDB;
  searchQuery: string | null;
  searchType: string | null;
  searchSelectedItem: ShowbizItem | null;
  detailItem: ShowbizItem | null;
  drawerWidthOpen: number;
  drawerWidth: number;
  drawerWidthClosed: number;
  isDrawerOpen: boolean;
  isSearchMode: boolean;
}

const IS_LOCAL_DEV = false; // start dev-server if true

const useMegaStore = create<MegaStore>()(
  devtools(
    () =>
      ({
        isLocalDev: IS_LOCAL_DEV,
        appName: "⭐️ Showbiz",
        tmdb: new TMDB(
          import.meta.env.VITE_TMDB_KEY,
          "en",
          IS_LOCAL_DEV,
          `http://localhost:${import.meta.env.VITE_DEV_SERVER_PORT}`
        ),
        searchQuery: null,
        searchType: null,
        drawerWidthOpen: DRAWER_WIDTH_OPEN,
        drawerWidth: DRAWER_WIDTH_OPEN,
        drawerWidthClosed: 0,
        isDrawerOpen: true,
        isSearchMode: true,
      } as MegaStore)
  )
);
//@ts-expect-error -- for development externalizing the store
window["useMegaStore"] = useMegaStore;
console.warn(
  "The store is externalized for development mode under the name 'useMegaStore' here."
);

export default useMegaStore;
