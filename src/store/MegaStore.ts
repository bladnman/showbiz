import create from "zustand";
import { devtools } from "zustand/middleware";
import { ShowbizItem } from "../@types";
import TMDB from "../services/TMDB/TMDB";
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
  shows: ShowbizItem[];
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
        searchQuery: "griz",
        searchType: null,
        drawerWidthOpen: DRAWER_WIDTH_OPEN,
        drawerWidth: DRAWER_WIDTH_OPEN,
        drawerWidthClosed: 0,
        isDrawerOpen: true,
        isSearchMode: true,
        shows: [] as ShowbizItem[],
      } as MegaStore)
  )
);
//@ts-expect-error -- for development externalizing the store
window["useMegaStore"] = useMegaStore;

export default useMegaStore;
