import create from "zustand";
import { devtools } from "zustand/middleware";
import { CustomDataItem, ShowbizItem } from "../@types";
import TMDB from "../services/TMDB/TMDB";
import { DRAWER_WIDTH_OPEN } from "./const";
import { DRAWER_PERMANENT_BREAKPOINT } from "@CONST";

export interface MegaStore {
  isLocalDev: boolean;
  appName: string;
  tmdb: TMDB;
  searchQuery: string | null;
  searchType: string | null;
  detailItem: ShowbizItem | null;
  similarToShow: ShowbizItem | null;
  drawerWidthOpen: number;
  drawerWidth: number;
  drawerWidthClosed: number;
  drawerMode: "permanent" | "temporary";
  isDrawerOpen: boolean;
  isDrawerStateLocked: boolean;
  isDetailsOpen: boolean;
  collectionToRename: string | null;
  isSelectMode: boolean;
  shows: ShowbizItem[];
  customDataList: CustomDataItem[];
  bodyShows: ShowbizItem[];
  bodyGroupBy?: string;
  selectedShows: ShowbizItem[];
  showsToSelectHold: ShowbizItem[] | null;
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
        bodyGroupBy: "status",
        drawerWidthOpen: DRAWER_WIDTH_OPEN,
        drawerWidth: DRAWER_WIDTH_OPEN,
        drawerWidthClosed: 0,
        // attempt first breakpoint check for drawerMode
        drawerMode:
          window.innerWidth >= DRAWER_PERMANENT_BREAKPOINT
            ? "permanent"
            : "temporary",
        isDrawerOpen: true,
        isDrawerStateLocked: false,
        isDetailsOpen: false,
        collectionToRename: null,
        isSelectMode: false,
        shows: [] as ShowbizItem[],
        selectedShows: [] as ShowbizItem[],
        showsToSelectHold: null,
      } as MegaStore)
  )
);
//@ts-expect-error -- for development externalizing the store
window["useMegaStore"] = useMegaStore;

export default useMegaStore;
