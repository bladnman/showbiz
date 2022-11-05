import create from "zustand";
import { devtools } from "zustand/middleware";
import { TMDBApi } from "../@types/TMDB";
import TMDB from "../TMDB/TMDB";

export interface MegaStore {
  appName: string;
  tmdb: TMDBApi;
}

const useMegaStore = create<MegaStore>()(
  devtools(
    () =>
      ({
        appName: "Showbiz",
        tmdb: new TMDB(import.meta.env.VITE_TMDB_KEY, "en"),
      } as MegaStore)
  )
);
//@ts-expect-error -- for development externalizing the store
window["useMegaStore"] = useMegaStore;
console.warn(
  "The store is externalized for development mode under the name 'useMegaStore' here."
);

export default useMegaStore;
